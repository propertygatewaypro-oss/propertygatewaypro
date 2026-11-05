---
version: 1.0.0
name: PropertyGateway-Design-System
description: The official design specification for Property Gateway, modeled on the VoltAgent/awesome-design-md schema and synthesized from world-class property platforms (Airbnb, JLL, Sotheby's). Features a sovereign architectural slate navy canvas, vibrant heritage emerald for growth and verified RERA conversion, champagne gold luxury ribbons, disciplined 8pt spatial math, and quiet 60fps micro-interactions.

colors:
  # Primary Architectural Brand (Headers, Footers, Solid Authority)
  brand-navy-950: "#060D17"
  brand-navy-900: "#0A192F"
  brand-navy-800: "#112240"
  brand-navy-700: "#1D3557"

  # Heritage Emerald (Growth, RERA Approval, Primary Action Triggers)
  brand-emerald-700: "#047857"
  brand-emerald-600: "#059669"
  brand-emerald-500: "#10B981"
  brand-emerald-100: "#D1FAE5"
  brand-emerald-50:  "#ECFDF5"

  # Champagne Gold (Exclusive Luxury Villas, Penthouses, Status Ribbons)
  brand-gold-700: "#99733E"
  brand-gold-600: "#B88E4C"
  brand-gold-500: "#C5A880"
  brand-gold-100: "#FBF5EB"

  # Direct Lead Generation CTA
  brand-whatsapp: "#25D366"
  brand-whatsapp-hover: "#20BA56"

  # Functional Surfaces & Text
  canvas-base: "#F8FAFC"
  surface-card: "#FFFFFF"
  surface-subtle: "#F1F5F9"
  text-primary: "#0F172A"
  text-muted: "#475569"
  text-light: "#94A3B8"
  border-subtle: "#E2E8F0"
  border-strong: "#CBD5E1"

typography:
  display-hero:
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
    fontSize: "44px"
    fontWeight: "700"
    lineHeight: "1.15"
    letterSpacing: "-0.03em"
  display-section:
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    fontSize: "30px"
    fontWeight: "700"
    lineHeight: "1.25"
    letterSpacing: "-0.02em"
  title-property:
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    fontSize: "18px"
    fontWeight: "600"
    lineHeight: "1.35"
    letterSpacing: "-0.01em"
  price-display:
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    fontSize: "20px"
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: "-0.01em"
    fontVariantNumeric: "tabular-nums"
  body-md:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0"
  body-sm:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
  badge-label:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: "0.02em"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"

radii:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"

shadows:
  subtle: "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)"
  card-hover: "0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)"
  modal: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)"
  floating-cta: "0 4px 16px rgba(37, 211, 102, 0.35)"
---

# Property Gateway — Complete Design Specification (DESIGN.md)

## 1. Visual Thesis & Philosophy

Property Gateway bridges luxury architectural clarity with high-velocity lead generation. The visual identity avoids the cold minimalism of pure fintech and the cluttered chaos of traditional classified portals.
* **The Sovereign Architectural Navy (`#0A192F`):** Anchors navbars and headers with institutional trust and permanence.
* **Heritage Emerald (`#059669`):** Directs the user's attention to primary search actions, verified RERA badges, and inquiry buttons.
* **Warm Alabaster Canvas (`#F8FAFC`):** Lets high-resolution real estate photography command the screen without glare.

---

## 2. Component Design Anatomy

### A. The Sticky Search Filter Bar
* **Desktop:** Rounded pill container (`rounded-full`) floating with 1px border (`#E2E8F0`), housing 4 clean segments:
  1. *Location Picker:* Chennai micro-markets (OMR, ECR, Anna Nagar, Porur, Guindy).
  2. *Property Type:* Apartments, Luxury Villas, Plots, Commercial.
  3. *Budget Range:* ₹25L–₹50L, ₹50L–₹1Cr, ₹1Cr–₹3Cr, ₹3Cr+.
  4. *CTA Button:* Heritage Emerald search pill with magnifying glass icon.
* **Mobile:** Compact trigger button opening a touch-native slide-up bottom sheet with 44px filter chips.

### B. Property Listing Card
* **Surface:** `#FFFFFF` with crisp 1px border (`#E2E8F0`) and `rounded-xl` (12px).
* **Media Container:** 16:10 aspect ratio with `overflow-hidden`. On card hover, image smoothly scales `1.02×` over 250ms ease-out.
* **Status Badges (Top-Left of Image):**
  * *Ready to Move:* Emerald tint (`#ECFDF5`, text `#047857`).
  * *Under Construction:* Amber tint (`#FFFBEB`, text `#92400E`).
  * *Exclusive:* Champagne Gold tint (`#FBF5EB`, text `#99733E`).
* **Spec Chips Row:** BHK, Square Footage (`1,850 sq.ft`), and Parking status laid out with clean Lucide icons.
* **Price & Quick CTA Row:** Price emphasized in tabular bold emerald (`₹1.25 Cr`) alongside a 1-tap WhatsApp quick inquiry button.

### C. Floating Mobile Conversion Bar (`md:hidden`)
* Pinned to bottom viewport with `z-50`, blurred white backing (`backdrop-blur-md`), and dual direct actions:
  * **Call Now:** `tel:+917598954635` (Navy theme).
  * **WhatsApp:** `wa.me/917598954635` (WhatsApp green `#25D366`).

---

## 3. Motion & Micro-Interactions

* **Hover Lift:** Cards lift exactly 2px on desktop hover (`transform: translateY(-2px)`).
* **Button Press Physics:** Interactive buttons scale to `0.98` on click/tap (`active:scale-[0.98]`).
* **WhatsApp Button Breathing Ring:** 3-second gentle pulse effect on floating button.
* **Reduced Motion Gating:** All transitions gracefully fall back to instant state changes when `prefers-reduced-motion: reduce` is detected.

---

## 4. Anti-AI / Anti-Slop Constraints

* ❌ No purple-to-blue neon glow gradients.
* ❌ No cards nested inside cards.
* ❌ No fake testimonials, stock headshots, or fabricated counts.
* ❌ No layout property animations (`width`, `height`, `top`).
* ❌ Zero horizontal overflow (`overflow-x: clip`).
* ❌ No inputs smaller than 16px to prevent iOS auto-zoom bugs.
