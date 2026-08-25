import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import { getFirebaseClientApp } from "@/lib/firebase/client";
import { isFirebaseClientConfigured } from "@/lib/firebase/client-config";

export { isFirebaseClientConfigured };

let emulatorConnected = false;

export function getClientAuth(): Auth | null {
  const app = getFirebaseClientApp();
  if (!app) return null;
  const auth = getAuth(app);

  // Local development against the Firebase Auth emulator. No-op in
  // production where NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST is unset.
  const emulatorHost = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
  if (emulatorHost && !emulatorConnected) {
    connectAuthEmulator(auth, `http://${emulatorHost}`, { disableWarnings: true });
    emulatorConnected = true;
  }
  return auth;
}
