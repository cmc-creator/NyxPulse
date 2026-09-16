export type InvoiceStatus = "draft" | "sent" | "paid" | "void" | "overdue";

export type InvoiceSource = "stripe-checkout" | "manual";

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitAmount: number;
  courseSlug?: string;
};

export type InvoiceRecord = {
  id: string;
  invoiceNumber: string;
  source: InvoiceSource;
  status: InvoiceStatus;
  customerName: string;
  customerEmail: string;
  customerUserId?: string;
  issuerUserId?: string;
  orgName?: string;
  courseSlugs: string[];
  lineItems: InvoiceLineItem[];
  subtotal: number;
  total: number;
  currency: string;
  notes?: string;
  dueAt?: string;
  issuedAt: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  receiptUrl?: string;
  paymentMethod?: string;
};

export type InvoiceSummary = {
  totalCount: number;
  paidCount: number;
  openCount: number;
  subtotal: number;
  paidTotal: number;
  outstandingTotal: number;
};
