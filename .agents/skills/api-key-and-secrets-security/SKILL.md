---
name: api-key-and-secrets-security
description: Comprehensive security standards to prevent API key leaks, client-side bundle exposure in Vite/React, unauthorized quota drainage, and database hijacking. Covers public vs secret keys, Firebase security rules hardening, App Check, backend proxy routes, and build-output secret scanning.
version: 1.0.0
---

# API Key & Secrets Security Guard — Property Gateway Engineering Standards

## Mission

Prevent credential leaks, billing drainage, and data breaches. Never ship private secrets to the browser. Vite replaces any `VITE_` environment variable into plaintext strings during build time, exposing them to anyone opening browser DevTools (`F12`) or running automated scrapers.

This skill establishes strict boundaries between **Public Identifiers** and **Private Secrets**, enforces backend serverless proxy patterns, and guarantees that client credentials cannot be abused.

---

## 1. The Core Trap: How Vite Environment Variables Work

In Vite (`vite build`):
* Any variable prefixed with `VITE_` (e.g., `VITE_FIREBASE_API_KEY`, `VITE_SENDGRID_KEY`) is **statically replaced** directly into the generated JavaScript bundles (`dist/assets/index-*.js`).
* Storing a private secret in `.env` and referencing `import.meta.env.VITE_MY_SECRET` does **NOT** keep it private—it literally prints the key into client-side JS downloaded by every visitor and web scraper.

```
[ .env file ]                                  [ Vite Build Output ]
VITE_API_KEY = "xyz123"   ──(vite build)──>   dist/assets/index.js: "...key='xyz123'..."
                                              Accessible to ANYONE via F12 -> Sources!
```

---

## 2. Public Identifiers vs. Private Secrets (The Critical Distinction)

### A. What Can Be in the Frontend (`VITE_` Allowed with Protections)
* **Firebase Client Config:** `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
* *Crucial Rule:* Firebase Web API keys are **public project identifiers**, NOT server secrets. They are designed to live in client apps.
* *The Defense Requirement:* Because the Firebase config is public, your data is protected **ONLY by Firestore & Storage Security Rules and Firebase App Check**, NEVER by key secrecy.

### B. What Must NEVER Be in the Frontend (Strictly Forbidden in `VITE_` or Client Code)
* ❌ Firebase Admin Service Account Private Keys (`private_key`, `client_email`)
* ❌ Email Delivery Keys (SendGrid, Resend, Nodemailer SMTP passwords)
* ❌ SMS Gateway Keys (Twilio, Fast2SMS, MSG91)
* ❌ Payment Gateway Secret Keys (Razorpay Secret, Stripe Secret `sk_live_*`)
* ❌ Database Connection Strings (Postgres, MongoDB connection URIs)
* ❌ AI API Keys (OpenAI `sk-*`, Anthropic, Gemini API keys)

---

## 3. The Backend Proxy Pattern (Serverless API Routes on Vercel)

Any action requiring a private secret (such as sending an email alert to the GM when a new property inquiry is submitted, or sending an SMS confirmation) must be routed through a backend endpoint (`/api/*`), never directly from React.

```
[ User Browser ]
       │
       ▼ (Submits inquiry form)
[ POST /api/lead-notify ] ──(Rate Limit & Validation)
       │
       ▼ (Uses Private process.env.RESEND_API_KEY server-side)
[ Email/SMS Provider ] ──> GM Notification Delivered
```

### Implementation Pattern (Vercel Serverless Function `/api/lead-notify.js`):
```javascript
// api/lead-notify.js (Node.js Serverless Function on Vercel)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Validate payload and length to prevent payload stuffing
  const { name, phone, propertyTitle, honeypot } = req.body;
  if (honeypot) {
    return res.status(400).json({ error: 'Spam detected' });
  }

  if (!name || !phone || phone.length < 10) {
    return res.status(422).json({ error: 'Invalid contact details' });
  }

  // 2. Access private key exclusively via process.env (Server-side ONLY)
  const PRIVATE_EMAIL_API_KEY = process.env.RESEND_API_KEY; // Never exposed to client

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRIVATE_EMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@propertygateway.in',
        to: 'propertygatewy@gmail.com',
        subject: `New Inquiry for ${propertyTitle}`,
        text: `Lead Name: ${name}\nPhone: ${phone}\nProperty: ${propertyTitle}`,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to notify GM:', error);
    return res.status(500).json({ error: 'Notification service unavailable' });
  }
}
```

---

## 4. Firebase Database & Storage Defense Rules

Because Firebase client keys are public in the browser bundle, the database and storage bucket must be locked down with zero trust:

### A. Firestore Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Properties: Public can read active listings, ONLY authenticated Admin can write
    match /properties/{propertyId} {
      allow read: if resource.data.isActive == true;
      allow write: if request.auth != null;
    }
    
    // Inquiries: Anyone can submit a lead (with strict field validation),
    // but ONLY authenticated Admin can read, list, update, or delete them.
    match /inquiries/{inquiryId} {
      allow create: if request.resource.data.name is string 
                    && request.resource.data.name.size() > 0
                    && request.resource.data.phone is string
                    && request.resource.data.phone.size() >= 10
                    && request.resource.data.phone.size() <= 15
                    && request.resource.data.propertyTitle is string;
      allow read, update, delete: if request.auth != null;
    }
    
    // Default Deny Everything Else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### B. Firebase Cloud Storage Rules (`storage.rules`)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Property images: Public can view, ONLY Admin can upload/delete
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 2 * 1024 * 1024 // 2MB hard limit
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 5. Google Cloud Console Quota & Domain Restrictions

1. **HTTP Referrer Restriction (Google Cloud Console):**
   * Go to Google Cloud Console ➡️ APIs & Services ➡️ Credentials.
   * Edit your Firebase Web API Key.
   * Under **Application restrictions**, select **Websites** and restrict authorized referrers to:
     * `https://propertygateway.in/*`
     * `https://*.propertygateway.in/*`
     * `https://*.vercel.app/*`
     * `http://localhost:3000/*` (during development only)
   * *Outcome:* Even if an attacker copies your client key, their requests from other domains will be rejected by Google's API gateway!
2. **Firebase App Check:**
   * Enable reCAPTCHA Enterprise / Cloudflare Turnstile with Firebase App Check to attest that requests originate from your genuine, untampered website rather than automated cURL scripts.

---

## 6. Pre-Commit & Pre-Build Secret Audit Scanner

To verify that no private keys were accidentally bundled into the client build:

```json
// package.json script
"scripts": {
  "audit:secrets": "node scripts/audit-bundle-secrets.js"
}
```

### Scanner Logic (`scripts/audit-bundle-secrets.js`):
Checks the generated `dist/` directory for signature secret patterns before deployment:
* `sk_live_`, `sk_test_`, `ghp_`, `AKIA[0-9A-Z]{16}`
* `BEGIN PRIVATE KEY`
* `resend_` or third-party secret tokens
* Throws an immediate build error and halts deployment if any pattern is detected.

---

## 7. Security Checklist for Development & Handover

- [ ] `.env` and `.env.local` are explicitly added to `.gitignore`.
- [ ] `.env.example` contains only empty string placeholders (`VITE_FIREBASE_API_KEY=""`).
- [ ] No `sk_`, private key, or password strings are stored in any frontend source file.
- [ ] All email notifications, SMS alerts, and admin operations pass through serverless `/api/*` routes.
- [ ] Firestore and Storage rules are deployed and tested (zero open `allow read, write: if true;`).
- [ ] Google Cloud API Key referrer restrictions are enabled for production domains.
