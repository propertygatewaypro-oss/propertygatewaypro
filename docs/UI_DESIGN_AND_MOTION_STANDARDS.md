# UI Design & Motion Standards — Property Gateway
## Anti-Vibe-Coded Design System & Interaction Guide

---

## 1. Dual Interface Modes

### Mode 1: PERSUADE (Public Website — Port 3000 / `propertygateway.in`)
* **Objective:** Establish instant credibility, showcase property inventory, and convert visitors into qualified leads (via WhatsApp, calls, and site visit booking forms).
* **Rhythm & Structure:**
  * Dominant hero section featuring a fast, sticky Chennai micro-market search bar (Location, Property Type, Budget).
  * High-clarity property cards with high-contrast spec chips (`BHK`, `Sq.Ft`, `Price in ₹ Lakhs/Cr`, `RERA Status`).
  * Authentic Chennai context (OMR, ECR, Anna Nagar, Porur, Guindy) rather than placeholder generic cities.
  * Frictionless conversion triggers: floating WhatsApp CTA with a gentle breathing pulse, and click-to-call.

### Mode 2: OPERATE (Admin Management Portal — Port 3001 / `admin.propertygateway.in`)
* **Objective:** Fast, error-free management of listings, inquiries, media uploads, and listing availability.
* **Rhythm & Structure:**
  * Dense, scannable data grids and clean data tables.
  * Calm, utilitarian layout with high contrast, predictable inputs, and keyboard navigation.
  * Clear confirmation modals before destructive actions (e.g. deleting properties).
  * Instant visual indicators for lead status (`New`, `Contacted`, `Site Visit Scheduled`, `Closed`).

---

## 2. Visual Identity & Design Tokens

### Color Roles (Tailwind-compatible)
* **Canvas (Background):** `#F8FAFC` (Slate 50) for public site; `#F1F5F9` (Slate 100) for admin surfaces.
* **Surface (Cards & Panels):** `#FFFFFF` (Pure White with crisp 1px borders, avoiding heavy blurred shadows).
* **Brand Primary (Deep Navy):** `#0F172A` (Slate 900) — communicates stability, institutional trust, and architectural authority.
* **Accent / Action (Emerald Green):** `#059669` (Emerald 600) / Hover: `#047857` (Emerald 700) — signifies investment growth, verified RERA approval, and primary action buttons.
* **Secondary / WhatsApp CTA:** `#25D366` — designated exclusively for direct WhatsApp lead generation.
* **Text Primary:** `#0F172A` (Slate 900, minimum 7:1 contrast on white).
* **Text Muted:** `#475569` (Slate 600, minimum 4.5:1 contrast for accessibility).
* **Border:** `#E2E8F0` (Slate 200).
* **Status Badges:**
  * *Ready to Move:* Emerald tint (`#ECFDF5`, text `#065F46`).
  * *Under Construction:* Amber tint (`#FFFBEB`, text `#92400E`).
  * *New Launch:* Blue tint (`#EFF6FF`, text `#1E40AF`).

---

## 3. Motion & Animation Standards (*"Konjam add pannuga"*)

1. **Target Specific Properties:** Never use `transition: all`. Always specify properties (`transform`, `opacity`, `box-shadow`, `background-color`) with a 200ms ease curve.
2. **Hero Entrance:** Single staggered slide-up (`translate-y-4` to `translate-y-0` + fade-in) on initial page mount.
3. **Property Card Interaction:**
   * Image subtly zooms (`scale-105` inside an `overflow-hidden` container) on card hover.
   * Card gently elevates with `shadow-md`.
4. **Category & Filter Switcher:** Smooth opacity and transform transitions when switching between *All, Apartments, Villas, Plots, and Commercial*.
5. **Floating Action Trigger:** WhatsApp button features a subtle 3-second gentle pulse ring to draw natural attention without obstructing content.
6. **Accessibility Invariant:** Honor `prefers-reduced-motion: reduce` by disabling non-essential transitions.
