/**
 * SAFE CLOUD IMAGE SYNC PIPELINE
 * - Zero code changes to website or admin.
 * - Creates an automatic backup of all existing Firestore property image URLs.
 * - Streams realistic Chennai architectural images to Cloudinary Free Tier.
 * - Enforces dynamic WebP optimization (/f_auto,q_auto/).
 * - Updates Cloud Firestore properties in real time.
 */

const fs = require('fs');
const path = require('path');

// Dynamically load firebase from admin node_modules
const { initializeApp } = require('../admin/node_modules/firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('../admin/node_modules/firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDNd9GAxPVXQ8-X72-NOIzsM-1lplkhV0M',
  authDomain: 'propertygatewaypro-8bc3f.firebaseapp.com',
  projectId: 'propertygatewaypro-8bc3f',
  storageBucket: 'propertygatewaypro-8bc3f.firebasestorage.app',
  messagingSenderId: '876064038126',
  appId: '1:876064038126:web:d46ba7b55ba98c61e867ff'
};

const CLOUD_NAME = 'py5x0ppi';
const UPLOAD_PRESET = 'property_gateway';
const LOCAL_IMG_DIR = 'C:/Users/dhine/Downloads/property_gateway_images';

// Property ID to local file mappings
const PROPERTY_IMAGE_MAPPINGS = {
  'brigade-altius': [
    'brigade_altius_exterior.jpg',
    'brigade_altius_interior.jpg'
  ],
  'brigade-nebula-wtc': [
    'brigade_nebula_wtc_exterior.jpg',
    'brigade_nebula_wtc_interior.jpg'
  ],
  'sobha-meritta': [
    'sobha_meritta_exterior.jpg',
    'sobha_meritta_interior.jpg'
  ],
  'tvs-avalon': [
    'tvs_avalon_exterior.jpg',
    'tvs_avalon_interior.jpg'
  ],
  'tvs-emerald-lake-shore': [
    'tvs_emerald_lake_shore_exterior.jpg',
    'tvs_emerald_lake_shore_lifestyle.jpg'
  ],
  'tvs-emerald-luxor': [
    'tvs_emerald_luxor_exterior.jpg'
  ],
  'urbanrise-revolution-one': [
    'urbanrise_revolution_one_exterior.jpg',
    'urbanrise_revolution_one_interior.jpg'
  ]
};

async function uploadFileToCloudinary(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[WARN] File not found: ${filePath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  const dataUri = `data:${mimeType};base64,${base64Data}`;

  const formData = new FormData();
  formData.append('file', dataUri);
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudinary upload failed for ${path.basename(filePath)}: ${errText}`);
  }

  const result = await response.json();
  let secureUrl = result.secure_url;
  // Automatically inject edge WebP compression
  if (secureUrl.includes('/image/upload/')) {
    secureUrl = secureUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
  }
  return secureUrl;
}

async function run() {
  console.log('🚀 Starting Safe Cloud Image Sync Pipeline...');
  console.log(`📡 Cloudinary Target: ${CLOUD_NAME} [preset: ${UPLOAD_PRESET}]`);
  console.log(`📁 Source Folder: ${LOCAL_IMG_DIR}\n`);

  // 1. Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 2. Fetch current Firestore properties & create backup
  console.log('📦 Step 1: Backing up current Firestore properties...');
  const snap = await getDocs(collection(db, 'properties'));
  const backup = {};
  snap.docs.forEach(docSnap => {
    const data = docSnap.data();
    backup[docSnap.id] = {
      title: data.title,
      slug: data.slug,
      images: data.images || []
    };
  });

  const backupPath = path.join(__dirname, 'backup_property_images.json');
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log(`✅ Backup saved to ${backupPath} (${Object.keys(backup).length} properties backed up)\n`);

  // 3. Process mappings and upload to Cloudinary
  console.log('☁️ Step 2: Uploading realistic images to Cloudinary & updating Firestore...');

  let updatedCount = 0;

  for (const [propId, fileNames] of Object.entries(PROPERTY_IMAGE_MAPPINGS)) {
    const currentProp = backup[propId];
    if (!currentProp) {
      console.warn(`[SKIP] Property "${propId}" not found in Firestore.`);
      continue;
    }

    console.log(`\n🏢 Processing "${currentProp.title}" (${propId}):`);
    const newCloudUrls = [];

    for (const fileName of fileNames) {
      const fullPath = path.join(LOCAL_IMG_DIR, fileName);
      try {
        process.stdout.write(`   ⬆️ Uploading ${fileName}... `);
        const cloudUrl = await uploadFileToCloudinary(fullPath);
        if (cloudUrl) {
          console.log(`OK!`);
          console.log(`      CDN URL: ${cloudUrl}`);
          newCloudUrls.push(cloudUrl);
        }
      } catch (uploadErr) {
        console.error(`FAILED: ${uploadErr.message}`);
      }
    }

    if (newCloudUrls.length > 0) {
      // If we only have 1 image (e.g. exterior), preserve existing secondary images or append
      const existingExtra = (currentProp.images || []).slice(newCloudUrls.length);
      const finalImages = [...newCloudUrls, ...existingExtra];

      console.log(`   💾 Writing to Firestore document: properties/${propId}...`);
      await updateDoc(doc(db, 'properties', propId), {
        images: finalImages,
        updatedAt: new Date().toISOString()
      });
      console.log(`   ✨ Updated "${currentProp.title}" with ${newCloudUrls.length} realistic Cloudinary WebP images!`);
      updatedCount++;
    }
  }

  console.log(`\n========================================================`);
  console.log(`🎉 Pipeline Complete!`);
  console.log(`✅ Updated ${updatedCount} properties in Cloud Firestore.`);
  console.log(`🌐 Live website is now displaying the realistic Cloudinary WebP photos!`);
  console.log(`========================================================\n`);

  process.exit(0);
}

run().catch(err => {
  console.error('❌ Pipeline encountered error:', err);
  process.exit(1);
});
