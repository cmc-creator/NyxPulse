import {
  isFirebaseAdminConfigured,
  parseFirebaseServiceAccount,
} from "@/lib/firebase/admin-env";

export { isFirebaseAdminConfigured, parseFirebaseServiceAccount };

type AdminSdk = typeof import("@/lib/firebase/admin-sdk");

let sdkPromise: Promise<AdminSdk> | null = null;

function loadSdk(): Promise<AdminSdk> {
  if (!sdkPromise) {
    sdkPromise = import("@/lib/firebase/admin-sdk");
  }
  return sdkPromise;
}

export async function getAdminApp() {
  const sdk = await loadSdk();
  return sdk.getAdminApp();
}

export async function getAdminDb() {
  const sdk = await loadSdk();
  return sdk.getAdminDb();
}

export async function getAdminAuth() {
  const sdk = await loadSdk();
  return sdk.getAdminAuth();
}
