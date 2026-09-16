import { promises as fs } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { getAdminDb } from "@/lib/firebase/admin";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import { resolveStoragePath } from "@/lib/storage-path";
import type {
  InvoiceLineItem,
  InvoiceRecord,
  InvoiceStatus,
  InvoiceSummary,
} from "@/lib/accounting/types";

const DEFAULT_LIMIT = 200;

function filePath() {
  return resolveStoragePath("ACCOUNTING_STORAGE_PATH", "invoices.json");
}

async function readFileStore(): Promise<InvoiceRecord[]> {
  try {
    const raw = await fs.readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as InvoiceRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(records: InvoiceRecord[]) {
  const fp = filePath();
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(records, null, 2), "utf8");
}

async function invoiceCollection() {
  return (await getAdminDb()).collection("accountingInvoices");
}

function createInvoiceNumber() {
  return `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;
}

function normalizeInvoice(invoice: InvoiceRecord): InvoiceRecord {
  return {
    ...invoice,
    courseSlugs: Array.from(new Set(invoice.courseSlugs)),
    lineItems: invoice.lineItems.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitAmount: item.unitAmount,
      ...(item.courseSlug ? { courseSlug: item.courseSlug } : {}),
    })),
    subtotal: Number(invoice.subtotal || 0),
    total: Number(invoice.total || 0),
  };
}

export function summarizeInvoices(invoices: InvoiceRecord[]): InvoiceSummary {
  const subtotal = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const paidTotal = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.total, 0);
  return {
    totalCount: invoices.length,
    paidCount: invoices.filter((invoice) => invoice.status === "paid").length,
    openCount: invoices.filter((invoice) => invoice.status !== "paid" && invoice.status !== "void").length,
    subtotal,
    paidTotal,
    outstandingTotal: subtotal - paidTotal,
  };
}

async function storeInvoiceFirestore(invoice: InvoiceRecord) {
  await (await invoiceCollection()).doc(invoice.id).set(invoice, { merge: true });
}

async function listInvoicesFirestore(limit = DEFAULT_LIMIT): Promise<InvoiceRecord[]> {
  const snap = await (await invoiceCollection())
    .orderBy("issuedAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((doc) => doc.data() as InvoiceRecord);
}

async function findInvoiceFirestore(invoiceId: string): Promise<InvoiceRecord | null> {
  const snap = await (await invoiceCollection()).doc(invoiceId).get();
  if (!snap.exists) return null;
  return snap.data() as InvoiceRecord;
}

export function createInvoiceId() {
  return `inv_${randomUUID()}`;
}

export function createStripeInvoiceNumber(sessionId: string) {
  const suffix = sessionId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
  return `INV-${suffix}`;
}

export function makeInvoiceLineItems(items: InvoiceLineItem[]) {
  return items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    unitAmount: item.unitAmount,
    ...(item.courseSlug ? { courseSlug: item.courseSlug } : {}),
  }));
}

export function buildInvoiceRecord(input: Omit<InvoiceRecord, "id" | "invoiceNumber" | "createdAt" | "updatedAt" | "subtotal" | "total" | "currency"> & {
  id?: string;
  invoiceNumber?: string;
  subtotal?: number;
  total?: number;
  currency?: string;
}) {
  const now = new Date().toISOString();
  const total = input.lineItems.reduce((sum, item) => sum + item.quantity * item.unitAmount, 0);
  const record: InvoiceRecord = normalizeInvoice({
    id: input.id ?? createInvoiceId(),
    invoiceNumber: input.invoiceNumber ?? createInvoiceNumber(),
    createdAt: now,
    updatedAt: now,
    ...input,
    subtotal: total,
    total,
    currency: input.currency ?? "usd",
  });
  return record;
}

export async function saveInvoice(invoice: InvoiceRecord): Promise<InvoiceRecord> {
  const next = normalizeInvoice({
    ...invoice,
    updatedAt: new Date().toISOString(),
  });

  if (isFirebaseAdminConfigured()) {
    await storeInvoiceFirestore(next);
    return next;
  }

  const all = await readFileStore();
  const idx = all.findIndex((entry) => entry.id === next.id);
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  await writeFileStore(all);
  return next;
}

export async function listInvoices(limit = DEFAULT_LIMIT): Promise<InvoiceRecord[]> {
  if (isFirebaseAdminConfigured()) {
    return listInvoicesFirestore(limit);
  }
  const all = await readFileStore();
  return all.slice(0, limit);
}

export async function getInvoice(invoiceId: string): Promise<InvoiceRecord | null> {
  if (isFirebaseAdminConfigured()) {
    return findInvoiceFirestore(invoiceId);
  }
  const all = await readFileStore();
  return all.find((invoice) => invoice.id === invoiceId) ?? null;
}

export async function listInvoicesForUser(
  userId: string,
  includeManaged = false
): Promise<InvoiceRecord[]> {
  const all = await listInvoices();
  return all.filter((invoice) => invoice.customerUserId === userId || (includeManaged && invoice.issuerUserId === userId));
}

export async function createManualInvoice(input: {
  issuerUserId: string;
  customerName: string;
  customerEmail: string;
  orgName?: string;
  courseSlugs?: string[];
  lineItems: InvoiceLineItem[];
  notes?: string;
  dueAt?: string;
  status?: InvoiceStatus;
  receiptUrl?: string;
}) {
  const invoice = buildInvoiceRecord({
    source: "manual",
    status: input.status ?? "sent",
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    issuerUserId: input.issuerUserId,
    orgName: input.orgName,
    courseSlugs: input.courseSlugs ?? [],
    lineItems: makeInvoiceLineItems(input.lineItems),
    notes: input.notes,
    dueAt: input.dueAt,
    issuedAt: new Date().toISOString(),
    paymentMethod: "manual",
    receiptUrl: input.receiptUrl,
  });

  return saveInvoice(invoice);
}

export async function recordStripeInvoice(input: {
  customerUserId: string;
  customerName: string;
  customerEmail: string;
  orgName?: string;
  courseSlugs: string[];
  lineItems: InvoiceLineItem[];
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string;
  paymentMethod?: string;
  receiptUrl?: string;
}) {
  const invoice = buildInvoiceRecord({
    id: input.stripeCheckoutSessionId,
    invoiceNumber: createStripeInvoiceNumber(input.stripeCheckoutSessionId),
    source: "stripe-checkout",
    status: "paid",
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerUserId: input.customerUserId,
    orgName: input.orgName,
    courseSlugs: input.courseSlugs,
    lineItems: makeInvoiceLineItems(input.lineItems),
    issuedAt: new Date().toISOString(),
    paidAt: new Date().toISOString(),
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId,
    receiptUrl: input.receiptUrl,
    paymentMethod: input.paymentMethod,
  });

  return saveInvoice(invoice);
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus,
  extra?: Partial<Pick<InvoiceRecord, "paidAt" | "notes" | "receiptUrl">>
) {
  const current = await getInvoice(invoiceId);
  if (!current) return null;
  return saveInvoice({
    ...current,
    status,
    ...(status === "paid" && !current.paidAt ? { paidAt: new Date().toISOString() } : {}),
    ...extra,
  });
}

export async function summarizeInvoicesForUser(userId: string, includeManaged = false) {
  const invoices = await listInvoicesForUser(userId, includeManaged);
  return {
    invoices,
    summary: summarizeInvoices(invoices),
  };
}
