# Property Gateway — Dynamic Real Estate Website & Admin Portal
## Comprehensive Project Specification & Implementation Plan

---

## 1. Executive Summary & Client Profile

* **Project Name:** Property Gateway Real Estate Web Platform
* **Client Company:** Property Gateway (PropertyGateway)
* **Client Email:** `propertygatewy@gmail.com`
* **Client Phone / WhatsApp:** `+91 7598954635`
* **Agency:** Strategy 360 Digital Marketing Agency, Saidapet, Chennai - 600 088
* **Quotation Date:** 04 November 2026 (Validity: 15 Days)
* **Total Project Budget:** **₹18,000 INR** (Rupees Eighteen Thousand Only)

### Payment Milestones
1. **Advance (Kickoff):** ₹5,000 *(To initiate design and development)*
2. **Phase 2 (Design & Dev Completion):** ₹6,500
3. **Phase 3 (Final Handover & Deployment):** ₹6,500

---

## 2. Agreed Deliverables & Scope of Work

| # | Module | Scope & Specifications |
|---|---|---|
| 1 | **Home Page** | Premium hero banner, quick search bar, featured properties, company highlights, customer testimonials, and CTA banners. |
| 2 | **About Us** | Company background, mission, vision, leadership, and Chennai real estate consultancy service offerings. |
| 3 | **Properties Catalog** | Categorized listings: Residential (Apartments, Villas, Plots) & Commercial (Offices, Retail, Warehouses). |
| 4 | **Property Details** | High-res photo gallery, price, BHK/sq.ft specs, amenities checklist, location map, and instant inquiry form. |
| 5 | **Search & Filter** | Instant client-side & Firestore filtering by Property Type, Location (e.g., OMR, ECR, Anna Nagar), and Budget. |
| 6 | **Contact & Inquiries** | Lead capture forms, direct WhatsApp floating button, click-to-call, email triggers, and Google Map. |
| 7 | **Admin Panel** | Secure authenticated dashboard to add, edit, mark sold/inactive, and delete listings + lead management. |
| 8 | **Responsive & Motion** | 100% mobile, tablet, and desktop responsive with subtle, modern micro-interactions (*"Konjam add pannuga"*). |

### Scope Exclusions (As agreed in quotation)
* Domain registration and recurring hosting fees (borne by client).
* Paid third-party plugins or external paid API subscriptions.
* Enterprise ERP/CRM integrations.
* Ongoing post-handover website maintenance.

---

## 3. Market Research & Benchmark References

