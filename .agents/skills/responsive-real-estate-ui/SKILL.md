---
name: responsive-real-estate-ui
description: Comprehensive standards and implementation patterns for building high-converting, mobile-first responsive real estate interfaces. Covers mobile bottom action bars, touch-friendly filter drawers, touch-swipe image galleries, sticky viewports, and zero-overflow invariants across mobile, tablet, and desktop.
version: 1.0.0
---

# Responsive Real Estate UI — Engineering & Design Standards

## Mission

In Indian real estate, **over 75% of homebuyers and property seekers browse on mobile devices** through WhatsApp shares, social ads, and mobile search. 

This skill ensures that **Property Gateway** delivers an uncompromising mobile-first experience. Responsive design is not merely resizing columns—it means adapting the information architecture, conversion funnels, touch ergonomics, and layout behavior to the device in hand.

---

## 1. Key Device Breakpoints & Verification Targets

| Breakpoint | Width | Core Form Factor | Layout Behavior & Hierarchy |
| :--- | :--- | :--- | :--- |
| **`xs` / Mobile** | **375px – 430px** | iPhone & Android phones | Single column, sticky bottom CTA bar, bottom-sheet filters, touch-swipe image galleries, minimum 44px tap targets. |
| **`sm` / Large Mobile** | **640px** | Landscape phones / small phablets | Adjusted padding, 2-column spec badges. |
| **`md` / Tablet** | **768px – 834px** | iPad, Android tablets | 2-column property card grid, collapsible filter bar, dual action buttons. |
| **`lg` / Laptop** | **1024px** | MacBook Air, standard laptops | 3-column property grid, persistent sticky filter sidebar or horizontal bar. |
| **`xl` / Desktop** | **1280px – 1440px** | Large monitors | Max-width container (`max-w-7xl mx-auto px-6`), side gutters expand, content measure remains capped. |

---

## 2. Core Mobile-First Real Estate Patterns

### A. Pinned Mobile Bottom Action Bar (Highest Conversion Impact)
On mobile devices (`< 768px`), visitors should never have to hunt for contact details after scrolling through photos and descriptions.
* **Implementation:** A fixed, high-elevation bottom bar (`z-50`) containing:
  1. **Direct Call Button:** `tel:+917598954635` with phone icon.
  2. **Direct WhatsApp Button:** Direct link with pre-filled message (*"Hi Property Gateway, I am interested in [Property Title]"*).
* **Code Pattern:**
  ```jsx
  {/* Pinned Mobile Conversion Bar - Hidden on Tablet/Desktop */}
  <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 z-50 md:hidden flex items-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
    <a
      href="tel:+917598954635"
      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-900 text-white font-medium text-sm transition-transform active:scale-95"
    >
      <Phone className="w-4 h-4 text-emerald-400" />
      <span>Call Now</span>
    </a>
    <a
      href="https://wa.me/917598954635?text=Hi%20Property%20Gateway,%20I%20am%20interested%20in%20this%20property"
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366] text-white font-semibold text-sm transition-transform active:scale-95 shadow-sm"
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span>WhatsApp</span>
    </a>
  </div>
  ```

---

### B. Adaptive Search & Filter (Horizontal on Desktop ➡️ Drawer on Mobile)
* **Desktop (`≥ 1024px`):** Horizontal multi-selector bar pinned below the hero banner (Location dropdown, Type dropdown, Budget range slider, "Search" button).
* **Mobile (`< 1024px`):** 
  * Compact single-line trigger bar showing active filter pills and a "Filters" button with active badge count.
  * Clicking "Filters" opens a smooth slide-up **Bottom Sheet / Drawer** with large, finger-friendly checkboxes, radio pills, and an instant "Apply Filters" button.

---

### C. Touch-Native Property Image Carousel (Zero Jank)
* Never rely on small click arrows on mobile.
* Use native CSS scroll-snap with hardware acceleration:
  ```css
  .property-gallery-snap {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Hide scrollbar for clean appearance */
  }
  .property-gallery-snap::-webkit-scrollbar {
    display: none;
  }
  .property-slide-item {
    scroll-snap-align: center;
    flex-shrink: 0;
    width: 88%; /* Shows peek of next photo to afford swiping */
  }
  ```

---

### D. Responsive Admin Tables (Card Transformation on Mobile)
Admin data tables (`properties`, `leads`) inevitably break and produce horizontal scrollbars on mobile screens.
* **Defensive Pattern:** 
  * On desktop (`≥ 768px`): Display classic structured `<table>` with headers.
  * On mobile (`< 768px`): Transform rows into individual stacked **Data Cards**:
  ```jsx
  {/* Desktop Table View */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full text-left text-sm">...</table>
  </div>

  {/* Mobile Card Stack */}
  <div className="md:hidden space-y-3">
    {properties.map(item => (
      <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-slate-900">{item.title}</h4>
          <span className="badge">{item.status}</span>
        </div>
        <p className="text-emerald-700 font-bold">{item.priceDisplay}</p>
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button onClick={() => onEdit(item)} className="btn-sm">Edit</button>
          <button onClick={() => onDelete(item.id)} className="btn-sm-danger">Delete</button>
        </div>
      </div>
    ))}
  </div>
  ```

---

## 3. Strict Mobile Usability Invariants

1. **The 16px iOS Form Input Rule:**
   * Every text input, select, and textarea must have a minimum `font-size: 16px` (`text-base` in Tailwind). 
   * *Why:* Anything below 16px triggers iOS Safari to automatically zoom the entire viewport, distorting the user's view and breaking layout ergonomics.
2. **Minimum 44 × 44px Touch Targets:**
   * All navigation icons, pagination numbers, filter chips, and modal close buttons must have a hit target of at least 44px, either through padding or a transparent hit boundary (`p-3`, `min-h-[44px]`).
3. **Safe Area Inset Respect:**
   * Pinned elements (mobile header and bottom action bar) must accommodate iPhone home indicators and notches:
     ```css
     padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
     padding-top: max(0.75rem, env(safe-area-inset-top));
     ```
4. **Zero Horizontal Layout Blowouts:**
   * Never use `width: 100vw` (which includes the scrollbar width and causes horizontal scroll on Windows).
   * Apply `overflow-x: clip` on `html` and `body` rather than `overflow-x: hidden`.
   * Headings must include `break-words` and `min-w-0` inside flex and grid containers.

---

## 4. Verification & Testing Checklist

Before marking any screen complete, test the following:
- [ ] Rendered at **375px width** (iPhone SE / standard Android) with zero horizontal overflow.
- [ ] Mobile bottom action bar displays cleanly and does not obscure the footer or bottom content (sufficient `pb-20` on `<main>`).
- [ ] Form inputs do not cause iOS auto-zoom (`text-base` / `16px`).
- [ ] Tapping WhatsApp or Call initiates the proper intent directly on mobile devices.
- [ ] Admin panel is 100% usable on mobile phones through stacked card transformations.
