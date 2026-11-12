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
import { INITIAL_TESTIMONIALS } from '../data/initialProperties';

// -------------------------------------------------------------
// IMAGE COMPRESSION & UPLOAD TO FIREBASE STORAGE (< 250KB WebP)
// -------------------------------------------------------------
export async function compressAndUploadImage(file) {
  const options = {
    maxSizeMB: 0.25, // 250 KB budget
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    // Upload directly to Firebase Storage Cloud
    if (isFirebaseConfigured && storage) {
      const fileName = `properties/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.webp`;
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, compressedFile, {
        contentType: 'image/webp'
      });
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    }

    throw new Error("Firebase Storage is not configured.");
  } catch (error) {
    console.error("Error compressing and uploading image to Firebase:", error);
    throw error;
  }
}

// -------------------------------------------------------------
// PROPERTIES MANAGEMENT (100% REALTIME FIREBASE CLOUD)
// -------------------------------------------------------------
export function subscribeAdminProperties(onUpdate, onError) {
  if (isFirebaseConfigured && db) {
    try {
      return onSnapshot(collection(db, "properties"), (snap) => {
        if (!snap.empty) {
          const liveProps = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          liveProps.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          onUpdate(liveProps);
        } else {
          // Cloud Firestore has 0 documents
          onUpdate([]);
        }
      }, (err) => {
        console.warn("Realtime properties listener warning:", err.message);
        if (onError) onError(err);
        onUpdate([]);
      });
    } catch (err) {
      console.warn("Could not attach properties listener:", err);
    }
  }
  onUpdate([]);
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
      return [];
    } catch (err) {
      console.warn("Firestore fetch properties failed:", err.message);
    }
  }
  return [];
}

export async function saveProperty(propertyData) {
  const isNew = !propertyData.id;
  const id = isNew ? `prop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` : propertyData.id;
  
  const active = propertyData.active !== false && propertyData.isActive !== false;
  const status = propertyData.possessionStatus || propertyData.status || 'Ready to Move';
  const possessionStatus = propertyData.possessionStatus || propertyData.status || 'Ready to Move';
  const type = propertyData.propertyType || propertyData.type || 'Apartment';
  const propertyType = propertyData.propertyType || propertyData.type || 'Apartment';

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
    await setDoc(doc(db, "properties", id), payload, { merge: true });
    return payload;
  }

  throw new Error("Firebase Cloud Firestore is not configured.");
}

export async function deleteProperty(propertyId) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "properties", propertyId));
    return true;
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
}

export async function togglePropertyStatus(propertyId, currentStatus) {
  const newStatus = !currentStatus;
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, "properties", propertyId), { 
      active: newStatus,
      isActive: newStatus,
      updatedAt: new Date().toISOString()
    });
    return newStatus;
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
}

// -------------------------------------------------------------
// LEADS & INQUIRIES MANAGEMENT (100% REALTIME FIREBASE CLOUD)
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
          onUpdate([]);
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore realtime subscriber:", err);
    }
  }

  onUpdate([]);
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
  return [];
}

export async function updateLeadStatus(leadId, newStatus) {
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, "leads", leadId), { 
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    return { id: leadId, status: newStatus };
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
}

export async function deleteLead(leadId) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "leads", leadId));
    return true;
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
}

// -------------------------------------------------------------
// TESTIMONIALS / CLIENT FEEDBACKS (FIREBASE CLOUD)
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
            onUpdate(liveItems);
          } else {
            onUpdate(INITIAL_TESTIMONIALS);
          }
        },
        (err) => {
          console.warn("Firestore testimonials subscriber notice:", err.message);
          if (onError) onError(err);
          onUpdate(INITIAL_TESTIMONIALS);
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore testimonials subscriber:", err);
    }
  }

  onUpdate(INITIAL_TESTIMONIALS);
  return () => {};
}

export async function fetchAdminTestimonials() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch testimonials error:", err.message);
    }
  }
  return INITIAL_TESTIMONIALS;
}

export async function saveTestimonial(testimonialData) {
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

  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, "testimonials", id), formatted, { merge: true });
    return formatted;
  }

  throw new Error("Firebase Cloud Firestore is not configured.");
}

export async function deleteTestimonial(testimonialId) {
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "testimonials", testimonialId));
    return true;
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
}

export async function toggleTestimonialStatus(testimonialId, currentStatus) {
  const newStatus = !currentStatus;
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, "testimonials", testimonialId), { 
      active: newStatus,
      updatedAt: new Date().toISOString()
    });
    return newStatus;
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
}
