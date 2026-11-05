# Legal Compliance, Trust & Accessibility Standards — Property Gateway
## DPDP Act, TNRERA, WCAG 2.2 AA & Advertising Ethics Guide

---

## 1. Required Legal Policies Suite
The website must provide 4 clearly articulated policy pages linked in the footer:
1. **Privacy Policy (`/privacy-policy`):** Compliant with India's **Digital Personal Data Protection (DPDP) Act 2023**. Details what data is collected (Name, Phone, Email, Location, Budget), purpose of site visits, data retention rules, and user deletion rights.
2. **Terms & Conditions (`/terms-and-conditions`):** Defines Property Gateway's role as an advisory facilitator and disclaims liability for builder schedule shifts or floorplan modifications.
3. **Cookie Policy (`/cookie-policy`):** Explains essential session cookies vs analytics tracking and how users can opt out.
4. **Refund Policy (`/refund-policy`):** Clarifies policies on brokerage consultations, site visit booking deposits, and token advances.

---

## 2. Consent & Data Collection Rules
* **Lead Form Consent:** Every contact and site visit form includes an explicit consent statement:
  > *"I authorize Property Gateway to contact me via Call, SMS, or WhatsApp regarding this property and related real estate opportunities in Chennai."*
* **Cookie Banner:** Non-intrusive bottom banner with "Accept All" and "Essential Only" options, remembered in `localStorage`.
* **Data Minimization:** Strictly collects only operational contact information (Name, Phone, Email, Budget). Never asks for sensitive personal data on marketing forms.

---

## 3. Third-Party Embeds & Privacy Sandboxing
* **Google Maps:** Uses `loading="lazy"` and `referrerPolicy="no-referrer-when-downgrade"`.
* **WhatsApp & External Links:** Every `target="_blank"` link strictly uses `rel="noopener noreferrer"` to prevent tab hijacking.
* **Video Walkthroughs:** YouTube embeds utilize the privacy-friendly domain `youtube-nocookie.com`.

---

## 4. Accessibility & Form Usability (WCAG 2.2 AA)
* **Descriptive Alt Text:** Property photos use architectural descriptions (e.g., `alt="East-facing master bedroom with French balcony and hardwood flooring"`), never dummy labels like `alt="image"`.
* **Contrast Ratios:** Primary body text (`#0F172A`) on white achieves **16.1:1** contrast; primary CTA buttons achieve **4.7:1** contrast (passing AA/AAA).
* **Keyboard-Friendly Forms:** Every input is bound to an explicit `<label>`, features an unmistakable `:focus-visible` emerald ring, and all modals close with the `Escape` key.

---

## 5. Truth in Advertising & TNRERA Compliance
* **Zero Fabrication (Hallmark Standard):** Strictly prohibits fake testimonials, invented star ratings, or unverified claims like "Chennai's #1 Agency". If testimonials are not yet gathered from real buyers, the site highlights factual trust pillars (RERA licensed, verified titles, zero brokerage on new launches).
* **Statutory Price Note:** *"Base price displayed. Govt taxes, registration charges, and stamp duty extra as applicable."*
* **TNRERA Registration & Disclaimer:** Prominently displays the agency RERA registration number and official regulatory disclaimer in the footer.
