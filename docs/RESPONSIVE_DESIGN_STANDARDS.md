# Responsive Real Estate UI Standards — Property Gateway
## Mobile-First Guidelines, Touch Architecture & Ergonomics

---

## 1. Why Responsive Design is Critical for Property Gateway
Over 75% of Indian property searches originate on mobile smartphones via WhatsApp recommendations, social media ads, and mobile search. This document details our mobile-first engineering standards to ensure high conversion, effortless navigation, and zero layout bugs.

---

## 2. Key Device Breakpoints

| Breakpoint | Width | Core Form Factor | Behavior |
| :--- | :--- | :--- | :--- |
| **`xs` / Mobile** | **375px – 430px** | Smartphones | Single column, sticky bottom CTA bar, bottom-sheet filters, touch-swipe image galleries, minimum 44px tap targets. |
| **`sm` / Large Mobile** | **640px** | Landscape phones / phablets | 2-column spec badges, adjusted horizontal padding. |
| **`md` / Tablet** | **768px – 834px** | iPad, Android tablets | 2-column property card grid, dual action buttons. |
| **`lg` / Laptop** | **1024px** | MacBook Air, standard laptops | 3-column property grid, persistent sticky filter bar. |
| **`xl` / Desktop** | **1280px – 1440px** | Large monitors | Max-width container (`max-w-7xl mx-auto px-6`), side gutters expand. |

---

## 3. High-Conversion Mobile Patterns

### A. Pinned Mobile Bottom Action Bar (`md:hidden`)
On mobile devices (`< 768px`), visitors must never have to scroll back up or search through long pages to contact Property Gateway. A fixed bottom bar houses two high-priority action buttons:
1. **Call Now (`tel:+917598954635`)** — Slate navy button with phone icon.
2. **WhatsApp (`wa.me/917598954635`)** — Official WhatsApp green (`#25D366`) with pre-filled message.

### B. Adaptive Search & Filter
* **Desktop:** Horizontal filter bar beneath the hero banner.
* **Mobile:** Compact filter trigger button opening a touch-friendly **Bottom Sheet Drawer** with large, easily tappable option chips.

### C. Touch-Swipe Property Image Carousel
* Native CSS scroll-snap (`scroll-snap-type: x mandatory`) with hardware acceleration and peek-ahead slides (`width: 88%`) indicating swipe affordance.

### D. Admin Tables Responsive Transformation
* On screens `< 768px`, dense data tables (`properties`, `leads`) automatically transform into vertically stacked **Data Cards** with direct action buttons (`Edit`, `Delete`, `Change Status`).

---

## 4. Mobile Ergonomics & Form Rules

1. **iOS 16px Rule:** All form inputs, selects, and textareas must be `font-size: 16px` (`text-base` in Tailwind) to prevent iOS Safari from automatically zooming into the page.
2. **44 × 44px Touch Targets:** Every button, filter tag, and modal close icon meets or exceeds 44px hit bounds.
3. **Safe Area Insets:** Handles iPhone home indicator and notch spacing via `env(safe-area-inset-bottom)`.
4. **Zero Overflow:** `overflow-x: clip` applied to `html` and `body`; `min-w-0` and `break-words` on all dynamic headings.
