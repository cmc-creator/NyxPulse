import { promises as fs } from "node:fs";
import path from "node:path";
import { getAdminDb } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import type { OrgInvite } from "@/lib/org/types";

function filePath() {
  if (process.env.ORG_INVITES_STORAGE_PATH) return process.env.ORG_INVITES_STORAGE_PATH;
  return path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "org-invites.json");
}

async function readFileStore(): Promise<OrgInvite[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as OrgInvite[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(records: OrgInvite[]) {
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(records, null, 2), "utf8");
}

export async function saveOrgInvite(invite: OrgInvite): Promise<OrgInvite> {
  if (isFirebaseAdminConfigured()) {
    await (await getAdminDb()).collection("orgInvites").doc(invite.token).set(invite);
    return invite;
  }
  const all = await readFileStore();
  all.unshift(invite);
  await writeFileStore(all);
  return invite;
}

export async function getOrgInvite(token: string): Promise<OrgInvite | null> {
  if (isFirebaseAdminConfigured()) {
    const snap = await (await getAdminDb()).collection("orgInvites").doc(token).get();
    if (!snap.exists) return null;
    return snap.data() as OrgInvite;
  }
  const all = await readFileStore();
  return all.find((invite) => invite.token === token) ?? null;
}
