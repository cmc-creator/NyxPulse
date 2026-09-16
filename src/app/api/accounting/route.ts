import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";
import { getCourseBySlug } from "@/lib/courses";
import { canManageAccounting } from "@/lib/accounting/permissions";
import {
  createManualInvoice,
  listInvoices,
  listInvoicesForUser,
  summarizeInvoices,
  updateInvoiceStatus,
} from "@/lib/accounting/store";
import { sendInvoiceEmail } from "@/lib/email-automation";

function toMoney(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeLineItems(input: unknown, fallbackDescription?: string, fallbackAmount?: number) {
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const description =
          typeof (item as { description?: unknown }).description === "string"
            ? (item as { description: string }).description.trim()
            : "";
        const quantity =
          typeof (item as { quantity?: unknown }).quantity === "number" &&
          Number.isFinite((item as { quantity: number }).quantity)
            ? (item as { quantity: number }).quantity
            : 1;
        const unitAmount = toMoney((item as { unitAmount?: unknown }).unitAmount);
        const courseSlug =
          typeof (item as { courseSlug?: unknown }).courseSlug === "string"
            ? (item as { courseSlug: string }).courseSlug
            : undefined;
        if (!description || unitAmount === null) return null;
        return { description, quantity, unitAmount, ...(courseSlug ? { courseSlug } : {}) };
      })
      .filter((item): item is { description: string; quantity: number; unitAmount: number; courseSlug?: string } => item !== null);
  }

  if (fallbackDescription && fallbackAmount !== null && fallbackAmount !== undefined) {
    return [{ description: fallbackDescription, quantity: 1, unitAmount: fallbackAmount }];
  }

  return [];
}

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const managed = canManageAccounting(session);
  const invoices = managed
    ? await listInvoices()
    : await listInvoicesForUser(session.userId, false);

  return NextResponse.json({
    invoices,
    summary: summarizeInvoices(invoices),
    managed,
  });
}

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canManageAccounting(session)) {
    return NextResponse.json({ error: "Not authorized to create invoices" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const customerName =
    typeof (body as { customerName?: unknown }).customerName === "string"
      ? (body as { customerName: string }).customerName.trim()
      : "";
  const customerEmail =
    typeof (body as { customerEmail?: unknown }).customerEmail === "string"
      ? (body as { customerEmail: string }).customerEmail.trim().toLowerCase()
      : "";
  const description =
    typeof (body as { description?: unknown }).description === "string"
      ? (body as { description: string }).description.trim()
      : "";
  const amount = toMoney((body as { amount?: unknown }).amount);
  const dueAt =
    typeof (body as { dueAt?: unknown }).dueAt === "string"
      ? (body as { dueAt: string }).dueAt.trim()
      : undefined;
  const notes =
    typeof (body as { notes?: unknown }).notes === "string"
      ? (body as { notes: string }).notes.trim()
      : undefined;
  const orgName =
    typeof (body as { orgName?: unknown }).orgName === "string"
      ? (body as { orgName: string }).orgName.trim()
      : session.profile.orgName ?? undefined;
  const courseSlugs = Array.isArray((body as { courseSlugs?: unknown }).courseSlugs)
    ? (body as { courseSlugs: unknown[] }).courseSlugs.filter((slug): slug is string => typeof slug === "string")
    : [];
  const status =
    (body as { status?: string }).status === "draft" ||
    (body as { status?: string }).status === "sent" ||
    (body as { status?: string }).status === "paid"
      ? ((body as { status?: "draft" | "sent" | "paid" }).status ?? "sent")
      : "sent";

  const lineItems = normalizeLineItems((body as { lineItems?: unknown }).lineItems, description, amount ?? undefined);

  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: "customerName and customerEmail are required" }, { status: 400 });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Add at least one billable line item" }, { status: 400 });
  }

  const invoice = await createManualInvoice({
    issuerUserId: session.userId,
    customerName,
    customerEmail,
    orgName,
    courseSlugs,
    lineItems,
    notes,
    dueAt,
    status,
  });

  const appUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const invoiceUrl = `${appUrl}/dashboard/accounting?invoice=${encodeURIComponent(invoice.id)}`;
  if (customerEmail && status !== "draft") {
    const emailResult = await sendInvoiceEmail(customerEmail, customerName, {
      invoiceNumber: invoice.invoiceNumber,
      lineItems: invoice.lineItems,
      total: invoice.total,
      currency: invoice.currency,
      dueAt: invoice.dueAt,
      notes: invoice.notes,
      invoiceUrl,
    });
    if (!emailResult.success) {
      console.error("Failed to send invoice email:", emailResult.error);
    }
  }

  return NextResponse.json({ success: true, invoice });
}

export async function PATCH(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canManageAccounting(session)) {
    return NextResponse.json({ error: "Not authorized to update invoices" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const invoiceId =
    body && typeof body === "object" && typeof (body as { invoiceId?: unknown }).invoiceId === "string"
      ? (body as { invoiceId: string }).invoiceId
      : "";
  const status =
    body && typeof body === "object" && typeof (body as { status?: unknown }).status === "string"
      ? (body as { status: "draft" | "sent" | "paid" | "void" | "overdue" }).status
      : undefined;

  if (!invoiceId || !status) {
    return NextResponse.json({ error: "invoiceId and status are required" }, { status: 400 });
  }

  const updated = await updateInvoiceStatus(invoiceId, status);

  if (!updated) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, invoice: updated });
}
