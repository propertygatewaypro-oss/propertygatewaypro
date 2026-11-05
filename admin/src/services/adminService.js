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
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { INITIAL_PROPERTIES, INITIAL_LEADS } from '../data/initialProperties';

const LOCAL_STORAGE_PROPERTIES_KEY = 'pg_admin_properties';
const LOCAL_STORAGE_LEADS_KEY = 'pg_admin_leads';

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
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse local leads", e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(INITIAL_LEADS));
  return INITIAL_LEADS;
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
export async function fetchAdminProperties() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  
  const payload = {
    ...propertyData,
    id,
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
      await updateDoc(doc(db, "properties", propertyId), { active: newStatus });
    } catch (err) {
      console.warn("Firestore status toggle failed:", err.message);
    }
  }

  const localList = getLocalProperties();
  const updated = localList.map(p => p.id === propertyId ? { ...p, active: newStatus } : p);
  setLocalProperties(updated);
  return newStatus;
}

// -------------------------------------------------------------
// LEADS & INQUIRIES MANAGEMENT
// -------------------------------------------------------------
export async function fetchAdminLeads() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "leads"), orderBy("submittedAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch leads failed, falling back to local:", err.message);
    }
  }
  return getLocalLeads();
}

export async function updateLeadStatus(leadId, newStatus) {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "leads", leadId), { status: newStatus });
    } catch (err) {
      console.warn("Firestore updateLeadStatus failed:", err.message);
    }
  }

  const localLeads = getLocalLeads();
  const updated = localLeads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
  setLocalLeads(updated);
  return updated;
}

export async function deleteLead(leadId) {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "leads", leadId));
    } catch (err) {
      console.warn("Firestore deleteLead failed:", err.message);
    }
  }

  const localLeads = getLocalLeads();
  const filtered = localLeads.filter(l => l.id !== leadId);
  setLocalLeads(filtered);
  return filtered;
}
