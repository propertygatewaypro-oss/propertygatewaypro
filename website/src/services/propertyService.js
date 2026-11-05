import { collection, getDocs, doc, getDoc, addDoc, query, where, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { INITIAL_PROPERTIES } from "../data/initialProperties";

const LOCAL_STORAGE_KEY = "pg_properties_cache";
const LEADS_STORAGE_KEY = "pg_leads_cache";

// Initialize local cache if empty
function getLocalProperties() {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn("Local storage not accessible, falling back to static", e);
  }
  return INITIAL_PROPERTIES;
}

export async function fetchProperties(filters = {}) {
  const { location, category, budgetMin, budgetMax, status, sortBy = "latest", pageSize = 12 } = filters;

  if (isFirebaseConfigured) {
    try {
      let q = query(
        collection(db, "properties"),
        where("isActive", "==", true),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );

      if (category && category !== "All Types") {
        q = query(q, where("propertyType", "==", category));
      }

      if (location && location !== "All Locations") {
        q = query(q, where("location", "==", location));
      }

      const snap = await getDocs(q);
      if (!snap.empty) {
        let results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filter budget in-memory if needed
        if (budgetMin !== undefined || budgetMax !== undefined) {
          results = results.filter(p => {
            const price = Number(p.price) || 0;
            const min = budgetMin || 0;
            const max = budgetMax || Infinity;
            return price >= min && price <= max;
          });
        }
        return results;
      }
    } catch (err) {
      console.warn("Firestore fetch error, falling back to local dataset:", err.message);
    }
  }

  // Fallback to local properties
  let results = [...getLocalProperties()];

  if (category && category !== "All Types") {
    results = results.filter(p => p.propertyType === category);
  }
  if (location && location !== "All Locations") {
    results = results.filter(p => p.location === location);
  }
  if (status && status !== "All Statuses") {
    results = results.filter(p => p.status === status);
  }
  if (budgetMin !== undefined || budgetMax !== undefined) {
    const min = budgetMin || 0;
    const max = budgetMax || Infinity;
    results = results.filter(p => p.price >= min && p.price <= max);
  }

  // Sort
  if (sortBy === "price_asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    results.sort((a, b) => b.price - a.price);
  } else {
    // latest
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return results.slice(0, pageSize);
}

export async function fetchPropertyBySlug(slug) {
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, "properties"), where("slug", "==", slug), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { id: snap.docs[0].id, ...snap.docs[0].data() };
      }
    } catch (e) {
      console.warn("Firestore slug fetch error:", e);
    }
  }

  const localList = getLocalProperties();
  return localList.find(p => p.slug === slug || p.id === slug) || null;
}

export async function submitLeadInquiry(leadData) {
  // 1. Bot Honeypot Check
  if (leadData.website_trap_field) {
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
    propertyTitle: leadData.propertyTitle || "General Real Estate Inquiry",
    preferredDate: leadData.preferredDate || "",
    source: leadData.source || "Website Form",
    status: "New",
    createdAt: new Date().toISOString()
  };

  // 3. Write to Firestore if configured
  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, "inquiries"), {
        ...newLead,
        timestamp: serverTimestamp()
      });
      newLead.id = docRef.id;
    } catch (err) {
      console.warn("Firestore lead write failed, saving to local inbox:", err);
    }
  }

  // Always save locally so Admin can view it immediately
  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || "[]");
    newLead.id = newLead.id || `lead-${Date.now()}`;
    existing.unshift(newLead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to store lead locally:", e);
  }

  return { success: true, lead: newLead };
}
