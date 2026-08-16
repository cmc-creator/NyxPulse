import { promises as fs } from "node:fs";
import path from "node:path";
import { getAdminDb } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import type { SkillSignoff } from "@/lib/skills/sheets";

function filePath() {
  if (process.env.SKILL_SIGNOFFS_STORAGE_PATH) {
    return process.env.SKILL_SIGNOFFS_STORAGE_PATH;
  }
  return path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "skill-signoffs.json");
}

async function readFileStore(): Promise<SkillSignoff[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as SkillSignoff[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(records: SkillSignoff[]) {
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(records, null, 2), "utf8");
}

async function signoffRef(id: string) {
  return (await getAdminDb()).collection("skillSignoffs").doc(id);
}

export async function saveSkillSignoff(signoff: SkillSignoff): Promise<SkillSignoff> {
  if (isFirebaseAdminConfigured()) {
    await (await signoffRef(signoff.id)).set(signoff);
    await (await getAdminDb())
      .collection("learners")
      .doc(signoff.learnerUserId)
      .collection("skillSignoffs")
      .doc(signoff.id)
      .set(signoff);
    return signoff;
  }
  const all = await readFileStore();
  all.unshift(signoff);
  await writeFileStore(all);
  return signoff;
}

export async function listSkillSignoffsForLearner(userId: string): Promise<SkillSignoff[]> {
  if (isFirebaseAdminConfigured()) {
    const snap = await (await getAdminDb())
      .collection("learners")
      .doc(userId)
      .collection("skillSignoffs")
      .limit(100)
      .get();
    return snap.docs
      .map((doc) => doc.data() as SkillSignoff)
      .sort((a, b) => b.signedAt.localeCompare(a.signedAt));
  }
  const all = await readFileStore();
  return all
    .filter((s) => s.learnerUserId === userId)
    .sort((a, b) => b.signedAt.localeCompare(a.signedAt));
}

export async function listRecentSkillSignoffs(limit = 40): Promise<SkillSignoff[]> {
  if (isFirebaseAdminConfigured()) {
    const snap = await (await getAdminDb()).collection("skillSignoffs").limit(limit).get();
    return snap.docs
      .map((doc) => doc.data() as SkillSignoff)
      .sort((a, b) => b.signedAt.localeCompare(a.signedAt));
  }
  const all = await readFileStore();
  return all.sort((a, b) => b.signedAt.localeCompare(a.signedAt)).slice(0, limit);
}
