# Firebase rollout

## Current production state (2026-11-16)

- Firebase project: `propertygatewaypro-8bc3f`.
- The authorized admin account has the Firebase Auth `admin: true` custom claim.
- `firestore.rules` is deployed. The `properties` slug/active composite index is READY.
- The website and admin app are deployed to `www.propertygatewaypro.com` and `admin.propertygatewaypro.com`.
- Public Firestore queries for active properties, property details, and testimonials succeeded. Anonymous unfiltered property reads and lead reads returned 403. A public test lead was created successfully and immediately deleted.
- Firebase Storage has no default bucket in this project. New property photos and testimonial avatars uploaded through the admin app go to Cloudinary; Firestore stores their URLs and the related records. Existing media also includes Unsplash URLs.

The admin account must sign out and sign in again to refresh its ID token before using the updated admin app. Authenticated admin CRUD still requires an interactive smoke test.

## Future deployments

Grant a new authorized admin account the claim before enabling admin-only rules:

```powershell
npm run grant-admin -- <firebase-auth-uid> propertygatewaypro-8bc3f
```

Deploy the index first and wait for it to become READY. Deploy the website before restricting public reads to `active: true`, then deploy Firestore rules and the admin app. Use the repository root for Vercel CLI deployments because each Vercel project sets its own root directory (`website` or `admin`).

```powershell
npx firebase-tools deploy --only firestore:indexes --project propertygatewaypro-8bc3f
npx firebase-tools deploy --only firestore:rules --project propertygatewaypro-8bc3f
```

Existing properties and testimonials need `active: true` to remain public.
