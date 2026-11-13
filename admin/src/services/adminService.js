import imageCompression from 'browser-image-compression';
import { db, storage, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { convertToWebPFast } from '../utils/imageOptimizer';

// -------------------------------------------------------------
// ULTRA-FAST WEBP OPTIMIZER & CLOUDINARY UPLOAD (FREE 25GB TIER)
// -------------------------------------------------------------
export async function compressAndUploadImage(file, { type = 'property' } = {}) {
  // Tailored presets for blazing speed and minimal byte footprint
  const config = type === 'avatar' 
    ? { maxWidth: 600, maxHeight: 600, quality: 0.85 }
    : { maxWidth: 1920, maxHeight: 1200, quality: 0.82 };

  try {
    // 1. Ultra-fast hardware-accelerated WebP conversion (< 80ms)
    let optimizedFile = await convertToWebPFast(file, config);

    // Fallback safeguard: if file is still abnormally large (> 750KB), apply secondary pass
    if (optimizedFile.size > 750 * 1024) {
      try {
        optimizedFile = await imageCompression(optimizedFile, {
          maxSizeMB: 0.45,
          maxWidthOrHeight: config.maxWidth,
          useWebWorker: false, // avoid worker startup latency
          fileType: 'image/webp'
        });
      } catch (compressionErr) {
        console.warn("Secondary compression skipped:", compressionErr);
      }
    }

    // 2. Upload directly to Cloudinary using Unsigned Preset
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'py5x0ppi';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'property_gateway';

    const formData = new FormData();
    formData.append('file', optimizedFile);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Cloudinary upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Inject Cloudinary edge optimization transforms: /f_auto,q_auto/
    let secureUrl = data.secure_url;
    if (secureUrl && secureUrl.includes('/image/upload/')) {
      secureUrl = secureUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
    }

    return secureUrl;
  } catch (error) {
    console.error("Error optimizing and uploading image to Cloudinary:", error);
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
          const liveProps = snap.docs.map(d => ({ ...d.data(), id: d.id, _docId: d.id }));
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
        const liveProps = snap.docs.map(doc => ({ ...doc.data(), id: doc.id, _docId: doc.id }));
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
  if (!propertyId) {
    throw new Error("Cannot delete property: missing property ID.");
  }
  const cleanId = String(propertyId).trim();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "properties", cleanId));
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
      return onSnapshot(
        collection(db, "leads"), 
        (snapshot) => {
          // Put id LAST so true Firestore doc.id is never overwritten by doc.data().id
          const liveLeads = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, _docId: doc.id }));
          liveLeads.sort((a, b) => {
            const timeA = new Date(a.submittedAt || a.createdAt || (a.timestamp?.toDate ? a.timestamp.toDate() : 0)).getTime();
            const timeB = new Date(b.submittedAt || b.createdAt || (b.timestamp?.toDate ? b.timestamp.toDate() : 0)).getTime();
            return timeB - timeA;
          });
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
      const snapshot = await getDocs(collection(db, "leads"));
      // Put id LAST so true Firestore doc.id is never overwritten by doc.data().id
      const liveLeads = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, _docId: doc.id }));
      liveLeads.sort((a, b) => {
        const timeA = new Date(a.submittedAt || a.createdAt || (a.timestamp?.toDate ? a.timestamp.toDate() : 0)).getTime();
        const timeB = new Date(b.submittedAt || b.createdAt || (b.timestamp?.toDate ? b.timestamp.toDate() : 0)).getTime();
        return timeB - timeA;
      });
      return liveLeads;
    } catch (err) {
      console.warn("Firestore fetch leads error:", err.message);
    }
  }
  return [];
}

export async function saveLead(leadData) {
  if (isFirebaseConfigured && db) {
    const isNew = !leadData.id;
    if (isNew) {
      const docRef = await addDoc(collection(db, "leads"), {
        ...leadData,
        submittedAt: leadData.submittedAt || new Date().toISOString()
      });
      return { id: docRef.id, ...leadData };
    } else {
      await setDoc(doc(db, "leads", leadData.id), {
        ...leadData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      return leadData;
    }
  }
  throw new Error("Firebase Cloud Firestore is not configured.");
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
  if (!leadId) {
    throw new Error("Cannot delete inquiry: missing document ID.");
  }
  const cleanId = String(leadId).trim();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "leads", cleanId));
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
      return onSnapshot(
        collection(db, "testimonials"),
        (snapshot) => {
          const liveItems = snapshot.docs.map(d => ({ ...d.data(), id: d.id, _docId: d.id }));
          liveItems.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          onUpdate(liveItems);
        },
        (err) => {
          console.warn("Firestore testimonials subscriber notice:", err.message);
          if (onError) onError(err);
          onUpdate([]);
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore testimonials subscriber:", err);
    }
  }

  onUpdate([]);
  return () => {};
}

export async function fetchAdminTestimonials() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const liveItems = snapshot.docs.map(d => ({ ...d.data(), id: d.id, _docId: d.id }));
      liveItems.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      return liveItems;
    } catch (err) {
      console.warn("Firestore fetch testimonials error:", err.message);
    }
  }
  return [];
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
  if (!testimonialId) {
    throw new Error("Cannot delete testimonial: missing feedback ID.");
  }
  const cleanId = String(testimonialId).trim();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "testimonials", cleanId));
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
