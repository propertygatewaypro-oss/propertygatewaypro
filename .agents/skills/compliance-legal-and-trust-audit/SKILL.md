---
name: compliance-legal-and-trust-audit
description: Production audit and construction skill enforcing legal policies (Privacy, Terms, Cookies, Refund), user data collection disclosures, form consent, third-party embed privacy, WCAG AA accessibility (alt text, contrast, keyboard forms), anti-fabrication truth in advertising, copyright, and Indian/Tamil Nadu RERA local laws.
version: 1.0.0
---

# Legal Compliance, Trust & Accessibility Audit Guard

## Mission

Guarantee that **Property Gateway** operates with ironclad legal compliance, data transparency, ethical trust, and universal accessibility. In high-value real estate, trust is the primary currency. Failing local regulatory laws (TNRERA, DPDP Act 2023), fabricating metrics, or publishing inaccessible forms creates severe legal liability and destroys customer conversion.

This skill governs 6 essential compliance pillars to be verified continuously during construction and pre-launch.

---

## 1. Mandatory Legal Policies Suite

The application must include 4 dedicated, clearly linked legal policy pages in the footer:

| Document | Route | Required Content & Disclosures |
| :--- | :--- | :--- |
| **Privacy Policy** | `/privacy-policy` | Compliant with the **Digital Personal Data Protection (DPDP) Act 2023** (India). Discloses exact data collected (Name, Phone, Email, Property Interests), purpose (connecting with developers & arranging site visits), data retention period, and user rights to request data deletion via `propertygatewy@gmail.com`. |
| **Terms & Conditions** | `/terms-and-conditions` | Defines Property Gateway's role as a real estate marketing & advisory facilitator. States that property specifications, pricing, and availability are provided by builders and subject to change. Disclaims liability for developer delays or discrepancies. |
| **Cookie Policy** | `/cookie-policy` | Explains usage of essential cookies (session state, filter preferences, admin authentication) vs optional analytics cookies. Clear instructions on how visitors can manage or disable cookies. |
| **Refund & Cancellation Policy** | `/refund-policy` | Explicitly states Property Gateway's policy regarding brokerage, token payments, and advisory fees. For advisory services, clarifies whether consultation deposits are refundable or non-refundable upon site visit scheduling. |

---

## 2. Consent & User Data Collection Transparency

### A. Form Consent Disclosure (DPDP Act Mandate)
Every inquiry, contact, and visit-booking form must include an explicit consent notice before submission:
```jsx
{/* Accessible, compliant form consent checkbox & notice */}
<div className="flex items-start gap-2.5 text-xs text-slate-600 mt-3">
  <input
    id="form-consent"
    type="checkbox"
    required
    className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
  />
  <label htmlFor="form-consent" className="cursor-pointer leading-relaxed">
    I authorize Property Gateway to contact me via Call, SMS, or WhatsApp regarding this property and related real estate opportunities in Chennai. View our{' '}
    <Link to="/privacy-policy" className="text-emerald-700 underline hover:text-emerald-800">
      Privacy Policy
    </Link>.
  </label>
</div>
```

### B. Lightweight Cookie Banner
* Pinned non-intrusive bottom banner on first visit.
* Provides **"Accept All"** and **"Essential Only"** options.
* Storing choice in `localStorage` (`cookie_consent_status`) so it does not re-appear on every page change.

### C. Data Minimization Principle
Collect only what is strictly necessary to arrange property visits:
* Allowed fields: `Full Name`, `Phone Number` (required for WhatsApp/Call), `Email` (optional for brochures), `Preferred Location`, and `Budget Range`.
* Strictly forbidden: Collecting unnecessary personal data (Aadhaar, PAN, banking credentials) on public marketing forms.

---

## 3. Third-Party Embeds & Privacy Sandboxing

### A. Google Maps Embeds
* Must include `loading="lazy"` to prevent slowing down initial page render.
* Must include `referrerPolicy="no-referrer-when-downgrade"` and `title="Property Location on Google Maps"`.
* Provide an interactive external link fallback (*"Open in Google Maps"*).

