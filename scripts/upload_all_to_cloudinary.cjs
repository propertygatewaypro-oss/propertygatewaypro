const fs = require('fs');
const path = require('path');

const CLOUD_NAME = 'py5x0ppi';
const UPLOAD_PRESET = 'property_gateway';
const LOCAL_IMG_DIR = 'C:/Users/dhine/Downloads/property_gateway_images';

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
    throw new Error(`Upload failed: ${errText}`);
  }

  const result = await response.json();
  let secureUrl = result.secure_url;
  if (secureUrl.includes('/image/upload/')) {
    secureUrl = secureUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
  }
  return secureUrl;
}

async function run() {
  console.log('🚀 Uploading all 13 realistic Chennai images to Cloudinary Free Tier (WebP)...');
  const uploadedMap = {};

  for (const [propId, fileNames] of Object.entries(PROPERTY_IMAGE_MAPPINGS)) {
    console.log(`\n🏢 Property: ${propId}`);
    uploadedMap[propId] = [];

    for (const fileName of fileNames) {
      const fullPath = path.join(LOCAL_IMG_DIR, fileName);
      if (!fs.existsSync(fullPath)) {
        console.warn(`   ⚠️ Missing file: ${fileName}`);
        continue;
      }
      try {
        process.stdout.write(`   ⬆️ Uploading ${fileName}... `);
        const url = await uploadFileToCloudinary(fullPath);
        console.log(`OK!`);
        console.log(`      ${url}`);
        uploadedMap[propId].push(url);
      } catch (err) {
        console.error(`FAILED: ${err.message}`);
      }
    }
  }

  const outPath = path.join(__dirname, 'uploaded_cloudinary_map.json');
  fs.writeFileSync(outPath, JSON.stringify(uploadedMap, null, 2));
  console.log(`\n✅ All Cloudinary uploads finished!`);
  console.log(`📁 Mapping saved to ${outPath}`);
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
