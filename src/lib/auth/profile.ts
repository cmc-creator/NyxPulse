import type { CourseProgressMap } from "@/lib/course-progress";
import type { IssuedCertificate } from "@/lib/certificates";
import type { CourseChallengeResults } from "@/lib/challenges/types";
import { getAdminDb } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";

export type OrgMember = {
  email: string;
  name: string;
  courses: string[];
  completedCourses: string[];
  workforceRoleId?: string;
  invitedAt?: string;
  status?: "invited" | "active";
};

/** Learner profile previously stored in Clerk public/private metadata. */
export type UserProfile = {
  userId: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  courses: string[];
  completedCourses: string[];
  plan: string;
  orgName?: string;
  orgRole?: "admin" | "member";
  orgMembers?: OrgMember[];
  workforceRoleId?: string;
  instructor?: boolean;
  stripeCustomerId?: string;
  courseProgress?: CourseProgressMap;
  certificates?: Record<string, IssuedCertificate>;
  challengeResults?: Record<string, CourseChallengeResults>;
  createdAt: string;
  updatedAt: string;
};

async function profileRef(userId: string) {
  return (await getAdminDb()).collection("learners").doc(userId);
}

/** Firestore rejects `undefined` field values — strip them before writes. */
function stripUndefined<T extends Record<string, unknown>>(value: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry !== undefined) out[key] = entry;
  }
  return out as T;
}

export function emptyProfile(userId: string, email = "", displayName = "NyxPulse Learner"): UserProfile {
  const now = new Date().toISOString();
  return {
    userId,
    email,
    displayName,
    courses: [],
    completedCourses: [],
    plan: "individual",
    createdAt: now,
    updatedAt: now,
  };
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isFirebaseAdminConfigured()) return null;
  const snap = await (await profileRef(userId)).get();
  if (!snap.exists) return null;
  const data = snap.data() as Partial<UserProfile>;
  return {
    ...emptyProfile(userId),
    ...data,
    userId,
    courses: Array.isArray(data.courses) ? data.courses.filter((x): x is string => typeof x === "string") : [],
    completedCourses: Array.isArray(data.completedCourses)
      ? data.completedCourses.filter((x): x is string => typeof x === "string")
      : [],
  };
}

export async function ensureUserProfile(input: {
  userId: string;
  email?: string | null;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<UserProfile> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is required for user profiles");
  }

  const existing = await getUserProfile(input.userId);
  const now = new Date().toISOString();
  const firstName =
    (typeof input.firstName === "string" && input.firstName.trim()) ||
    undefined;
  const lastName =
    (typeof input.lastName === "string" && input.lastName.trim()) || undefined;

  if (existing) {
    const next: UserProfile = {
      ...existing,
      email: input.email || existing.email,
      displayName: input.displayName || existing.displayName,
      updatedAt: now,
    };
    if (firstName) next.firstName = firstName;
    else if (existing.firstName) next.firstName = existing.firstName;
    else delete next.firstName;

    if (lastName) next.lastName = lastName;
    else if (existing.lastName) next.lastName = existing.lastName;
    else delete next.lastName;

    await (await profileRef(input.userId)).set(stripUndefined({ ...next }), { merge: true });
    return next;
  }

  const created = emptyProfile(
    input.userId,
    input.email ?? "",
    input.displayName || firstName || "NyxPulse Learner"
  );
  if (firstName) created.firstName = firstName;
  if (lastName) created.lastName = lastName;
  await (await profileRef(input.userId)).set(stripUndefined({ ...created }), { merge: true });
  return created;
}

export async function updateUserProfile(
  userId: string,
  patch: Partial<UserProfile>
): Promise<UserProfile> {
  const current = (await getUserProfile(userId)) ?? emptyProfile(userId);
  const next: UserProfile = {
    ...current,
    ...patch,
    userId,
    updatedAt: new Date().toISOString(),
  };
  await (await profileRef(userId)).set(stripUndefined({ ...next }), { merge: true });
  return next;
}

export async function findUserIdByEmail(email: string): Promise<string | null> {
  if (!isFirebaseAdminConfigured()) return null;
  const normalized = email.trim().toLowerCase();
  const snap = await (await getAdminDb())
    .collection("learners")
    .where("email", "==", normalized)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].id;
}

export async function listLearnerProfiles(limit = 40): Promise<UserProfile[]> {
  if (!isFirebaseAdminConfigured()) return [];
  const snap = await (await getAdminDb()).collection("learners").limit(limit).get();
  return snap.docs.map((doc) => {
    const data = doc.data() as Partial<UserProfile>;
    return {
      ...emptyProfile(doc.id),
      ...data,
      userId: doc.id,
      courses: Array.isArray(data.courses) ? data.courses : [],
      completedCourses: Array.isArray(data.completedCourses) ? data.completedCourses : [],
    };
  });
}
