/**
 * Server-only Firebase Admin entrypoint.
 *
 * Use this from API routes, server components, and server actions — never from
 * client components (it uses the service-account credentials).
 *
 * @example
 * import { db } from "@/lib/firebaseAdmin";
 * await db.collection("users").doc("123").set({ name: "Alex" });
 */
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import {
  getAdminAuth,
  getAdminDb,
  isFirebaseAdminConfigured,
} from "@/lib/firebase/admin";

export { getAdminAuth, getAdminDb, isFirebaseAdminConfigured };

function createLazyProxy<T extends object>(resolve: () => T): T {
  return new Proxy({} as T, {
    get(_target, prop, receiver) {
      const instance = resolve();
      const value = Reflect.get(instance as object, prop, receiver);
      return typeof value === "function" ? value.bind(instance) : value;
    },
  });
}

/** Lazy Firestore handle — initializes Admin only when first used. */
export const db: Firestore = createLazyProxy(getAdminDb);

/** Lazy Auth handle — initializes Admin only when first used. */
export const auth: Auth = createLazyProxy(getAdminAuth);