### B. Direct WhatsApp Links & External Outbound
* All `target="_blank"` links to WhatsApp (`wa.me`) or developer brochures must strictly include:
  ```html
  rel="noopener noreferrer"
  ```
  *(Prevents reverse tab-nabbing and keeps the user's browser session secure).*

### C. Video & Virtual Tours
* If embedding YouTube property walkthroughs, use YouTube's privacy-enhanced domain:
  ```html
  <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" loading="lazy" ... />
  ```

---

## 4. Accessibility (A11y) Invariants (WCAG 2.2 AA)

1. **Meaningful Image Alt Text:**
   * Every property photograph must describe the architectural reality:
     * ✅ `alt="East-facing master bedroom with French windows and hardwood flooring"`
     * ❌ `alt="image"`, `alt="img1"`, `alt="property"`
   * Decorative background textures must use `alt=""` and `aria-hidden="true"`.
2. **Color Contrast Ratios:**
   * Body text (`#0F172A`) on white (`#FFFFFF`) = **16.1:1** (Exceeds AAA).
   * Muted text (`#475569`) on white (`#FFFFFF`) = **7.2:1** (Exceeds AAA).
   * Primary button text (`#FFFFFF`) on Emerald (`#059669`) = **4.7:1** (Passes AA).
   * Never place low-contrast light grey text on white cards.
3. **Keyboard-Friendly Forms:**
   * All `<input>` fields must have explicit `<label htmlFor="id">` elements.
   * Visible, high-contrast `:focus-visible` rings:
     ```css
     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
     ```
   * Modals must trap focus, advance with `Tab` / `Shift+Tab`, and close immediately upon pressing `Escape`.

---

## 5. Truth in Advertising & Anti-Fabrication (Hallmark & RERA Law)

1. **Strict Ban on Fake Testimonials & Fabricated Metrics:**
   * ❌ Never generate fictitious quotes ("John D. - Best agency ever!").
   * ❌ Never invent fake statistics ("Over 15,000 properties sold", "99.9% customer happiness").
   * ✅ Use authentic client reviews or replace the testimonial section with **"Why Choose Us" factual service pillars** (CRISIL rating, RERA licensed advisory, zero-brokerage on new launches, verified titles).
2. **Real Estate Pricing Disclaimers:**
   * All property listing prices must carry the standard statutory note:
     > *"Base price displayed. Govt taxes, registration charges, and stamp duty extra as applicable."*

---

## 6. Copyright & Local Real Estate Laws (Tamil Nadu RERA Compliance)

1. **TNRERA Compliance & Disclaimers:**
   * The platform must prominently display the agent's RERA Registration in the footer and property detail pages:
     > **TNRERA Agent Registration No: TN/Agent/020/2019** (or Property Gateway's specific registration number).
   * Every individual project listing must display its project RERA number (e.g., `TN/01/Layout/1234/2026`).
2. **Brokerage & Agency Disclaimer (Footer):**
   * > *"Disclaimer: Property Gateway is a registered real estate consulting firm. All project details, floor plans, and amenities shown are sourced from developers and intended solely for informational purposes. This website does not constitute an offer of sale."*
3. **Intellectual Property Notice:**
   * `© 2026 Property Gateway. All rights reserved. Developed by Strategy 360.`
   * Builder logos (TVS Emerald, Shriram, Purva, Casagrand) may only be used with appropriate partner attribution or channel partner authorization.

---

## 7. Pre-Launch Compliance Checklist

- [ ] Privacy Policy, Terms, Cookie Policy, and Refund Policy are live and accessible in the footer.
- [ ] Lead capture forms include DPDP Act consent notice and checkbox before submission.
- [ ] Cookie banner is active and stores user choice in `localStorage`.
- [ ] All property images have descriptive architectural `alt` text.
- [ ] All inputs have visible `:focus-visible` rings and explicit labels.
- [ ] Zero fake testimonials, fake ratings, or unverified claims.
- [ ] RERA registration number and statutory disclaimers are visible on every page.
- [ ] Outbound links (WhatsApp, builders) use `rel="noopener noreferrer"`.
