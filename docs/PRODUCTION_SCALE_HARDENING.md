# Production Scale Hardening & 10,000+ User Resilience Guide
## Property Gateway Architecture & Anti-Vibe Defense

This document details the engineering invariants, architectural patterns, and defensive safeguards implemented in the **Property Gateway** codebase to prevent database bottlenecks, unmetered cloud billing shocks, memory leaks, and server crashes when scaling from 1 to 10,000+ concurrent users on React, Firebase, and Vercel.

---

## 1. Database Tier: Firestore Scaling & Query Bounds

### The Failure Mode
* Streaming entire collections via unconstrained `onSnapshot` listeners.
* 10,000 users = 10,000 persistent WebSocket channels and millions of document read charges within hours.
* Missing compound indexes leading to rejected queries (`FAILED_PRECONDITION`) or CPU-heavy client-side filtering.

### Defensive Safeguards

#### A. Strict Query Limits & Cursor-Based Pagination
Never fetch unbounded collections. Always enforce `limit()` and paginate using document snapshots:
```javascript
import { collection, query, where, orderBy, limit, startAfter, getDocs } from "firebase/firestore";

export async function fetchPropertyListings({ category, minPrice, maxPrice, lastVisibleDoc = null, pageSize = 12 }) {
  let q = query(
    collection(db, "properties"),
    where("isActive", "==", true),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (category && category !== "All") {
    q = query(q, where("propertyType", "==", category));
  }
  
  if (lastVisibleDoc) {
    q = query(q, startAfter(lastVisibleDoc));
  }

  const snapshot = await getDocs(q);
  const properties = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const nextCursor = snapshot.docs[snapshot.docs.length - 1] || null;

  return { properties, nextCursor };
}
```

#### B. Replace Real-Time Listeners with Query Caching
* **Public Portal (Website):** Do NOT use `onSnapshot` for public property listings. Use standard `getDocs()` combined with stale-while-revalidate client caching (5–10 minute `staleTime`). Real estate inventory changes over hours, not milliseconds.
* **Admin Portal Only:** Reserve `onSnapshot` for the Admin Leads inbox where instant notification of new inquiries is actually required.

#### C. Pre-Deploy Compound Indexes (`firestore.indexes.json`)
Declare all multi-filter combinations before deploying to production:
```json
{
  "indexes": [
    {
      "collectionGroup": "properties",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "propertyType", "order": "ASCENDING" },
        { "fieldPath": "price", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "properties",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## 2. Backend & API Tier: Throttling, Rate Limiting & Bot Protection

### The Failure Mode
* An unprotected contact/inquiry endpoint gets hit by scrapers or spam bots submitting 50,000 fake leads, exhausting Firebase write quotas and triggering paid notification APIs.

### Defensive Safeguards

#### A. Honeypot & Bot Traps
Add a visually hidden honeypot input field to the lead form. Bots fill it; legitimate users do not:
```jsx
// If honeypot has a value, silently reject without writing to Firestore
if (formData.website_trap_field) {
  console.warn("Bot submission detected and discarded.");
  return; 
}
```

#### B. Client-Side Throttle & Submission Debounce
Prevent multi-click duplicate submissions by disabling buttons on submit and setting a 60-second local submission cooldown in `localStorage` per user session.

#### C. Firestore Security Rules Write Throttling
Enforce strict document validation in `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{inquiryId} {
      // Public can only create, not read, update, or delete
      allow create: if request.resource.data.name is string
                    && request.resource.data.phone.size() >= 10
                    && request.resource.data.phone.size() <= 15
                    && request.resource.data.message.size() <= 1000;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## 3. Architecture Tier: Statelessness & Multi-Region Scalability

### The Failure Mode
* Storing session states, uploaded temp files, or tokens in local Node.js memory.
* When deployed across multiple Vercel serverless edges, user requests hit different servers, losing session state and corrupting auth.

### Defensive Safeguards
* **Stateless Firebase Auth:** All authentication relies on cryptographically signed JWT tokens issued by Firebase Auth. Tokens are verified stateless on every request without relying on shared in-memory server state.
* **Decoupled Media Pipeline:** Media files never route through Node server memory. Images upload directly from the client browser to Firebase Cloud Storage via signed client SDKs, freeing backend compute resources.

---

## 4. Financial Tier: Cloud Cost & Bandwidth Guardrails

### The Failure Mode
* High-resolution camera photos (8MB–15MB each) uploaded to listings.
* 10,000 visitors viewing a property with 10 images = 10,000 × 100MB = **1 Terabyte of data egress** ($120+ billing shock).

### Defensive Safeguards

#### A. Mandatory Client-Side Image Compression Before Upload
All images must be compressed in the browser before reaching Firebase Cloud Storage:
* Target format: Modern **WebP**
* Maximum dimension: **1600px width** (Hero) / **800px width** (Thumbnails)
* Quality target: **0.80 (80%)**
* Maximum file size limit: **< 250 KB** (down from 8MB—a 97% bandwidth reduction!)

#### B. Aggressive Edge Caching Headers
Configure immutable cache headers on static assets and images in Firebase Storage & Vercel:
```
Cache-Control: public, max-age=31536000, immutable
```

#### C. Google Cloud Billing Alerts
* Configure hard billing budget notifications in Google Cloud Console at ₹500, ₹1,000, and ₹2,500 thresholds to prevent unexpected cost runaway.

---

## 5. Verification & Pre-Launch Load Checklist

Before greenlighting production launch:

1. **Simulated Concurrent Load:** Run a local stress test with `autocannon` verifying the website renders and caches cleanly under 500 requests/sec.
2. **Bundle Size Audit:** Verify the frontend JS bundle is under 150KB gzip using `vite-plugin-visualizer`.
3. **Lighthouse Performance Score:** Ensure Mobile Lighthouse performance is ≥ 90, with First Contentful Paint (FCP) < 1.2s.
4. **Console Audit:** Confirm zero memory leak warnings, zero uncleaned `useEffect` intervals, and zero duplicate network requests in browser DevTools.
