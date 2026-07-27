import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseClientApp, isFirebaseClientConfigured } from "@/lib/firebase/client";

export { isFirebaseClientConfigured };

export function getClientAuth(): Auth | null {
  const app = getFirebaseClientApp();
  if (!app) return null;
  return getAuth(app);
}
