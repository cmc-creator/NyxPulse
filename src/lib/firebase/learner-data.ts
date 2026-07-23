import type { IssuedCertificate } from "@/lib/certificates";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export type LearnerProgressDoc = {
  courseSlug: string;
  completedTopics: string[];
  updatedAt: string;
};

function progressRef(userId: string, courseSlug: string) {
  return getAdminDb().collection("learners").doc(userId).collection("progress").doc(courseSlug);
}

function certificateRef(userId: string, courseSlug: string) {
  return getAdminDb()
    .collection("learners")
    .doc(userId)
    .collection("certificates")
    .doc(courseSlug);
}

function certificateIndexRef(certificateId: string) {
  return getAdminDb().collection("certificateIndex").doc(certificateId);
}

export async function getLearnerProgressTopics(
  userId: string,
  courseSlug: string
): Promise<string[] | null> {
  if (!isFirebaseAdminConfigured()) return null;
  const snap = await progressRef(userId, courseSlug).get();
  if (!snap.exists) return [];
  const data = snap.data() as Partial<LearnerProgressDoc>;
  return Array.isArray(data.completedTopics)
    ? data.completedTopics.filter((item): item is string => typeof item === "string")
    : [];
}

export async function listLearnerProgress(
  userId: string
): Promise<Record<string, string[]>> {
  if (!isFirebaseAdminConfigured()) return {};
  const snap = await getAdminDb()
    .collection("learners")
    .doc(userId)
    .collection("progress")
    .get();

  const progress: Record<string, string[]> = {};
  for (const doc of snap.docs) {
    const data = doc.data() as Partial<LearnerProgressDoc>;
    progress[doc.id] = Array.isArray(data.completedTopics)
      ? data.completedTopics.filter((item): item is string => typeof item === "string")
      : [];
  }
  return progress;
}

export async function saveLearnerProgressTopics(
  userId: string,
  courseSlug: string,
  completedTopics: string[]
): Promise<boolean> {
  if (!isFirebaseAdminConfigured()) return false;
  const updatedAt = new Date().toISOString();
  await progressRef(userId, courseSlug).set(
    {
      courseSlug,
      completedTopics,
      updatedAt,
    } satisfies LearnerProgressDoc,
    { merge: true }
  );
  return true;
}

export async function getLearnerCertificate(
  userId: string,
  courseSlug: string
): Promise<IssuedCertificate | null> {
  if (!isFirebaseAdminConfigured()) return null;
  const snap = await certificateRef(userId, courseSlug).get();
  if (!snap.exists) return null;
  return snap.data() as IssuedCertificate;
}

export async function listLearnerCertificates(
  userId: string
): Promise<Record<string, IssuedCertificate>> {
  if (!isFirebaseAdminConfigured()) return {};
  const snap = await getAdminDb()
    .collection("learners")
    .doc(userId)
    .collection("certificates")
    .get();

  const certificates: Record<string, IssuedCertificate> = {};
  for (const doc of snap.docs) {
    certificates[doc.id] = doc.data() as IssuedCertificate;
  }
  return certificates;
}

export async function saveLearnerCertificate(
  userId: string,
  certificate: IssuedCertificate
): Promise<boolean> {
  if (!isFirebaseAdminConfigured()) return false;

  const batch = getAdminDb().batch();
  batch.set(certificateRef(userId, certificate.courseSlug), certificate, { merge: true });
  batch.set(
    certificateIndexRef(certificate.id),
    {
      ...certificate,
      userId,
      indexedAt: new Date().toISOString(),
    },
    { merge: true }
  );
  await batch.commit();
  return true;
}

export async function getCertificateById(
  certificateId: string
): Promise<(IssuedCertificate & { userId?: string }) | null> {
  if (!isFirebaseAdminConfigured()) return null;
  const snap = await certificateIndexRef(certificateId).get();
  if (!snap.exists) return null;
  return snap.data() as IssuedCertificate & { userId?: string };
}
