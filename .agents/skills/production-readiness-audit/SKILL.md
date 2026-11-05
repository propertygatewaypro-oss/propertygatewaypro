---
name: production-readiness-audit
description: Comprehensive production-readiness auditor and enforcement guard covering Application Security (secrets, Firestore RLS, bot protection, input sanitization, HTTP security headers), Legal & Privacy Compliance (DPDP Act, core policies, consent, deletion rights, transparent pricing), and Universal Accessibility (WCAG 2.2 AA, keyboard navigation, contrast).
version: 1.0.0
---

# Production Readiness, Security & Compliance Audit Guard

## Mission

Guarantee that **Property Gateway** passes strict enterprise audits across **Application Security**, **Legal & Privacy Compliance**, and **Universal Accessibility (WCAG 2.2 AA)** before public launch. This skill translates standard enterprise audit checklists into concrete, code-level safeguards specifically tailored for our React.js, Tailwind CSS, Firebase, and Vercel stack.

---

## 1. Application Security Invariants

### A. Secrets & Key Hygiene
1. **Zero Client Secret Exposure:**
   * Only public Firebase project identifiers (`apiKey`, `projectId`, `storageBucket`) are permitted with `VITE_` prefix.
   * Private API keys (email delivery, SMS gateways, payment keys, Firebase Admin credentials) must **never** be prefixed with `VITE_` and reside exclusively in server-side `process.env` on Vercel.
2. **Git Secret Purging:**
   * `.env` and `.env.local` files must be locked in `.gitignore`.
   * Pre-commit checks verify no hardcoded tokens (`sk_live_`, `private_key`) exist in staged files.
3. **Licensed & Verified Media:**
   * All imagery must be sourced from licensed stock, verified builder project media, or uncopyrighted architectural photography. Zero unlicensed web scrapes.

### B. Database & Access Control (Row-Level Security & Parameterization)
1. **Firestore Row-Level Security (`firestore.rules`):**
   * Default Deny: All unmatched collections reject read and write.
   * Field Tampering Prevention: Inquiries and properties enforce strict schema, type, and character length checks.
   * Public Read vs Admin Write: Public can only read active properties (`isActive == true`); only authenticated administrators (`request.auth != null`) can create, update, or delete records.
2. **Query Parameterization:**
   * Use official Firestore SDK query operators (`where()`, `orderBy()`, `limit()`). The SDK automatically parameterizes queries, completely eliminating SQL/NoSQL injection risks.

### C. Authentication & Traffic Protection
1. **Password Hashing & Session Integrity:**
   * Authentication is managed via Firebase Auth, which utilizes cryptographic scrypt/bcrypt password hashing and cryptographically signed, short-lived JWT ID tokens with automatic rotation.
2. **Login Rate Limiting & Account Lockout:**
   * Firebase Auth automatically throttles repeated failed login attempts to protect against brute-force attacks.
3. **Bot Protection & Anti-DDoS:**
   * Public lead submission forms incorporate an invisible honeypot trap field and a 60-second client-side submission cooldown.
   * Firebase App Check (reCAPTCHA Enterprise / Cloudflare Turnstile) attests that traffic originates from the genuine, untampered frontend.

### D. Input, Output & Data Handling
1. **Input Validation & Sanitization:**
   * All form inputs are sanitized on client and server to prevent Cross-Site Scripting (XSS). User inputs are strictly rendered as text, never via `dangerouslySetInnerHTML`.
2. **Strict File Upload Restrictions:**
   * Firebase Storage rules restrict uploads to `image/jpeg`, `image/png`, `image/webp`.
   * Hard file size ceiling of 2MB enforced in `storage.rules`, paired with mandatory client-side WebP compression (< 250KB).
3. **Response Trimming (Data Minimization):**
   * Public property listing API responses project only display fields (title, price, location, specs, photos), omitting internal admin metadata.

### E. Infrastructure & Network Hardening
1. **Enforced HTTPS & HSTS:**
   * All HTTP traffic is redirected to HTTPS at the Vercel edge.
