import { collection, getDocs, doc, getDoc, addDoc, query, where, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { INITIAL_PROPERTIES } from "../data/initialProperties";

const LOCAL_STORAGE_KEY = "pg_admin_properties";
const LEADS_STORAGE_KEY = "pg_admin_leads";

// Initialize local cache if empty
function getLocalProperties() {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem("pg_properties_cache");
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
        where("active", "!=", false),
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
  let results = [...getLocalProperties()].filter(p => p.active !== false && p.isActive !== false);

  if (category && category !== "All Types") {
    results = results.filter(p => {
      const type = p.propertyType || p.type || "";
      return type.toLowerCase().includes(category.toLowerCase());
    });
  }
  if (location && location !== "All Locations") {
    results = results.filter(p => p.location === location);
  }
  if (status && status !== "All Statuses") {
    results = results.filter(p => {
      const s = p.status || p.possessionStatus || "";
      return s.toLowerCase().includes(status.toLowerCase());
    });
  }
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
    // latest
    results.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
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
  if (leadData.website_trap_field || leadData.website_hp) {
    console.warn("Honeypot triggered. Bot submission discarded.");
    return { success: true, bot: true };
  }

  // 2. Strict Input Validation
  if (!leadData.name || !leadData.phone || leadData.phone.replace(/\D/g, '').length < 10) {
    throw new Error("Please provide a valid full name and 10-digit mobile number.");
  }

  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
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

  // 3. Write to Firestore if configured
  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, "leads"), {
        ...newLead,
        timestamp: serverTimestamp()
      });
      newLead.id = docRef.id;
    } catch (err) {
      console.warn("Firestore lead submission failed, caching locally:", err.message);
    }
  }

  // 4. Always cache in localStorage for Admin synchronization
  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || "[]");
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([newLead, ...existing]));
  } catch (e) {
    console.error("Local leads cache error", e);
  }

  return { success: true, lead: newLead };
}
