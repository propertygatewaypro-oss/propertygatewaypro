import imageCompression from 'browser-image-compression';
import { db, storage, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { INITIAL_PROPERTIES, INITIAL_TESTIMONIALS } from '../data/initialProperties';

const LOCAL_STORAGE_PROPERTIES_KEY = 'pg_admin_properties';
const LOCAL_STORAGE_LEADS_KEY = 'pg_admin_leads';
const LOCAL_STORAGE_TESTIMONIALS_KEY = 'pg_admin_testimonials';

// In-memory or localStorage helper
function getLocalTestimonials() {
  const saved = localStorage.getItem(LOCAL_STORAGE_TESTIMONIALS_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse local testimonials", e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
  return INITIAL_TESTIMONIALS;
}

function setLocalTestimonials(testimonials) {
  localStorage.setItem(LOCAL_STORAGE_TESTIMONIALS_KEY, JSON.stringify(testimonials));
}

// In-memory or localStorage helper
function getLocalProperties() {
  const saved = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse local properties", e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(INITIAL_PROPERTIES));
  return INITIAL_PROPERTIES;
}

function setLocalProperties(properties) {
  localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(properties));
}

function getLocalLeads() {
  const saved = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all sample/mock leads are completely purged from storage
      const realOnly = Array.isArray(parsed)
        ? parsed.filter(l => !l.id?.startsWith('lead-0') && l.name !== 'Karthik Subramanian' && l.name !== 'Deepa Narayanan' && l.name !== 'Ramesh Kannan')
        : [];
      if (realOnly.length !== parsed.length) {
        localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(realOnly));
      }
      return realOnly;
    } catch (e) {
      console.error("Failed to parse local leads", e);
    }
  }
  return [];
}

function setLocalLeads(leads) {
  localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
}

// -------------------------------------------------------------
// IMAGE COMPRESSION & UPLOAD (< 250KB WebP)
// -------------------------------------------------------------
export async function compressAndUploadImage(file, onProgress) {
  const options = {
    maxSizeMB: 0.25, // 250 KB budget
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    // If live Firebase Storage is configured
    if (isFirebaseConfigured && storage) {
      const fileName = `properties/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.webp`;
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, compressedFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    }

    // In local development / mock mode, return data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
}

// -------------------------------------------------------------
// PROPERTIES CRUD
// -------------------------------------------------------------
export function subscribeAdminProperties(onUpdate, onError) {
  if (isFirebaseConfigured && db) {
    try {
      return onSnapshot(collection(db, "properties"), (snap) => {
        if (!snap.empty) {
          const liveProps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          liveProps.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setLocalProperties(liveProps);
          onUpdate(liveProps);
        } else {
          onUpdate(getLocalProperties());
        }
      }, (err) => {
        console.warn("Realtime properties listener warning:", err.message);
        if (onError) onError(err);
        onUpdate(getLocalProperties());
      });
    } catch (err) {
      console.warn("Could not attach properties listener:", err);
    }
  }
  onUpdate(getLocalProperties());
  return () => {};
}

export async function fetchAdminProperties() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "properties"));
      if (!snap.empty) {
        const liveProps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        liveProps.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        return liveProps;
      }

      // If Firestore is empty, auto-seed the initial catalog to Firestore
      if (INITIAL_PROPERTIES.length > 0) {
        console.log("Seeding initial catalog to Firestore...");
        for (const prop of INITIAL_PROPERTIES) {
          try {
            await setDoc(doc(db, "properties", prop.id), {
              ...prop,
              createdAt: prop.createdAt || new Date().toISOString()
            }, { merge: true });
          } catch (seedErr) {
            console.warn("Could not seed property:", prop.id, seedErr.message);
          }
        }
        return INITIAL_PROPERTIES;
      }
    } catch (err) {
      console.warn("Firestore fetch properties failed, falling back to local storage:", err.message);
    }
  }
  return getLocalProperties();
}

