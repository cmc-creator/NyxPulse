import { getSessionUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard, Receipt, Package, ArrowRight, ExternalLink } from "lucide-react";
import ManageBillingButton from "@/components/ManageBillingButton";
import { courses } from "@/lib/courses";
import { getStripe } from "@/lib/stripe";

type BillingCharge = {
  id: string;
  created: number;
  description: string;
  amount: number;
  currency: string;
  refunded: boolean;
  receiptUrl: string | null;
};

/** Real charge history from Stripe; null when Stripe is unavailable. */
async function listStripeCharges(customerId: string): Promise<BillingCharge[] | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  try {
    const charges = await getStripe().charges.list({ customer: customerId, limit: 20 });
    return charges.data
      .filter((charge) => charge.paid)
      .map((charge) => ({
        id: charge.id,
        created: charge.created,
        description: charge.description ?? "Course purchase",
        amount: charge.amount,
        currency: charge.currency,
        refunded: charge.refunded,
        receiptUrl: charge.receipt_url ?? null,
      }));
  } catch (err) {
    console.error("Failed to load Stripe charges for billing page:", err);
    return null;
  }
}

export default async function BillingPage() {
  const session = await getSessionUser();
  if (!session) redirect("/sign-in");

  const { profile } = session;
  const enrolledSlugs: string[] = profile.courses ?? [];
  const completedSlugs: string[] = profile.completedCourses ?? [];
  const plan = profile.plan ?? "individual";
  const hasStripeCustomer = Boolean(profile.stripeCustomerId);

  const enrolledCourses = courses.filter((c) => enrolledSlugs.includes(c.slug));
  const totalSpent = enrolledCourses.reduce((sum, c) => sum + (c.price ?? 0), 0);
  const stripeCharges = hasStripeCustomer
    ? await listStripeCharges(profile.stripeCustomerId!)
    : null;

  const planConfig: Record<string, { name: string; description: string; bar: string }> = {
    individual: {
      name: "Individual",
      description: "Pay-per-course access. Perfect for solo learners and individual certification.",
      bar: "from-violet-600 to-violet-400",
    },
    team: {
      name: "Team",
      description: "Facility programs with flat quoted fees and centralized progress tracking.",
      bar: "from-cyan-600 to-cyan-400",
    },
    org: {
      name: "Organization",
      description: "Multi-site training programs with dedicated support and custom reporting.",
      bar: "from-amber-600 to-amber-400",
    },
  };
  const currentPlan = planConfig[plan] ?? planConfig.individual;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Billing</h1>
        <p className="text-slate-400 mt-1">Manage your subscription and payment history.</p>
      </div>

      {/* Plan card */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentPlan.bar}`} />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                Current Plan
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{currentPlan.name}</h2>
            <p className="text-slate-400 text-sm max-w-md">{currentPlan.description}</p>
          </div>
          <div className="flex-shrink-0">
            {hasStripeCustomer ? (
              <ManageBillingButton />
            ) : (
              <Link
                href="/courses"
                className="btn-outline text-sm inline-flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Courses Purchased", value: enrolledCourses.length, icon: "📚" },
          { label: "Total Invested", value: totalSpent > 0 ? `$${totalSpent}` : "—", icon: "💳" },
          { label: "Certificates Earned", value: completedSlugs.length, icon: "🏆" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="glass-card p-5 flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            <div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment history — real Stripe charges when available */}
      {stripeCharges && stripeCharges.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Payments</h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Description
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody>
                {stripeCharges.map((charge, i) => (
                  <tr
                    key={charge.id}
                    className={
                      i < stripeCharges.length - 1
                        ? "border-b border-[rgba(255,255,255,0.04)]"
                        : ""
                    }
                  >
                    <td className="px-5 py-4 text-slate-300">
                      {new Date(charge.created * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-slate-300 hidden sm:table-cell">
                      {charge.description}
                    </td>
                    <td className="px-5 py-4 text-right text-slate-300">
                      ${(charge.amount / 100).toFixed(2)}{" "}
                      <span className="text-slate-500 uppercase text-xs">{charge.currency}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {charge.refunded ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
                          Refunded
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right hidden sm:table-cell">
                      {charge.receiptUrl ? (
                        <a
                          href={charge.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-300 hover:text-white inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Enrollment summary (catalog prices — official receipts live in Stripe) */}
      <section>
        <h2 className="text-xl font-bold text-white mb-1">
          {stripeCharges && stripeCharges.length > 0 ? "Enrolled Courses" : "Purchase History"}
        </h2>
        {stripeCharges && stripeCharges.length > 0 && (
          <p className="text-xs text-slate-500 mb-4">
            Catalog view of your enrollments. Amounts shown are list prices — see Payments
            above for actual charges and receipts.
          </p>
        )}
        {!(stripeCharges && stripeCharges.length > 0) && <div className="mb-4" />}
        {enrolledCourses.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Receipt className="w-10 h-10 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-sm mb-4">No purchases yet.</p>
            <Link
              href="/courses"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.map((course, i) => (
                  <tr
                    key={course.slug}
                    className={
                      i < enrolledCourses.length - 1
                        ? "border-b border-[rgba(255,255,255,0.04)]"
                        : ""
                    }
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{course.icon}</span>
                        <span className="text-white">{course.shortTitle}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-slate-300">
                      {course.price ? `$${course.price}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-right hidden sm:table-cell">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                        Enrolled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Upgrade prompt */}
      {plan === "individual" && (
        <div className="glass-card p-6 border border-violet-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white mb-1">
                Need training for your whole team?
              </h3>
              <p className="text-slate-400 text-sm">
                Ask about facility programs with flat quoted fees, admin dashboards, and progress reporting.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-outline text-sm flex-shrink-0 inline-flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Contact Sales
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
