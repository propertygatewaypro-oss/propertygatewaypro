/**
 * Apply Cloudinary URLs to Cloud Firestore with Admin Authentication
 * Contains full mappings for all 20 properties in the catalog!
 *
 * Usage:
 *   node scripts/apply_cloud_images_with_login.cjs <adminEmail> <adminPassword>
 * or:
 *   $env:ADMIN_EMAIL="..."; $env:ADMIN_PASSWORD="..."; node scripts/apply_cloud_images_with_login.cjs
 */

const fs = require('fs');
const path = require('path');

const { initializeApp } = require('../admin/node_modules/firebase/app');
const { getFirestore, doc, updateDoc } = require('../admin/node_modules/firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('../admin/node_modules/firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyDNd9GAxPVXQ8-X72-NOIzsM-1lplkhV0M',
  authDomain: 'propertygatewaypro-8bc3f.firebaseapp.com',
  projectId: 'propertygatewaypro-8bc3f',
  storageBucket: 'propertygatewaypro-8bc3f.firebasestorage.app',
  messagingSenderId: '876064038126',
  appId: '1:876064038126:web:d46ba7b55ba98c61e867ff'
};

// Full 20-property Cloudinary WebP mappings
const PROPERTY_UPDATES = {
  "brigade-altius": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539607/qefyc3ay9vnnsqwqppbs.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539620/xpv2r8v0kt01hrsft3q2.jpg"
  ],
  "brigade-nebula-wtc": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539628/ftttapphkrm9n9vzituh.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539635/lpkuzlbnl9oodge2q68k.jpg"
  ],
  "sobha-meritta": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539642/wmzhx7ixtft2tykvkveu.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539657/vs3xebafnpw3du1mnige.jpg"
  ],
  "tvs-avalon": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539667/pafmbndzv5lv70jlbl4d.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539674/y4lk6djsxi5cgnzwzo9o.jpg"
  ],
  "tvs-emerald-lake-shore": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539680/jtieaab9betj7xqhabtc.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539688/ejfd4wsj8s0tbvr3wl3k.jpg"
  ],
  "tvs-emerald-luxor": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539694/ktzfmhqquipnhlwvzvk6.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538882/uznaobvmkclulsxyct0v.jpg"
  ],
  "urbanrise-revolution-one": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539701/tvjk3rfhlwrwtequnbrc.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794539708/qwib2w1go4aebfqjkkbf.jpg"
  ],
  "tvs-emerald-aaranya": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538883/b4uzjfwizteni8q0izuo.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538884/s0ifhbml3rjszsnjvzf9.jpg"
  ],
  "tvs-emerald-atrium": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538885/ytfwclbx5forbbzlm8uk.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538886/vprydzp55t5e35qc97c9.jpg"
  ],
  "tvs-emerald-elements": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538887/ymhpghay6lplwpowawqq.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538889/oujt6hn5ihljuxost9bg.jpg"
  ],
  "tvs-emerald-peninsula": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538890/wal9up2qmib9eyqjcqo8.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538892/b4slzqfcdmm2qxibopuh.jpg"
  ],
  "tvs-emerald-udyana": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538894/xpttbn9bbg27dwcfdfry.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538896/g17lbm05mjluqmckcwwc.jpg"
  ],
  "brigade-residences-wtc": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538896/xtrn7zmkkbu13lz7byh9.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538897/uxa39fuwrrvovskrbkvh.jpg"
  ],
  "prestige-pallavaram-gardens": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538898/remucxsobqnk7nemhrnr.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538899/z0g9u9qji5rwhwfizg7j.jpg"
  ],
  "sobha-conserve": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538899/ca3y4gzqaaewfr8jenzk.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538900/yqcipmnr1cre1tloqz0f.jpg"
  ],
  "urbanrise-city-of-joy": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538902/rkzrqopnhqpzrxd5sde9.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538903/qlk3hrqdidmwklzpd289.jpg"
  ],
  "urbanrise-springtide": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538904/cr8abcdrqbbvuwb7cmsp.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538905/nud8g8tfhuazqricsjtx.jpg"
  ],
  "urbanrise-the-lakes-edge": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538906/mmc4bisoirdrl7poqjep.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538907/lct8vzxq6onigqydcijk.jpg"
  ],
  "urbanrise-the-world-of-joy": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538909/tbpwhi1kxxyglfvniyhv.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538911/j24lhatypomm5joxiwky.jpg"
  ],
  "urbanrise-whispers-of-sky": [
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538912/mnp88qwrrz2hmdvzdz3a.jpg",
    "https://res.cloudinary.com/py5x0ppi/image/upload/f_auto,q_auto/v1794538913/v6qtgchpybkwtfnicbbo.jpg"
  ]
};

async function main() {
  const email = process.argv[2] || process.env.ADMIN_EMAIL;
  const password = process.argv[3] || process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('❌ Missing credentials.');
    console.log('\nUsage:');
    console.log('  node scripts/apply_cloud_images_with_login.cjs <adminEmail> <adminPassword>');
    console.log('or:');
    console.log('  $env:ADMIN_EMAIL="admin@propertygateway.in"; $env:ADMIN_PASSWORD="yourPassword"; node scripts/apply_cloud_images_with_login.cjs\n');
    process.exit(1);
  }

  console.log(`🔐 Signing in as admin: ${email}...`);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    console.log('✅ Admin authenticated successfully!');
  } catch (authErr) {
    console.error('❌ Firebase Admin login failed:', authErr.message);
    process.exit(1);
  }

  console.log('\n📦 Applying realistic Cloudinary WebP images to all 20 Firestore properties...');
  let count = 0;

  for (const [propId, newImages] of Object.entries(PROPERTY_UPDATES)) {
    if (!newImages.length) continue;
    try {
      console.log(`🏢 Updating "${propId}" with ${newImages.length} images...`);
      await updateDoc(doc(db, 'properties', propId), {
        images: newImages,
        updatedAt: new Date().toISOString()
      });
      console.log(`   ✨ Saved to Firestore properties/${propId}!`);
      count++;
    } catch (err) {
      console.error(`   ❌ Failed to update ${propId}:`, err.message);
    }
  }

  console.log(`\n🎉 Successfully updated ${count} of 20 properties in Cloud Firestore!`);
  console.log('🌐 The website is now serving realistic Chennai Cloudinary WebP images in real time.');
  process.exit(0);
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