export async function saveProperty(propertyData) {
  const isNew = !propertyData.id;
  const id = isNew ? `prop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` : propertyData.id;
  
  const active = propertyData.active !== false && propertyData.isActive !== false;
  const status = propertyData.possessionStatus || propertyData.status || 'Ready to Move';
  const possessionStatus = propertyData.possessionStatus || propertyData.status || 'Ready to Move';
  const type = propertyData.propertyType || propertyData.type || 'Luxury Villa';
  const propertyType = propertyData.propertyType || propertyData.type || 'Luxury Villa';

  const payload = {
    ...propertyData,
    id,
    active,
    isActive: active,
    status,
    possessionStatus,
    type,
    propertyType,
    updatedAt: new Date().toISOString(),
    createdAt: propertyData.createdAt || new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "properties", id), payload, { merge: true });
    } catch (err) {
      console.warn("Firestore save failed, saving locally:", err.message);
    }
  }

  // Also update local storage cache
  const localList = getLocalProperties();
  const existingIdx = localList.findIndex(p => p.id === id);
  let updatedList;
  if (existingIdx >= 0) {
    updatedList = [...localList];
    updatedList[existingIdx] = payload;
  } else {
    updatedList = [payload, ...localList];
  }
  setLocalProperties(updatedList);
  return payload;
}

export async function deleteProperty(propertyId) {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "properties", propertyId));
    } catch (err) {
      console.warn("Firestore delete failed:", err.message);
    }
  }

  const localList = getLocalProperties();
  const filtered = localList.filter(p => p.id !== propertyId);
  setLocalProperties(filtered);
  return true;
}

export async function togglePropertyStatus(propertyId, currentStatus) {
  const newStatus = !currentStatus;
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "properties", propertyId), { 
        active: newStatus,
        isActive: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Firestore status toggle failed:", err.message);
    }
  }

  const localList = getLocalProperties();
  const updated = localList.map(p => p.id === propertyId ? { ...p, active: newStatus, isActive: newStatus } : p);
  setLocalProperties(updated);
  return newStatus;
}

// -------------------------------------------------------------
// LEADS & INQUIRIES MANAGEMENT (100% Realtime Production)
// -------------------------------------------------------------
export function subscribeAdminLeads(onUpdate, onError) {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "leads"), orderBy("submittedAt", "desc"));
      return onSnapshot(
        q, 
        (snapshot) => {
          const liveLeads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          onUpdate(liveLeads);
        },
        (err) => {
          console.warn("Firestore leads live subscriber warning:", err.message);
          if (onError) onError(err);
          onUpdate(getLocalLeads());
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore realtime subscriber:", err);
    }
  }

  // Fallback to real local storage leads
  onUpdate(getLocalLeads());
  return () => {};
}

export async function fetchAdminLeads() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "leads"), orderBy("submittedAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.warn("Firestore fetch leads error:", err.message);
    }
  }
  return getLocalLeads();
}

export async function updateLeadStatus(leadId, newStatus) {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "leads", leadId), { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Firestore updateLeadStatus notice:", err.message);
    }
  }

  const localLeads = getLocalLeads();
  let updated;
  if (localLeads.some(l => l.id === leadId)) {
    updated = localLeads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
  } else {
    updated = [{ id: leadId, status: newStatus, updatedAt: new Date().toISOString() }, ...localLeads];
  }
  setLocalLeads(updated);
  return { id: leadId, status: newStatus };
}

export async function deleteLead(leadId) {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "leads", leadId));
    } catch (err) {
      console.warn("Firestore deleteLead notice:", err.message);
    }
  }

  const localLeads = getLocalLeads();
  const filtered = localLeads.filter(l => l.id !== leadId);
  setLocalLeads(filtered);
  return filtered;
}

// -------------------------------------------------------------
// TESTIMONIALS / CLIENT FEEDBACKS (Realtime CRUD Sync)
// -------------------------------------------------------------

