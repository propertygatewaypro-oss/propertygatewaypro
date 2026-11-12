import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  where, 
  limit, 
  serverTimestamp, 
  onSnapshot 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { INITIAL_TESTIMONIALS } from "../data/initialProperties";

// In-memory filter & sort pipeline
export function filterAndSortProperties(rawList, filters = {}) {
  const { search, location, category, budgetMin, budgetMax, status, sortBy = "latest", pageSize = 12 } = filters;
  let results = Array.isArray(rawList) ? [...rawList] : [];

  // Active / Published only
  results = results.filter(p => p.active !== false && p.isActive !== false);

  // Free-text Search (Project Name / Builder / Location / Type / Description)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(p => {
      const title = (p.title || "").toLowerCase();
      const loc = (p.location || "").toLowerCase();
      const builder = (p.builder || "").toLowerCase();
      const desc = (p.description || p.overview || "").toLowerCase();
      const type = (p.propertyType || p.type || "").toLowerCase();
      return title.includes(q) || loc.includes(q) || builder.includes(q) || desc.includes(q) || type.includes(q);
    });
  }

  if (category && category !== "All Types") {
    results = results.filter(p => {
      const type = (p.propertyType || p.type || "").toLowerCase();
      return type.includes(category.toLowerCase());
    });
  }

  if (location && location !== "All Locations") {
    results = results.filter(p => {
      if (!p.location) return false;
      const pLoc = p.location.toLowerCase();
      const targetLoc = location.toLowerCase();
      return pLoc === targetLoc || pLoc.includes(targetLoc) || targetLoc.includes(pLoc);
    });
  }

  if (status && status !== "All Statuses") {
    results = results.filter(p => {
      const s = (p.status || p.possessionStatus || "").toLowerCase();
      return s.includes(status.toLowerCase());
    });
  }

  // Budget
  if (budgetMin !== undefined || budgetMax !== undefined) {
    const min = budgetMin || 0;
    const max = budgetMax || Infinity;
    results = results.filter(p => {
      const price = Number(p.price) || 0;
      return price >= min && price <= max;
    });
  }

  // Sort
  if (sortBy === "price_asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    results.sort((a, b) => b.price - a.price);
  } else {
    results.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  return pageSize ? results.slice(0, pageSize) : results;
}

// -------------------------------------------------------------
// REALTIME FIRESTORE CLOUD PROPERTIES SUBSCRIPTION
// -------------------------------------------------------------
export function subscribeProperties(onUpdate, filters = {}) {
  if (isFirebaseConfigured && db) {
    try {
      return onSnapshot(
        collection(db, "properties"),
        (snapshot) => {
          if (!snapshot.empty) {
            const rawDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const processed = filterAndSortProperties(rawDocs, filters);
            onUpdate(processed);
          } else {
            // Cloud Firestore is empty -> exactly 0 properties
            onUpdate([]);
          }
        },
        (err) => {
          console.warn("Firestore realtime properties subscription notice:", err.message);
          onUpdate([]);
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore properties listener:", err);
    }
  }

  onUpdate([]);
  return () => {};
}

// -------------------------------------------------------------
// ONE-SHOT FIRESTORE CLOUD FETCH
// -------------------------------------------------------------
export async function fetchProperties(filters = {}) {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "properties"));
      if (!snap.empty) {
        const rawDocs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return filterAndSortProperties(rawDocs, filters);
      }
      return [];
    } catch (err) {
      console.warn("Firestore fetch error:", err.message);
    }
  }
  return [];
}

// -------------------------------------------------------------
// SINGLE PROPERTY LOOKUP (REALTIME & ONE-SHOT)
// -------------------------------------------------------------
export function subscribePropertyBySlug(slug, onUpdate) {
  if (isFirebaseConfigured && db) {
    try {
      return onSnapshot(collection(db, "properties"), (snap) => {
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          const match = list.find(p => p.slug === slug || p.id === slug);
          if (match) {
            onUpdate(match);
            return;
          }
        }
        onUpdate(null);
      });
    } catch (err) {
      console.warn("Could not attach slug listener:", err);
    }
  }

  onUpdate(null);
  return () => {};
}

export async function fetchPropertyBySlug(slug) {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "properties"), where("slug", "==", slug), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { id: snap.docs[0].id, ...snap.docs[0].data() };
      }
      const directDoc = await getDoc(doc(db, "properties", slug));
      if (directDoc.exists()) {
        return { id: directDoc.id, ...directDoc.data() };
      }
    } catch (e) {
      console.warn("Firestore slug fetch error:", e);
    }
  }
  return null;
}

// -------------------------------------------------------------
// LEADS SUBMISSION (DIRECT TO FIRESTORE CLOUD)
// -------------------------------------------------------------
export async function submitLeadInquiry(leadData) {
  // 1. Bot Honeypot Check
  if (leadData.website_trap_field || leadData.website_hp) {
    console.warn("Honeypot triggered. Bot submission discarded.");
    return { success: true, bot: true };
  }

  // 2. Strict Input Validation
  if (!leadData.name || !leadData.phone || leadData.phone.replace(/\D/g, '').length < 10) {
    throw new Error("Please provide a valid full name and 10-digit mobile number.");
  }

  const newLead = {
    name: leadData.name.trim(),
    phone: leadData.phone.trim(),
    email: (leadData.email || "").trim(),
    propertyId: leadData.propertyId || "general-inquiry",
    propertyTitle: leadData.propertyTitle || "Chennai Real Estate Consultation",
    preferredLocation: leadData.preferredLocation || "",
    preferredDate: leadData.preferredDate || "",
    leadType: leadData.leadType || "Website Inquiry",
    message: leadData.message || "",
    status: "New",
    submittedAt: new Date().toISOString()
  };

  // 3. Write directly to Firestore Cloud
  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, "leads"), {
      ...newLead,
      timestamp: serverTimestamp()
    });
    newLead.id = docRef.id;
  }

  return { success: true, lead: newLead };
}

// -------------------------------------------------------------
// TESTIMONIALS & CLIENT FEEDBACKS (FIRESTORE CLOUD)
// -------------------------------------------------------------
export function subscribeTestimonials(onUpdate, onError) {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "testimonials"));
      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const allItems = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            const activeOnly = allItems.filter(t => t.active !== false);
            onUpdate(activeOnly.length > 0 ? activeOnly : INITIAL_TESTIMONIALS);
          } else {
            onUpdate(INITIAL_TESTIMONIALS);
          }
        },
        (err) => {
          console.warn("Firestore website testimonials subscriber warning:", err.message);
          if (onError) onError(err);
          onUpdate(INITIAL_TESTIMONIALS);
        }
      );
    } catch (err) {
      console.warn("Could not attach Firestore website testimonials subscriber:", err);
    }
  }

  onUpdate(INITIAL_TESTIMONIALS);
  return () => {};
}

export async function fetchTestimonials() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "testimonials"));
      if (!snap.empty) {
        const allItems = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const activeOnly = allItems.filter(t => t.active !== false);
        return activeOnly.length > 0 ? activeOnly : INITIAL_TESTIMONIALS;
      }
    } catch (err) {
      console.warn("Firestore fetch testimonials warning:", err.message);
    }
  }
  return INITIAL_TESTIMONIALS;
}