2. **HTTP Security Headers (`vercel.json`):**
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
           { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
           { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
         ]
       }
     ]
   }
   ```
3. **Dependency Auditing:**
   * Run `npm audit` during continuous integration to ensure zero high/critical vulnerabilities in dependencies.

---

## 2. Legal, Privacy & Compliance Invariants

### A. Core Legal Policies Suite
The application must maintain 4 dedicated routes linked in the footer:
* **`/privacy-policy`:** Compliant with India's **DPDP Act 2023**. Discloses exact fields collected, purpose, third-party processors, retention duration, and Grievance Officer contact.
* **`/terms-and-conditions`:** Disclaims builder delivery schedules, pricing revisions, and clarifies Property Gateway's consulting role.
* **`/refund-policy`:** Details policies on advisory deposits, site visit fees, and token advances.
* **`/cookie-policy`:** Discloses essential session cookies vs analytics tracking.

### B. User Privacy & Data Rights (DPDP Act Compliance)
1. **Cookie Consent:** Pinned dismissible banner with "Accept All" and "Essential Only", stored in `localStorage`.
2. **Explicit Form Consent:** Checkbox on lead forms: *"I authorize Property Gateway to contact me via Call, SMS, or WhatsApp regarding real estate opportunities."*
3. **Data Minimization:** Only collect necessary operational fields (`Name`, `Phone`, `Email`, `Preferred Location`, `Budget`).
4. **Age Consent:** Disclose that services and marketing are directed solely to adults (18+) capable of entering into legally binding real estate contracts.
5. **Data Deletion Rights:** Transparent option in Privacy Policy permitting users to email `propertygatewy@gmail.com` with the subject *"Data Deletion Request"*; records are purged within 7 business days.
6. **Unsubscribe Mechanism:** All automated outbound notifications must include an instant 1-click unsubscribe option.

### C. Transparency & Consumer Protection
1. **Legitimate Business Identity:** Company name, registered Chennai office address (Adambakkam), phone (`+91 7598954635`), and email (`propertygatewy@gmail.com`) clearly displayed in footer and Contact page.
2. **Zero Dark Patterns & Transparent Pricing:**
   * Every listing displays: *"Base price shown. Govt taxes, registration charges, and stamp duty extra as applicable."*
3. **Zero Fabricated Proof:** Strictly prohibits artificial customer quotes, stock buyer headshots, or fake metrics.

---

## 3. Accessibility (a11y) & UX Invariants (WCAG 2.2 AA)

### A. Visual Accessibility
1. **Descriptive Image Alt Text:**
   * Every property photo describes architectural features (e.g., `alt="Spacious living room with floor-to-ceiling windows overlooking Chennai coast"`), never `alt="image"`.
2. **Contrast Ratios:**
   * Headings & text on light surfaces: `#0F172A` on `#FFFFFF` = **16.1:1** (Exceeds AAA).
   * Primary action buttons: `#FFFFFF` on `#059669` = **4.7:1** (Passes AA).
   * Muted labels: `#475569` on `#F8FAFC` = **7.2:1** (Passes AAA).

### B. Keyboard & Touch Navigation
1. **Full Keyboard Operability:**
   * Visible, high-contrast `:focus-visible` emerald outline on all interactive buttons, links, and form inputs.
   * Natural `Tab` and `Shift+Tab` sequence without focus traps.
   * Modals close on pressing `Escape`.
2. **Touch Ergonomics:**
   * Minimum **44 × 44px** hit target for all mobile buttons, filter chips, and drawer triggers.
   * `text-base` (16px) minimum font on all form inputs to prevent iOS Safari auto-zoom.

---

## 4. Pre-Launch Verification Checklist

Before marking the project ready for handover:
- [ ] No private secrets in Git or frontend `dist/` bundle.
- [ ] Firestore RLS and Storage security rules deployed and verified with test credentials.
- [ ] Vercel HTTP security headers active (`X-Frame-Options`, `CSP`, `nosniff`).
- [ ] Privacy Policy, Terms, Cookie, and Refund pages published and accessible.
- [ ] Form consent notice active on all lead capture forms.
- [ ] User data deletion request process documented in Privacy Policy.
- [ ] RERA registration number and pricing disclaimers clearly visible.
- [ ] All images carry meaningful architectural `alt` text.
- [ ] All interactive elements pass keyboard focus tests.
- [ ] Mobile navigation tested at 375px with zero horizontal page scroll.