function computeInitials(author) {
  if (!author) return "PG";
  const parts = author.trim().replace(/^(Dr\.|Capt\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').split(/[\s&]+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

export function subscribeAdminTestimonials(onUpdate, onError) {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const liveItems = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setLocalTestimonials(liveItems);
            onUpdate(liveItems);
          } else {
            // Deliver local seed data
            const local = getLocalTestimonials();
            onUpdate(local);

            // Auto-seed to Firestore if collection is empty
            if (INITIAL_TESTIMONIALS && INITIAL_TESTIMONIALS.length > 0) {
              INITIAL_TESTIMONIALS.forEach(async (item) => {
                try {
                  await setDoc(doc(db, "testimonials", item.id), item, { merge: true });
                } catch (_) {}
              });
            }
          }
        },
        (err) => {
          console.warn("Firestore testimonials subscriber notice:", err.message);
          if (onError) onError(err);
          onUpdate(getLocalTestimonials());
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore testimonials subscriber:", err);
    }
  }

  // Fallback to local storage testimonials
  onUpdate(getLocalTestimonials());
  return () => {};
}

export async function fetchAdminTestimonials() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const liveItems = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setLocalTestimonials(liveItems);
        return liveItems;
      }
    } catch (err) {
      console.warn("Firestore fetch testimonials error:", err.message);
    }
  }
  return getLocalTestimonials();
}

export async function saveTestimonial(testimonialData) {
  const isNew = !testimonialData.id;
  const id = testimonialData.id || `testi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  
  const formatted = {
    ...testimonialData,
    id,
    author: (testimonialData.author || "Homeowner").trim(),
    role: (testimonialData.role || "").trim(),
    highlight: (testimonialData.highlight || "").trim(),
    content: (testimonialData.content || "").trim(),
    rating: Number(testimonialData.rating) || 5,
    verified: testimonialData.verified !== false,
    active: testimonialData.active !== false,
    avatar: testimonialData.avatar || "",
    initials: testimonialData.initials || computeInitials(testimonialData.author),
    createdAt: testimonialData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // If beforeHighlight / afterHighlight are missing and content exists, configure highlight segments
  if (!formatted.beforeHighlight && formatted.content && formatted.highlight) {
    const idx = formatted.content.indexOf(formatted.highlight);
    if (idx !== -1) {
      formatted.beforeHighlight = formatted.content.substring(0, idx);
      formatted.afterHighlight = formatted.content.substring(idx + formatted.highlight.length);
    } else {
      formatted.beforeHighlight = "";
      formatted.afterHighlight = ` ${formatted.content}`;
    }
  }

  // 1. Write to Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "testimonials", id), formatted, { merge: true });
    } catch (err) {
      console.warn("Firestore save testimonial failed, updating local storage:", err.message);
    }
  }

  // 2. Update local storage
  const localList = getLocalTestimonials();
  const existingIndex = localList.findIndex(t => t.id === id);
  let updatedList;
  if (existingIndex >= 0) {
    updatedList = [...localList];
    updatedList[existingIndex] = formatted;
  } else {
    updatedList = [formatted, ...localList];
  }
  setLocalTestimonials(updatedList);

  return formatted;
}

export async function deleteTestimonial(testimonialId) {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "testimonials", testimonialId));
    } catch (err) {
      console.warn("Firestore delete testimonial failed:", err.message);
    }
  }

  const localList = getLocalTestimonials();
  const filtered = localList.filter(t => t.id !== testimonialId);
  setLocalTestimonials(filtered);
  return filtered;
}

export async function toggleTestimonialStatus(testimonialId, currentStatus) {
  const newStatus = !currentStatus;
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "testimonials", testimonialId), { 
        active: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Firestore toggle testimonial status failed:", err.message);
    }
  }

  const localList = getLocalTestimonials();
  const updated = localList.map(t => t.id === testimonialId ? { ...t, active: newStatus } : t);
  setLocalTestimonials(updated);
  return newStatus;
}