* **JLL Chennai ([jll.co.in](https://www.jll.co.in)):** Benchmark for corporate trust, high-end commercial & luxury residential presentation, clean typography, and precise property spec badges.
* **Connection Point ([connectionpoint.in](https://www.connectionpoint.in)):** 35-year Chennai legacy brokerage benchmark. We adopt their Chennai micro-market focus (OMR, ECR, Egmore, Anna Nagar, Porur) and prominent RERA trust marks.
* **PropLeaf ([propleaf.com](https://www.propleaf.com)):** Modern real estate consultancy benchmark. We adopt their high-conversion hero search bar, WhatsApp quick actions on cards, and project status tags (*Under Construction*, *Ready to Move*, *New Launch*).

---

## 4. Technology Stack & Key Decisions

* **Frontend Library:** React.js (JavaScript — strictly **No TypeScript** as specified).
* **Styling Framework:** Tailwind CSS with custom theme variables.
* **Icons & UI:** Lucide React icons, Headless UI / Radix primitives.
* **Animation & Motion:** CSS3 transitions, smooth Tailwind animation utilities, and subtle micro-interactions (*hero reveals, card hovers, pulsing WhatsApp CTA*).
* **Backend & Database:** Firebase
  * **Firebase Authentication:** Secure email/password login for Admin.
  * **Cloud Firestore:** NoSQL database for real-time property listings and customer leads.
  * **Firebase Storage:** High-performance storage and CDN for property images and floor plans.
* **Local Dev Tooling:** Vite (Fast build & HMR) + Node.js.
* **Hosting & Deployment:** Vercel (Production deployment linked later to custom client domains).

---

## 5. Monorepo Architecture & Folder Structure

Both applications reside in the same repository under two standalone folders:
* `website/` ➡️ Public real estate portal, running locally on **`http://localhost:3000`**
* `admin/` ➡️ Internal management portal, running locally on **`http://localhost:3001`**

```
property_gateway/
├── package.json                         # Root runner: runs both apps concurrently
├── PROJECT_SPECIFICATION.md             # This comprehensive document
├── .gitignore
│
├── website/                             # PUBLIC PORTAL (Port: 3000)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                   # server: { port: 3000 }
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example                     # VITE_FIREBASE_* credentials
│   ├── public/
│   └── src/
│       ├── assets/                      # Logos, placeholder banners
│       ├── components/
│       │   ├── common/                  # Navbar, Footer, WhatsAppButton, Modal
│       │   ├── home/                    # HeroSection, QuickSearch, FeaturedListings, StatsSection
│       │   ├── property/                # PropertyCard, PropertyGrid, PropertyFilterBar
│       │   └── forms/                   # InquiryForm, VisitScheduleModal
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── PropertiesPage.jsx
│       │   ├── PropertyDetailPage.jsx
│       │   ├── AboutPage.jsx
│       │   └── ContactPage.jsx
│       ├── services/
│       │   ├── firebase.js              # Firebase client instance
│       │   └── propertyService.js       # getProperties, getPropertyById, submitInquiry
│       ├── context/
│       │   └── FilterContext.jsx        # Real-time search & filter state
│       ├── utils/
│       │   ├── formatters.js            # ₹ Lakhs/Crore currency & area formatter
│       │   └── constants.js             # Chennai locations, property types, amenities
│       ├── App.jsx                      # React Router DOM configuration
│       ├── main.jsx
│       └── index.css                    # Tailwind directives & motion animations
│
└── admin/                               # ADMIN PORTAL (Port: 3001)
    ├── index.html
    ├── package.json
    ├── vite.config.js                   # server: { port: 3001 }
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example                     # VITE_FIREBASE_* credentials
    ├── public/
    └── src/
        ├── components/
        │   ├── layout/                  # AdminSidebar, AdminHeader, AdminLayout
        │   ├── properties/              # PropertyFormModal, ImageUploader, DeleteConfirmModal
        │   ├── leads/                   # LeadTable, LeadStatusBadge, LeadDetailModal
        │   └── common/                  # StatCard, DataTable, LoadingState
        ├── pages/
        │   ├── LoginPage.jsx            # Admin Firebase Auth Login
        │   ├── DashboardPage.jsx        # Total listings, active inquiries, recent activities
        │   ├── ManageProperties.jsx     # Full CRUD table & property modal
        │   ├── ManageLeads.jsx          # Review customer inquiries & status update
        │   └── SettingsPage.jsx         # Admin profile & contact settings
        ├── services/
        │   ├── firebase.js              # Firebase instance
        │   ├── authService.js           # Admin login, logout, session check
        │   ├── propertyAdminService.js  # createProperty, updateProperty, deleteProperty, uploadImages
        │   └── leadAdminService.js      # getInquiries, updateInquiryStatus
        ├── context/
        │   └── AuthContext.jsx          # Protected route auth state & route guard
        ├── App.jsx                      # Protected Admin routes
        ├── main.jsx
        └── index.css
```

---

## 6. Firebase Firestore Data Schemas

### `properties` Collection
```json
{
  "id": "doc_id",
  "title": "3 BHK Luxury Apartment in ECR",
  "slug": "3-bhk-luxury-apartment-ecr",
  "propertyType": "Apartment",
  "listingType": "Sale",
  "price": 12500000,
  "priceDisplay": "₹1.25 Cr",
  "location": "East Coast Road (ECR)",
  "city": "Chennai",
  "bhk": 3,
  "builtUpArea": "1850 sq.ft",
  "status": "Ready to Move",
  "isFeatured": true,
  "isActive": true,
  "images": [
    "https://firebasestorage.googleapis.com/.../img1.webp",
    "https://firebasestorage.googleapis.com/.../img2.webp"
  ],
  "amenities": ["Covered Parking", "Swimming Pool", "24/7 Security", "Gym", "Power Backup"],
  "description": "Premium sea-facing apartment with world-class amenities...",
  "reraId": "TN/Agent/0117/2026",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

### `inquiries` Collection
```json
{
  "id": "doc_id",
  "propertyId": "doc_id",
  "propertyTitle": "3 BHK Luxury Apartment in ECR",
  "name": "Customer Name",
  "phone": "+91 9876543210",
  "email": "customer@gmail.com",
  "message": "Interested in site visit.",
  "status": "New",
  "createdAt": "Timestamp"
}
```

---

## 7. Vercel Multi-Project Deployment Setup

A single Git repository is connected to **two separate Vercel projects**:

| Configuration | Project 1: Public Website | Project 2: Admin Panel |
|---|---|---|
| **Vercel Project Name** | `propertygateway-web` | `propertygateway-admin` |
| **Root Directory** | `website` | `admin` |
| **Framework Preset** | Vite | Vite |
| **Build Command** | `npm run build` | `npm run build` |
| **Output Directory** | `dist` | `dist` |
| **Default Vercel URL** | `https://propertygateway-web.vercel.app` | `https://propertygateway-admin.vercel.app` |
| **Final Custom Domain** | `propertygateway.in` (or `.com`) | `admin.propertygateway.in` |

*Both apps use the identical Firebase configuration environment variables.*

---

## 8. Root Orchestration (`package.json`)

```json
{
  "name": "property-gateway-workspace",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:web\" \"npm run dev:admin\"",
    "dev:web": "npm --prefix website run dev",
    "dev:admin": "npm --prefix admin run dev",
    "build:web": "npm --prefix website run build",
    "build:admin": "npm --prefix admin run build"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

---

## 9. Immediate Action Items & Credentials Checklist

- [ ] **Advance Payment:** Confirm ₹5,000 received.
- [ ] **Domain Registrar Login:** (GoDaddy / Hostinger / BigRock) to point DNS records to Vercel later.
- [ ] **Hosting Control Panel:** (cPanel / hPanel) if email hosting or existing services are tied to it.
- [ ] **Firebase Project Setup:** Create `property-gateway-app` on Firebase console (Enable Auth, Firestore, Storage).
- [ ] **Client Assets:** High-resolution company logo, official office address, and initial property listings.
