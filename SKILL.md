---
name: anti-vibe-coded-ui
description: Guidelines and production standards for crafting distinctive, accessible, responsive, and anti-vibe-coded real estate interfaces for Property Gateway and Strategy 360 projects. Eliminates generic AI templates in favor of authentic, production-grade UI design and resilient code.
version: 1.0.0
---

# Anti-Vibe-Coded UI Craft — Property Gateway Engineering & Design System

## Mission

Build user interfaces for **Property Gateway** that feel deliberately designed for Chennai home buyers, property investors, and agency administrators—not an interchangeable template assembled from superficial AI effects. Every visual choice must serve a distinct functional purpose, verified against real responsive layouts, robust accessibility standards, and clean maintainable code.

Reject unexamined AI defaults (purple glow gradients, nested cards-within-cards, arbitrary gradient headline words, badges on every small element, and decorative non-working buttons).

---

## 1. Dual Interface Modes for Property Gateway

This platform consists of two distinct applications sharing a unified design language:

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

### Typography Ladder
* **Display & Hero Headings:** Crisp Sans-Serif (`Inter` / `Plus Jakarta Sans`), semi-bold (600) to bold (700) with tight tracking (`tracking-tight`).
* **Body Prose:** Clean, legible font at 16px (1rem), 1.5–1.6 line height.
* **Data & Currency:** Tabular figures for prices (`₹1.25 Cr`), square footage (`1,850 sq.ft`), and contact numbers to prevent jitter.

### Shapes & Depth
* **Radii Scale:** `sm: 4px`, `md: 8px`, `lg: 12px`, `xl: 16px`.
* **Container Rule:** Parent outer radius must equal inner child radius + container padding (`outer_radius ≈ inner_radius + padding`).
* **Elevation:** Prefer subtle 1px border (`border border-slate-200`) over heavy drop shadows. Card hover lift should be restrained (`translate-y-[-2px]` with smooth 200ms ease).

---

## 3. Motion & Animation Standards (*"Konjam add pannuga"*)

Subtle, intentional motion that elevates perceived performance without delaying user tasks:

1. **Target Specific Properties:** Never use `transition: all`. Always specify properties:
   ```css
   transition-property: transform, opacity, box-shadow, background-color;
   transition-duration: 200ms;
   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
   ```
2. **Hero Entrance:** Single staggered slide-up (`translate-y-4` to `translate-y-0` + fade-in) on initial page mount.
3. **Property Card Interaction:**
   * Image subtly zooms (`scale-105` inside an `overflow-hidden` container) on card hover.
   * Card gently elevates with `shadow-md`.
4. **Category & Filter Switcher:** Smooth opacity and transform transitions when switching between *All, Apartments, Villas, Plots, and Commercial*.
5. **Floating Action Trigger:** WhatsApp button features a subtle 3-second gentle pulse ring to draw natural attention without obstructing content.
6. **Accessibility Invariant:** Honor `prefers-reduced-motion: reduce` by disabling non-essential transitions for users with vestibular sensitivities.

---

## 4. Anti-Patterns to Strictly Avoid

Do not allow the following generic AI tropes into Property Gateway:
* ❌ Arbitrary dark neon glows (purple, cyan, pink backlights) that make a real estate site look like a crypto dashboard.
* ❌ Centered generic 3-box feature grids with meaningless icons ("Fast", "Secure", "Reliable").
* ❌ Badges or pills placed around every single text item.
* ❌ Fake statistics or stock developer quotes ("10,000+ Happy Customers" without verified client backing).
* ❌ Decorative interactive elements (e.g. filter dropdowns or buttons that do not actually filter or trigger an action).
* ❌ Hiding layout overflow bugs with `overflow-x: hidden` on the root body instead of fixing responsive box sizes.

---

## 5. Responsive Engineering & Breakpoint Verification

Every layout must be tested and verified at the following standard widths:
* **375px (Mobile Portrait):**
  * Single-column vertical stack.
  * Search filter collapses into an accessible mobile bottom sheet or accordion.
  * WhatsApp and Call CTAs pinned as an accessible bottom action bar.
  * Touch targets adhere to minimum **44 × 44px** hit areas.
* **768px (Tablet):** 2-column property card grid, side-by-side spec badges.
* **1024px (Small Laptop / Desktop):** 3-column property grid, sticky filter sidebar or horizontal bar.
* **1440px (Wide Desktop):** Maximum container constraint (`max-w-7xl mx-auto px-6`) to prevent extreme line lengths.

---

## 6. Accessibility & Semantic Quality (WCAG 2.2 AA)

1. **Semantic HTML:**
   * `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` landmarks.
   * `<a>` tags for all route navigations; `<button>` tags for modal triggers, filters, and form submissions.
2. **Accessible Forms:**
   * Visible, explicit `<label>` elements for every input (Name, Phone, Email, Budget).
   * Native input attributes: `type="tel"`, `autocomplete="tel"`, `inputmode="numeric"`.
3. **Contrast:**
   * All body and label text must achieve at least 4.5:1 contrast against surface backgrounds.
   * High-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2`).
4. **Media Alt Text:**
   * Meaningful property alt tags: e.g. `alt="Spacious living room of 3 BHK apartment in ECR with sea view"`, never `alt="image"` or `alt="property"`.

---

## 7. Definition of Done Checklist

Before submitting any screen or module for GM review:
- [ ] **Functional Integrity:** Every button, filter, tab, form submission, and route behaves as promised.
- [ ] **No Dead Controls:** Submitting an inquiry actually creates a record in Firebase Firestore.
- [ ] **Zero Horizontal Overflow:** Verified at 375px without relying on body `overflow-x: hidden`.
- [ ] **Real Chennai Data:** Uses genuine local areas (OMR, ECR, Anna Nagar, Velachery, Guindy, Porur).
- [ ] **Tasteful Motion:** Smooth 200ms card transitions, stable layout during loading, reduced-motion compliance.
- [ ] **Console Cleanliness:** Zero React hydration warnings, zero missing key warnings, zero broken image links.
