import * as admin from "firebase-admin";

const hasAdminConfig =
  Boolean(process.env.FIREBASE_PROJECT_ID) &&
  Boolean(process.env.FIREBASE_CLIENT_EMAIL) &&
  Boolean(process.env.FIREBASE_PRIVATE_KEY);

const createMockFirestore = () => {
  const query = {
    where: (..._args: unknown[]) => query,
    orderBy: (..._args: unknown[]) => query,
    limit: (..._args: unknown[]) => query,
    count: () => ({ get: async () => ({ data: () => ({ count: 0 }) }) }),
    get: async () => ({ empty: true, docs: [] }),
    add: async (..._args: unknown[]) => ({ id: "mock-doc" }),
    doc: (..._args: unknown[]) => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async (..._args: unknown[]) => undefined,
      update: async (..._args: unknown[]) => undefined,
      delete: async () => undefined,
    }),
  };

  return {
    collection: (..._args: unknown[]) => query,
    batch: () => ({
      update: (..._args: unknown[]) => undefined,
      commit: async () => undefined,
    }),
  };
};

if (hasAdminConfig && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db: any = hasAdminConfig ? admin.firestore() : createMockFirestore();
const auth = hasAdminConfig ? admin.auth() : null;

export { db, auth };
