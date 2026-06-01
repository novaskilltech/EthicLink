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
const auth = admin.auth();

const targetEmail = "salah.lamkhannet@gmail.com";

async function run() {
  let uid = null;
  
  try {
    console.log(`Searching for user with email ${targetEmail} in Firebase Auth...`);
    const userRecord = await auth.getUserByEmail(targetEmail);
    uid = userRecord.uid;
    console.log(`Found user in Firebase Auth. UID: ${uid}`);
  } catch (error) {
    console.log(`User not found in Firebase Auth by email: ${error.message}`);
  }

  // Fallback: update the active profile RfVxIpv6EHPJPqw6uEqKiwn4r4u2 just in case
  const activeUid = "RfVxIpv6EHPJPqw6uEqKiwn4r4u2";
  const uidsToUpgrade = new Set();
  if (uid) uidsToUpgrade.add(uid);
  uidsToUpgrade.add(activeUid);

  for (const currentUid of uidsToUpgrade) {
    console.log(`Upgrading profile document for UID: ${currentUid}...`);
    const docRef = db.collection("profiles").doc(currentUid);
    const doc = await docRef.get();
    
    if (doc.exists) {
      await docRef.set({
        plan: "PRO"
      }, { merge: true });
      console.log(`Successfully upgraded profile document ${currentUid} to PRO.`);
    } else {
      // Create if it doesn't exist
      await docRef.set({
        uid: currentUid,
        plan: "PRO",
        displayName: "Creator",
        slug: "creator_" + currentUid.substring(0, 5)
      });
      console.log(`Created new profile document ${currentUid} with PRO plan.`);
    }
  }
}

run().catch(console.error);
