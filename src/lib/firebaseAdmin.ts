/**
 * Server-only Firebase Admin entrypoint.
 *
 * Use this from API routes, server components, and server actions — never from
 * client components (it uses the service-account credentials).
 *
 * @example
 * import { getAdminDb } from "@/lib/firebaseAdmin";
 * await (await getAdminDb()).collection("users").doc("123").set({ name: "Alex" });
 */
import {
  getAdminAuth,
  getAdminDb,
  isFirebaseAdminConfigured,
} from "@/lib/firebase/admin";

export { getAdminAuth, getAdminDb, isFirebaseAdminConfigured };
