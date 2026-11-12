# Property Gateway — Live Building Blueprint & Execution Reference
## Quick-Reference Guide for Page Sections, Funnels, Features & Conversion Triggers

---

## 1. Fast Reference: Client & Project Constants

* **Brand Name:** Property Gateway
* **Primary Phone / WhatsApp:** `+91 7598954635` (Display: `+91 75989 54635`)
* **Primary Contact Email:** `propertygatewy@gmail.com`
* **Office Location:** Flat No. 2, New No 25, Alandur Road, Saidapet, Chennai - 600015
* **TNRERA Registration:** `TN/Agent/0117/2026`
* **Local Ports:**
  * Public Website: `http://localhost:3000`
  * Admin Portal: `http://localhost:3001`
* **Color Palette Quick Codes:**
  * Navy 900: `#0A192F` (Authority, Headers)
  * Emerald 600: `#059669` (Action, Buttons, Filters)
  * Gold 500: `#C5A880` (Luxury Badges, Exclusive)
  * Canvas: `#F8FAFC` (Glaze-free Alabaster)
  * WhatsApp Green: `#25D366`

---

## 2. Dynamic WhatsApp & Call Link Formulas

Use these exact helpers across all cards, modals, and buttons:

```javascript
// Dynamic Context-Aware WhatsApp Deep Link
export function getPropertyWhatsAppLink(property) {
  const phone = "917598954635";
  const text = `Hi Property Gateway! 🏡
I am interested in: *${property.title}*
📍 Location: ${property.location}
💰 Price: ${property.priceDisplay}
🔗 Reference: https://www.propertygatewaypro.com/property/${property.slug}

Please share the brochure, available floor plans, and site visit details.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

// General WhatsApp Link
export const GENERAL_WHATSAPP_LINK = "https://wa.me/917598954635?text=Hi%20Property%20Gateway,%20I%20am%20looking%20for%20properties%20in%20Chennai.%20Please%20guide%20me.";

