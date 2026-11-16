# Firebase rollout

The local rules use a Firebase Auth custom claim named `admin`. Before deploying
the rules, grant the claim to each authorized admin account. This requires
Google Application Default Credentials with permission to manage Firebase Auth:

```powershell
npm run grant-admin -- <firebase-auth-uid> <project-id>
```

The account must sign out and sign in again to refresh its ID token. Confirm
that the admin portal works with that account before deploying the new rules.

Deploy the new composite index before the website query changes. Wait until the
index is ready, then deploy the Firestore and Storage rules and both apps:

```powershell
npx firebase-tools deploy --only firestore:indexes --project <project-id>
npx firebase-tools deploy --only firestore:rules,storage --project <project-id>
```

The rules are local prototypes until reviewed and deployed. Verify public active
property and testimonial reads, public lead creation, denied anonymous lead
reads, denied non-admin writes, and authorized admin CRUD after deployment.
Existing properties and testimonials must have `active: true` to remain public.
