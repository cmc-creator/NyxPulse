import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import {
  ensureUserProfile,
  getUserProfile,
  type UserProfile,
} from "@/lib/auth/profile";

export type SessionUser = {
  userId: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  profile: UserProfile;
};

export async function getSessionUserId(): Promise<string | null> {
  // Always touch cookies() so Next marks the route dynamic even when Admin is unset at build time.
  const jar = await cookies();
  if (!isFirebaseAdminConfigured()) return null;
  const session = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return null;
  try {
    const auth = await getAdminAuth();
    const decoded = await auth.verifySessionCookie(session, true);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  if (!isFirebaseAdminConfigured()) return null;
  const session = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return null;

  try {
    const auth = await getAdminAuth();
    const decoded = await auth.verifySessionCookie(session, true);
    const authUser = await auth.getUser(decoded.uid);
    const email = authUser.email ?? "";
    const displayName =
      authUser.displayName ||
      email.split("@")[0] ||
      "NyxPulse Learner";
    const profile = await ensureUserProfile({
      userId: decoded.uid,
      email,
      displayName,
      firstName: displayName.split(" ")[0],
      lastName: displayName.split(" ").slice(1).join(" ") || undefined,
    });

    return {
      userId: decoded.uid,
      email: profile.email || email,
      displayName: profile.displayName || displayName,
      firstName: profile.firstName,
      lastName: profile.lastName,
      profile,
    };
  } catch {
    return null;
  }
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function getProfileOrNull(userId: string): Promise<UserProfile | null> {
  return getUserProfile(userId);
}
