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
const uid = "RfVxIpv6EHPJPqw6uEqKiwn4r4u2";

async function run() {
  console.log("Updating layoutPreset to BENTO_GRID directly...");
  await db.collection("profiles").doc(uid).update({
    layoutPreset: "BENTO_GRID"
  });
  
  const doc = await db.collection("profiles").doc(uid).get();
  console.log("Current layoutPreset in DB:", doc.data().layoutPreset);
}

run().catch(console.error);
