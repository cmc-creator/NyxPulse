"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Plus, ReceiptText, BadgeDollarSign, Clock3, CheckCircle2 } from "lucide-react";
import { courses } from "@/lib/courses";
import type { InvoiceRecord, InvoiceSummary } from "@/lib/accounting/types";

type Props = {
  initialInvoices: InvoiceRecord[];
  summary: InvoiceSummary;
  managed: boolean;
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function AccountingDashboard({ initialInvoices, summary, managed }: Props) {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialInvoices);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [courseSlug, setCourseSlug] = useState(courses[0]?.slug ?? "");
  const [description, setDescription] = useState(courses[0]?.title ?? "Training invoice");
  const [amount, setAmount] = useState(courses[0]?.price?.toFixed(2) ?? "0.00");
  const [notes, setNotes] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [status, setStatus] = useState<"draft" | "sent" | "paid">("sent");

  const selectedCourse = useMemo(
    () => courses.find((course) => course.slug === courseSlug),
    [courseSlug]
  );

  const refresh = async () => {
    const res = await fetch("/api/accounting");
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error ?? "Unable to reload accounting data");
    }
    setInvoices(json.invoices ?? []);
  };

  const createInvoice = async () => {
    setBusy(true);
    setError(null);
    setOk(null);
    try {
      const lineAmount = Number(amount);
      const res = await fetch("/api/accounting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          orgName: undefined,
          courseSlugs: selectedCourse ? [selectedCourse.slug] : [],
          description,
          amount: lineAmount,
          notes: notes.trim() || undefined,
          dueAt: dueAt || undefined,
          status,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Unable to create invoice");
        return;
      }
      setInvoices((prev) => [json.invoice, ...prev]);
      setOk(`${json.invoice.invoiceNumber} created.`);
      setCustomerName("");
      setCustomerEmail("");
      setNotes("");
      setDueAt("");
      setStatus("sent");
      await refresh();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  };

  const updateInvoice = async (invoiceId: string, nextStatus: InvoiceRecord["status"]) => {
    setBusy(true);
    setError(null);
    setOk(null);
    try {
      const res = await fetch("/api/accounting", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId, status: nextStatus }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Unable to update invoice");
        return;
      }
      setInvoices((prev) => prev.map((invoice) => (invoice.id === json.invoice.id ? json.invoice : invoice)));
      setOk(`${json.invoice.invoiceNumber} updated.`);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  };

  const statusBadge = (invoice: InvoiceRecord) => {
    if (invoice.status === "paid") return "bg-green-500/15 text-green-400 border-green-500/20";
    if (invoice.status === "void") return "bg-slate-500/15 text-slate-400 border-slate-500/20";
    if (invoice.status === "overdue") return "bg-red-500/15 text-red-300 border-red-500/20";
    return "bg-amber-500/15 text-amber-300 border-amber-500/20";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Accounting</h1>
          <p className="text-slate-400 mt-1">
            {managed
              ? "Track invoices, payments, and trainer billing."
              : "Track your payment history and receipts."}
          </p>
        </div>
        <Link href="/dashboard/billing" className="btn-outline text-sm inline-flex items-center gap-2">
          Billing portal <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Invoices", value: summary.totalCount, icon: ReceiptText },
          { label: "Paid", value: summary.paidCount, icon: CheckCircle2 },
          { label: "Open", value: summary.openCount, icon: Clock3 },
          { label: "Outstanding", value: money.format(summary.outstandingTotal), icon: BadgeDollarSign },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass-card p-5">
            <Icon className="w-5 h-5 text-violet-300 mb-2" />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {managed && (
        <section className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Plus className="w-4 h-4 text-cyan-300" />
            Create invoice
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer name"
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            />
            <input
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Customer email"
              type="email"
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            />
            <select
              value={courseSlug}
              onChange={(e) => {
                const slug = e.target.value;
                setCourseSlug(slug);
                const course = courses.find((item) => item.slug === slug);
                setDescription(course?.title ?? "Training invoice");
                setAmount(course?.price?.toFixed(2) ?? "0.00");
              }}
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            >
              <option value="">Custom invoice</option>
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Invoice description"
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            />
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              inputMode="decimal"
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            />
            <input
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              placeholder="Due date (optional)"
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "sent" | "paid")}
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
            </select>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              rows={3}
              className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm sm:col-span-2"
            />
          </div>
          <button
            onClick={() => void createInvoice()}
            disabled={busy || !customerName || !customerEmail || !description || !amount}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-60"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Create invoice
          </button>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-white mb-4">
          {managed ? "Invoice ledger" : "Payment history"}
        </h2>
        {invoices.length === 0 ? (
          <div className="glass-card p-8 text-center text-slate-400">No records yet.</div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="glass-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-semibold">{invoice.invoiceNumber}</div>
                    <div className="text-slate-400 text-sm">
                      {invoice.customerName} · {invoice.customerEmail}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {invoice.issuedAt.slice(0, 10)} · {invoice.source}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{money.format(invoice.total)}</div>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs ${statusBadge(invoice)}`}>
                      {invoice.status}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-300">
                  {invoice.lineItems.map((item) => `${item.quantity} × ${item.description}`).join(", ")}
                </div>
                {invoice.notes && <p className="text-xs text-slate-500">{invoice.notes}</p>}
                {managed && (
                  <div className="flex flex-wrap gap-2">
                    {invoice.status !== "sent" && (
                      <button
                        onClick={() => void updateInvoice(invoice.id, "sent")}
                        disabled={busy}
                        className="btn-outline text-xs py-1.5"
                      >
                        Mark sent
                      </button>
                    )}
                    {invoice.status !== "paid" && (
                      <button
                        onClick={() => void updateInvoice(invoice.id, "paid")}
                        disabled={busy}
                        className="btn-primary text-xs py-1.5"
                      >
                        Mark paid
                      </button>
                    )}
                    {invoice.status !== "void" && (
                      <button
                        onClick={() => void updateInvoice(invoice.id, "void")}
                        disabled={busy}
                        className="btn-outline text-xs py-1.5"
                      >
                        Void
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {ok && <p className="text-green-400 text-sm">{ok}</p>}
    </div>
  );
}
