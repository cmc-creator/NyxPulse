import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { parseFirebaseServiceAccount } from "@/lib/firebase/admin-env";

/**
 * Loaded only via dynamic import from admin.ts so routes that merely check
 * env config do not pull firebase-admin into their serverless bundle.
 */
export function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const serviceAccount = parseFirebaseServiceAccount();
  if (!serviceAccount) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY."
    );
  }

  return initializeApp({
    credential: cert(serviceAccount),
    // Explicit projectId so verifyIdToken checks the same project as the web client.
    projectId: serviceAccount.projectId,
  });
}

let firestoreConfigured = false;

export function getAdminDb(): Firestore {
  const db = getFirestore(getAdminApp());
  if (!firestoreConfigured) {
    try {
      db.settings({ ignoreUndefinedProperties: true });
    } catch {
      // Already configured on this app instance
    }
    firestoreConfigured = true;
  }
  return db;
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
