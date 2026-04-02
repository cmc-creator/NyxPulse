import { promises as fs } from "node:fs";
import path from "node:path";

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

const DEFAULT_STORAGE_PATH = process.env.CONTACT_LEADS_STORAGE_PATH ?? path.join(".data", "contact-leads.ndjson");
const MAX_LEADS_RETURNED = 250;

function getStoragePath() {
  return DEFAULT_STORAGE_PATH;
}

async function ensureStorageDir(filePath: string) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

export async function storeContactLead(lead: ContactLead) {
  const filePath = getStoragePath();
  await ensureStorageDir(filePath);
  const line = `${JSON.stringify(lead)}\n`;
  await fs.appendFile(filePath, line, "utf8");
}

export async function listStoredContactLeads() {
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
