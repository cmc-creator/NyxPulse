import { promises as fs } from "node:fs";
import path from "node:path";
import { getAdminDb } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import type { DrillRecord } from "@/lib/drills/types";

function filePath() {
  if (process.env.DRILLS_STORAGE_PATH) return process.env.DRILLS_STORAGE_PATH;
  return path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "drills.json");
}

async function readFileStore(): Promise<DrillRecord[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as DrillRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(records: DrillRecord[]) {
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(records, null, 2), "utf8");
}

async function drillRef(id: string) {
  return (await getAdminDb()).collection("drills").doc(id);
}

export async function createDrill(record: DrillRecord): Promise<DrillRecord> {
  if (isFirebaseAdminConfigured()) {
    await (await drillRef(record.id)).set(record);
    return record;
  }
  const all = await readFileStore();
  all.unshift(record);
  await writeFileStore(all);
  return record;
}

export async function getDrill(id: string): Promise<DrillRecord | null> {
  if (isFirebaseAdminConfigured()) {
    const snap = await (await drillRef(id)).get();
    if (!snap.exists) return null;
    return snap.data() as DrillRecord;
  }
  const all = await readFileStore();
  return all.find((d) => d.id === id) ?? null;
}

export async function listDrillsForUser(userId: string): Promise<DrillRecord[]> {
  if (isFirebaseAdminConfigured()) {
    const snap = await (await getAdminDb())
      .collection("drills")
      .where("organizerUserId", "==", userId)
      .limit(50)
      .get();
    return snap.docs
      .map((doc) => doc.data() as DrillRecord)
      .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  }
  const all = await readFileStore();
  return all
    .filter((d) => d.organizerUserId === userId)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export async function updateDrill(record: DrillRecord): Promise<DrillRecord> {
  if (isFirebaseAdminConfigured()) {
    await (await drillRef(record.id)).set(record, { merge: true });
    return record;
  }
  const all = await readFileStore();
  const idx = all.findIndex((d) => d.id === record.id);
  if (idx === -1) all.unshift(record);
  else all[idx] = record;
  await writeFileStore(all);
  return record;
}
