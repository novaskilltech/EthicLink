const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (match) {
    let value = match[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    process.env[match[1]] = value.replace(/\\n/g, '\n');
  }
});

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

const db = admin.firestore();

async function run() {
  console.log("Updating links in Firestore with generated thumbnails...");
  
  await db.collection("links").doc("FSCOSzq7fg6mcM8wazEl").update({
    thumbnailUrl: "/images/waqf_thumbnail.png"
  });
  console.log("Updated Waqf El Maati link.");

  await db.collection("links").doc("FeNV0TeN10d3KTqhIB72").update({
    thumbnailUrl: "/images/vibecoder_thumbnail.png"
  });
  console.log("Updated Vibecoder link.");

  await db.collection("links").doc("yHu1JS3sw8i8hLztmA3m").update({
    thumbnailUrl: "/images/novasquad_thumbnail.png"
  });
  console.log("Updated Novasquad link.");

  console.log("All link thumbnails updated successfully!");
}

run().catch(console.error);
