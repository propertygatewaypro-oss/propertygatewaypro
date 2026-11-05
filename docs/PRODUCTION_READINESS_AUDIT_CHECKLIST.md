# Production Readiness, Security & Compliance Checklist — Property Gateway
## Master Enterprise Audit Matrix

---

## 1. Application Security Checklist

| Category | Requirement | Implementation in Property Gateway |
| :--- | :--- | :--- |
| **Secrets & Keys** | Hide API keys & purge Git secrets | `.env` locked in `.gitignore`. Real secrets (`RESEND_API_KEY`) stay server-side on Vercel. Only public Firebase identifiers (`VITE_FIREBASE_*`) are on the frontend. |
| **Database & Access Control** | Row-Level Security (RLS) & Query Parameterization | Firestore Security Rules (`firestore.rules`) enforce Zero-Trust: public read for active properties, admin-only write. Queries are auto-parameterized via Firebase SDK. |
| **Authentication & Traffic** | Secure cookies, password hashing & rate limiting | Firebase Auth handles cryptographic hashing (scrypt/bcrypt), JWT token rotation, and brute-force throttling. Bot honeypot and App Check block spam. |
| **Input & Output Handling** | Input validation, XSS prevention & file upload limits | Inputs sanitized; zero `dangerouslySetInnerHTML`. Storage restricted to images only, < 2MB limit, compressed to WebP (< 250KB). |
| **Infrastructure & Network** | Force HTTPS & HTTP security headers | Vercel enforces HTTPS, HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`. Regular `npm audit` scans. |

---

## 2. Legal, Privacy & Compliance Checklist

| Category | Requirement | Implementation in Property Gateway |
| :--- | :--- | :--- |
| **Core Legal Policies** | Privacy, Terms, Cookie & Refund Policies | 4 dedicated routes: `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, and `/refund-policy` linked in footer. |
| **DPDP Act Compliance** | User consent & minimal data collection | Mandatory consent checkbox on lead capture forms. Operational data collection only (`Name`, `Phone`, `Email`, `Budget`). |
| **Data Rights & Deletion** | Right to erasure & age consent | Documented process in Privacy Policy: users email `propertygatewy@gmail.com` to purge records. Services restricted to adults (18+). |
| **Consumer Protection** | Transparent pricing & legitimate identity | Clear Chennai address (Adambakkam), official phone & email. Statutory disclaimer: *"Base price shown. Govt taxes & stamp duty extra"*. |
| **Anti-Fabrication** | Eliminate fake reviews & claims | Hallmark & RERA standard: zero fake testimonials or stock buyer headshots. Real RERA registration number displayed (`TN/Agent/020/2019`). |

---

## 3. Accessibility (a11y) & UX Checklist

| Category | Requirement | Implementation in Property Gateway |
| :--- | :--- | :--- |
| **Visual Accessibility** | Alt text & compliant contrast | Architectural description on every property image (`alt="East-facing 3 BHK living room with sea view"`). Text contrast exceeds WCAG AAA (16.1:1). |
| **Keyboard Navigation** | Full keyboard focus & logical tab order | Prominent emerald `:focus-visible` ring on every button, link, and input. Modals trap focus and close on `Escape`. |
| **Mobile Ergonomics** | Touch targets & iOS form zoom prevention | Minimum 44 × 44px tap targets. Form inputs use minimum 16px font to prevent iOS Safari auto-zooming. Pinned mobile conversion bar. |
