import { getAdminAuth } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";

export type AuthCustomClaims = {
  admin?: boolean;
  instructor?: boolean;
};

export function readCustomClaims(
  source: { admin?: unknown; instructor?: unknown } | null | undefined
): AuthCustomClaims {
  return {
    admin: source?.admin === true,
    instructor: source?.instructor === true,
  };
}

/**
 * Grant platform admin via Firebase Auth custom claims.
 * Run only from a trusted server context (bootstrap route / ops script).
 *
 * Note: existing sessions keep old claims until the user refreshes their
 * ID token / re-signs in (we mint a new session cookie after grant).
 */
export async function setUserAdminClaim(uid: string): Promise<void> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is not configured");
  }
  if (!uid.trim()) {
    throw new Error("uid is required");
  }

  const auth = await getAdminAuth();
  const user = await auth.getUser(uid);
  const existing = (user.customClaims ?? {}) as AuthCustomClaims;
  await auth.setCustomUserClaims(uid, {
    ...existing,
    admin: true,
    instructor: true,
  });
}

export async function clearUserAdminClaim(uid: string): Promise<void> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is not configured");
  }
  const auth = await getAdminAuth();
  const user = await auth.getUser(uid);
  const existing = { ...(user.customClaims ?? {}) } as Record<string, unknown>;
  delete existing.admin;
  delete existing.instructor;
  await auth.setCustomUserClaims(uid, existing);
}
