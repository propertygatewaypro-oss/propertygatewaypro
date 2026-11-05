# API Key & Secrets Security Guide — Property Gateway
## Safeguarding Credentials, Preventing Leaks & Locking Down Firebase

---

## 1. The Core Threat: How Vite Exposes Variables
When using Vite (`npm run build`), every environment variable prefixed with `VITE_` is statically injected into the generated JavaScript bundle (`dist/assets/*.js`). Anyone who opens Chrome/Edge DevTools (`F12`), goes to **Sources** or **Network**, or runs an automated key-harvesting bot can extract these keys in seconds.

---

## 2. Public Project Identifiers vs. Private Secrets

| Credential Type | Where It Belongs | Prefix | Risk Level & Mitigation |
| :--- | :--- | :--- | :--- |
| **Firebase Client Config** (`apiKey`, `projectId`, `storageBucket`) | **Frontend (Vite)** | `VITE_FIREBASE_*` | **Public Identifier.** Safe on client **ONLY** if locked with strict Firestore & Storage security rules and HTTP Referrer domain restrictions. |
| **Firebase Admin Service Account** (`private_key`, `client_email`) | **Backend / Vercel Serverless ONLY** | `process.env.*` (NO `VITE_`) | **Extreme Danger.** If leaked, grants complete administrative bypass to read, overwrite, and delete all Firestore collections and storage. |
| **Email/SMS Provider Keys** (Resend, SendGrid, Twilio, Fast2SMS) | **Backend / Vercel Serverless ONLY** | `process.env.*` (NO `VITE_`) | **High Danger.** If leaked, bots will hijack your account to send spam, draining your paid billing balance. |
| **Database Passwords / Auth Secrets** | **Backend / Vercel Serverless ONLY** | `process.env.*` (NO `VITE_`) | **Critical.** Database tampering and unauthorized data exfiltration. |

---

## 3. The Backend Proxy Pattern (Serverless Function)
Whenever a private action must occur (such as notifying the GM at `propertygatewy@gmail.com` when a new lead is submitted), the React frontend **never calls the email/SMS service directly**. Instead, it calls our own Vercel serverless API route (`POST /api/lead-notify`), which holds the private key securely on the server.

```
Client Browser (Vite React)
        │
        ▼ (Submits Lead Form via HTTPS)
Vercel Serverless API Route (/api/lead-notify)
        │ (Reads private process.env.RESEND_API_KEY)
        ▼
External Email / SMS Gateway
```

---

## 4. Firebase Firestore & Storage Rules Invariants

Because the Firebase client API key is visible in browser network calls, database access must follow **Zero Trust**:

1. **`properties` Collection:**
   * Public can only read properties where `isActive == true`.
   * Only authenticated Admin (`request.auth != null`) can create, update, or delete properties.
2. **`inquiries` Collection:**
   * Public can only `create` (submit a lead) with strict field length validation (phone 10–15 chars, message ≤ 1000 chars).
   * Public can **NEVER** `read`, `list`, `update`, or `delete` inquiries. Only authenticated Admin can view leads.
3. **Firebase Storage (`properties/` bucket):**
   * Public can read images.
   * Only authenticated Admin can upload or delete photos, with a strict 2MB file size cap.

---

## 5. Domain & Referrer Restrictions (Google Cloud Console)
In the Google Cloud Console for the Firebase project, the Web API Key must be restricted under **Application Restrictions ➡️ Websites (HTTP Referrers)** to:
* `https://propertygateway.in/*`
* `https://*.propertygateway.in/*`
* `https://*.vercel.app/*`
* `http://localhost:3000/*` (Dev only)

This ensures that even if an attacker copies your public key, requests from unauthorized websites or foreign domains will be rejected by Google's API gateway.
