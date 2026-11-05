# Property Gateway — Architecture, Specifications & Guidelines

Welcome to the project documentation for **Property Gateway**, developed by Strategy 360 Digital Marketing Agency.

### Documentation Index

| Document | Purpose |
| :--- | :--- |
| 🚀 **[BUILDING_BLUEPRINT.md](../BUILDING_BLUEPRINT.md)** *(Root & Docs)* | **Live Execution & Quick-Reference Guide:** Page-by-page wireframe layout, component breakdown, dynamic WhatsApp formulas, psychological triggers, and the 10 non-negotiable engineering rules while building. |
| 🛡️ **[PRODUCTION_READINESS_AUDIT_CHECKLIST.md](./PRODUCTION_READINESS_AUDIT_CHECKLIST.md)** | **Master Enterprise Audit Matrix:** Complete checklist for Application Security (secrets, RLS, bot protection, security headers), Legal & DPDP Compliance (policies, consent, deletion rights, transparent pricing), and Universal Accessibility (WCAG 2.2 AA). |
| 📐 **[DESIGN.md](../DESIGN.md)** *(Root & Docs)* | **Official VoltAgent-style Design Specification:** Machine-readable design tokens, color palette, typography scale, 8pt spatial grid, card anatomy, and micro-interaction physics. |
| ✨ **[DESIGN_TASTE_STANDARDS.md](./DESIGN_TASTE_STANDARDS.md)** | **TasteSkill 2.5 Anti-Slop System:** figma.com/x.ai visual bar, 8pt spatial grid math, 2px card lifts, 1.02x photo zooms, and one-section-per-screen viewport rules. |
| ⚖️ **[COMPLIANCE_LEGAL_AND_TRUST_STANDARDS.md](./COMPLIANCE_LEGAL_AND_TRUST_STANDARDS.md)** | **Legal, Consent & Trust Invariants:** DPDP Act 2023, Privacy, Terms, Cookie & Refund policies, form consent, third-party embed sandboxing, WCAG AA contrast & alt text, and TNRERA compliance. |
| 🔐 **[SECRETS_AND_API_SECURITY_GUIDE.md](./SECRETS_AND_API_SECURITY_GUIDE.md)** | **API Key & Secrets Leak Prevention:** Vite client bundle exposure safeguards, public vs secret keys, backend serverless proxy patterns, and zero-trust Firestore rules. |
| 📱 **[RESPONSIVE_DESIGN_STANDARDS.md](./RESPONSIVE_DESIGN_STANDARDS.md)** | **Mobile-First Responsive Standards:** Mobile bottom action bar (Call + WhatsApp), bottom-sheet filter drawers, touch-swipe gallery, iOS 16px auto-zoom prevention, and 44px touch targets. |
| 🎨 **[COLOR_THEME_SPECIFICATION.md](./COLOR_THEME_SPECIFICATION.md)** | **The Sovereign Architectural Palette:** Deep Midnight Navy, Heritage Emerald, Champagne Gold, and Soft Alabaster. Includes Tailwind tokens and WCAG AAA contrast audits. |
| 📄 **[PROJECT_SPECIFICATION.md](./PROJECT_SPECIFICATION.md)** | Client profile, quotation terms, 8 core deliverables, Chennai market research, monorepo structure, and Firebase schemas. |
| 🛡️ **[PRODUCTION_SCALE_HARDENING.md](./PRODUCTION_SCALE_HARDENING.md)** | 10,000+ concurrent user resilience guide: Firestore indexing, bot protection, stateless auth, client-side WebP image compression, and billing caps. |
| 💎 **[HALLMARK_ANTI_AI_STANDARDS.md](./HALLMARK_ANTI_AI_STANDARDS.md)** | Hallmark (nutlope) anti-AI design system: 16 hard rules against generic AI templates, avoiding clichés, and enforcing bespoke UI craft. |

---

### Key Technical Specs

* **Stack:** React.js (JavaScript, strictly No TypeScript), Tailwind CSS, Firebase (Auth + Firestore + Storage), Node.js, Vite.
* **Monorepo Layout:**
  * `website/` ➡️ Public real estate portal (`localhost:3000` / `propertygateway.in`)
  * `admin/` ➡️ Management portal (`localhost:3001` / `admin.propertygateway.in`)
* **Deployment:** Vercel (dual project root directory configuration).
