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

console.log("PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

const db = admin.firestore();

async function run() {
  console.log("--- PROFILES ---");
  const profilesSnapshot = await db.collection("profiles").get();
  profilesSnapshot.forEach(doc => {
    console.log("Profile Doc ID:", doc.id);
    console.log("Data:", JSON.stringify(doc.data(), null, 2));
  });

  console.log("--- LINKS ---");
  const linksSnapshot = await db.collection("links").get();
  linksSnapshot.forEach(doc => {
    console.log("Link Doc ID:", doc.id);
    console.log("Data:", JSON.stringify(doc.data(), null, 2));
  });
}

run().catch(console.error);
