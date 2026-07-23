import { promises as fs } from "node:fs";
import path from "node:path";
import { getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export type ContactLead = {
  createdAt: string;
  name: string;
  email: string;
  org?: string;
  phone?: string;
  trainingType: string[];
  format?: string;
  teamSize?: string;
  message?: string;
  sourceIp?: string;
};

const MAX_LEADS_RETURNED = 250;

function getStoragePath() {
  if (process.env.CONTACT_LEADS_STORAGE_PATH) {
    return process.env.CONTACT_LEADS_STORAGE_PATH;
  }

  // Scope to a subfolder so Turbopack NFT tracing does not pull the whole project.
  return path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "contact-leads.ndjson");
}

async function ensureStorageDir(filePath: string) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

async function storeLeadInFirestore(lead: ContactLead) {
  await getAdminDb().collection("leads").add(lead);
}

async function storeLeadInFile(lead: ContactLead) {
  const filePath = getStoragePath();
  await ensureStorageDir(filePath);
  const line = `${JSON.stringify(lead)}\n`;
  await fs.appendFile(filePath, line, "utf8");
}

export async function storeContactLead(lead: ContactLead) {
  if (isFirebaseAdminConfigured()) {
    await storeLeadInFirestore(lead);
    return;
  }
  await storeLeadInFile(lead);
}

async function listLeadsFromFirestore() {
  const snap = await getAdminDb()
    .collection("leads")
    .orderBy("createdAt", "desc")
    .limit(MAX_LEADS_RETURNED)
    .get();

  return snap.docs.map((doc) => doc.data() as ContactLead);
}

async function listLeadsFromFile() {
  const filePath = getStoragePath();

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const rows = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as ContactLead;
        } catch {
          return null;
        }
      })
      .filter((row): row is ContactLead => row !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return rows.slice(0, MAX_LEADS_RETURNED);
  } catch {
    return [];
  }
}

export async function listStoredContactLeads() {
  if (isFirebaseAdminConfigured()) {
    return listLeadsFromFirestore();
  }
  return listLeadsFromFile();
}