// Direct Phone Link
export const DIRECT_PHONE_LINK = "tel:+917598954635";
```

---

## 3. Page-by-Page Building Specifications

### Page 1: Home Page (`/`)

```
+----------------------------------------------------------------------------+
| 1. GLOBAL NAVBAR (Sticky, 1px border, Logo, Links, +91 7598954635, CTA)    |
+----------------------------------------------------------------------------+
| 2. HERO SECTION (100vh Desktop)                                            |
|    - Headline: "Find Your Perfect Home in Chennai"                         |
|    - Subhead: "Direct Builder Pricing • Verified Titles • Zero Brokerage"  |
|    - Trust Badges: [TNRERA Approved] [Legal Clear] [Zero Brokerage]        |
|    - STICKY SEARCH BAR (Location | Category | Budget | Search Button)      |
+----------------------------------------------------------------------------+
| 3. MICRO-MARKET QUICK FILTERS (OMR, ECR, Anna Nagar, Porur, Guindy)        |
+----------------------------------------------------------------------------+
| 4. FEATURED PROPERTIES GRID (3 Columns, 16:10 Cards, Status Chips, Price)  |
+----------------------------------------------------------------------------+
| 5. WHY PROPERTY GATEWAY (4 Factual Pillars: RERA, Builders, Zero Comm, Cab)|
+----------------------------------------------------------------------------+
| 6. INTERACTIVE EMI CALCULATOR (Amount Slider, Rate, Tenure, Monthly EMI)   |
+----------------------------------------------------------------------------+
| 7. NEW LAUNCHES SPOTLIGHT (High-impact Banner, Pre-launch pricing)         |
+----------------------------------------------------------------------------+
| 8. SCHEDULE FREE SITE VISIT CTA (Form: Name, Phone, Date, Free Cab Pickup) |
+----------------------------------------------------------------------------+
| 9. GLOBAL FOOTER (TNRERA License, Address, Disclaimer, Policies)           |
+----------------------------------------------------------------------------+
| [PINNED MOBILE BAR: Call Now (Navy) | WhatsApp (Green)] - md:hidden        |
+----------------------------------------------------------------------------+
```

---

### Page 2: Properties Catalog Page (`/properties`)

* **Top Search Header:** Active filters bar with instant result count (`"Showing 24 Verified Properties in Chennai"`).
* **Sidebar (Desktop) / Slide-Up Drawer (Mobile):**
  * *Property Type:* All, Apartments, Villas, Plots, Commercial.
  * *BHK Filter:* 1 BHK, 2 BHK, 3 BHK, 4+ BHK.
  * *Location Checkboxes:* OMR, ECR, Anna Nagar, Porur, Guindy, Velachery, Tambaram.
  * *Budget Slider:* Min ₹25L to Max ₹5Cr+.
  * *Possession Status:* Ready to Move, Under Construction, New Launch.
* **Results Grid:**
  * Cursor-paginated cards (`limit(12)`).
  * Sort options: *Price: Low to High*, *Price: High to Low*, *Latest First*.
  * Empty State: *"No properties found matching this criteria — Request a Custom Property Match on WhatsApp"*.

---

### Page 3: Property Detail Page (`/property/:slug`)

* **Hero Media Gallery:**
  * Master image + 4 thumbnail grid with photo count badge (`"View all 12 Photos"`).
  * Lightbox modal on image click.
* **Sticky Right-Hand Rail (Desktop):**
  * Display Price (`₹1.25 Cr`), EMI estimate (`₹96,000/mo`).
  * Instant Inquiry Form (Name, Phone, WhatsApp consent).
  * 1-Click WhatsApp Button (Pre-filled message).
  * Direct Call Button.
* **Main Left Rail:**
  * Property Overview: Configuration, Built-up Area, Floor, Facing (North/East/Vastu), Possession Date.
  * Description & Developer Background.
  * Amenities Grid: Lucide icons (Clubhouse, Gym, Swimming Pool, 24/7 Security, Power Backup, EV Charging).
  * Floor Plans Tab: 2D & 3D layout images with zoom modal.
  * Location & Proximity: Nearby Metro, Schools, IT Corridors, Airport.
  * Interactive Google Maps Embed (`loading="lazy"`).
  * Project RERA Registration Number (`TN/01/Layout/1234/2026`).

---

### Page 4: About Us Page (`/about`)

* **Company Mission:** Establishing transparency and zero-brokerage direct advisory in Chennai's real estate ecosystem.
* **Leadership & Strategy 360 Partnership:** Consulting heritage and market reach across residential & commercial sectors.
* **Our Process:** 4 Simple Steps (Consultation ➡️ Curated Shortlist ➡️ Free Private Cab Site Visit ➡️ Legal Documentation & Handover).
* **Accreditations:** TNRERA Registration, CREAA Association partnership.

---

### Page 5: Contact Us Page (`/contact`)

* **Direct Office Details:** Saidapet registered address, Google Maps direction embed.
* **Working Hours:** Monday to Sunday (9:00 AM – 8:00 PM).
* **Direct Contacts:** Phone click-to-call, email mailto, WhatsApp chat.
* **General Inquiry Form:** Honeypot protected, 60s cooldown, instant Firestore lead creation.

---

### Page 6: Admin Management Portal (`admin/`)

* **`/login`:** Secure Firebase Auth form (Email & Password) with invalid attempt lockout.
* **`/dashboard`:** Summary cards:
  * Total Active Properties
  * Total Inquiries Received
  * Pending Site Visits This Week
* **`/properties` (Full CRUD):**
  * Searchable table with Thumbnail, Title, Type, Location, Price, Status, and Actions (`Edit`, `Toggle Active`, `Delete`).
  * **Add/Edit Property Modal:**
    * Title, Slug (auto-generated), Property Type dropdown, Listing Type (Sale/Rent).
    * Price (Numeric for search) + Price Display string (e.g. `₹1.45 Cr`).
    * Location & City, BHK, Square Feet, Possession Status.
    * Multi-image Uploader with in-browser WebP compression (< 250KB).
    * Amenities checkboxes, Description, RERA ID.
* **`/leads` (Inquiries Pipeline):**
  * Table of leads with Customer Name, Phone, Property Inquired, Date, and Status badge.
  * Status Dropdown: `New` ➡️ `Contacted` ➡️ `Site Visit Scheduled` ➡️ `Closed`.
  * Direct 1-click WhatsApp button to message the customer directly.

---

## 4. Psychological Conversion Triggers Reference

| Trigger | UI Implementation | Why It Converts Homebuyers |
| :--- | :--- | :--- |
| **1. Radical Trust** | Green **"TNRERA Approved"** & **"100% Clear Title"** badge on every card. | Eliminates the #1 fear of legal dispute and unauthorized land. |
| **2. Zero Brokerage** | Bold callout: **"₹0 Brokerage on New Projects"**. | Removes the hesitation of paying hefty 2% agent commissions. |
| **3. Micro-Commitments** | Clickable chips (Area ➡️ BHK ➡️ Price) before asking for a phone number. | Lower initial psychological barrier than a heavy form. |
| **4. Frictionless WhatsApp** | 1-tap pre-filled WhatsApp deep link on every listing. | 85%+ of Indian buyers prefer WhatsApp over email and phone calls. |
| **5. Value-First Offer** | **"Free Private Cab for Site Visits"** CTA. | Incentivizes family property visits by removing travel friction. |
| **6. Scarcity & FOMO** | Dynamic badges: *"Only 3 Units Left in Phase 1"*. | Encourages immediate inquiry before price revision. |

---

## 5. Non-Negotiable Engineering Rules While Building

1. **Tokens Only:** All styling must reference defined Tailwind tokens (`brand.navy.*`, `brand.emerald.*`, `brand.gold.*`). No rogue hex colors!
2. **Never `transition: all`:** Only animate `transform`, `opacity`, `box-shadow` with 200ms ease.
3. **8pt Grid Discipline:** Margins and padding strictly increment by 8px (`8, 16, 24, 32, 48, 64px`).
4. **iOS 16px Input Rule:** Every `<input>`, `<select>`, `<textarea>` has minimum `text-base` (16px) to stop iOS Safari auto-zooming.
5. **No Layout Property Animation:** Never animate `width`, `height`, `top`, or `left`.
6. **Query Bounds:** Never call `onSnapshot` on the public website. Always use `getDocs()` with `limit(12)`.
7. **Client-Side Image Compression:** Compress all images to WebP (< 250KB) in the browser before upload to Firebase Storage.
8. **Stateless Auth:** Use Firebase JWT tokens verified on serverless functions.
9. **Zero Fake Reviews:** Real RERA data, real Chennai micro-markets, factual service pillars.
10. **Overflow Invariant:** `overflow-x: clip` on `html` and `body`. Verify at 375px width.
