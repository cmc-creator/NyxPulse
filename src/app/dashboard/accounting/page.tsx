import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/server";
import { canManageAccounting } from "@/lib/accounting/permissions";
import { listInvoices, listInvoicesForUser, summarizeInvoices } from "@/lib/accounting/store";
import AccountingDashboard from "@/components/AccountingDashboard";

export default async function AccountingPage() {
  const session = await getSessionUser();
  if (!session) redirect("/sign-in");

  const managed = canManageAccounting(session);
  const invoices = managed
    ? await listInvoices()
    : await listInvoicesForUser(session.userId, false);

  return (
    <AccountingDashboard
      initialInvoices={invoices}
      summary={summarizeInvoices(invoices)}
      managed={managed}
    />
  );
}
