import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseClientApp } from "@/lib/firebase/client";
import { isFirebaseClientConfigured } from "@/lib/firebase/client-config";

export { isFirebaseClientConfigured };

export function getClientAuth(): Auth | null {
  const app = getFirebaseClientApp();
  if (!app) return null;
  return getAuth(app);
}
