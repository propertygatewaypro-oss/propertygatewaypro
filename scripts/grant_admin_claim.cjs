const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const uid = process.argv[2];
const projectId = process.argv[3];
if (!uid || !projectId) {
  console.error('Usage: npm run grant-admin -- <Firebase Auth UID> <Firebase project ID>');
  process.exit(1);
}

initializeApp({ credential: applicationDefault(), projectId });

async function main() {
  const user = await getAuth().getUser(uid);
  await getAuth().setCustomUserClaims(uid, { ...user.customClaims, admin: true });
  console.log(`Admin claim granted to UID ${uid}. Sign out and sign in again to refresh the token.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
