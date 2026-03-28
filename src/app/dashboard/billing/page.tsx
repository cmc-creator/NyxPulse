import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CreditCard, Receipt, Package, ArrowRight } from "lucide-react";
import ManageBillingButton from "@/components/ManageBillingButton";
import { courses } from "@/lib/courses";

interface PublicMetadata {
  courses?: string[];
  completedCourses?: string[];
  plan?: string;
}

interface PrivateMetadata {
  stripeCustomerId?: string;
}

export default async function BillingPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const pub = (user.publicMetadata ?? {}) as PublicMetadata;
  const priv = (user.privateMetadata ?? {}) as PrivateMetadata;

  const enrolledSlugs: string[] = pub.courses ?? [];
  const completedSlugs: string[] = pub.completedCourses ?? [];
  const plan = pub.plan ?? "individual";
  const hasStripeCustomer = Boolean(priv.stripeCustomerId);

  const enrolledCourses = courses.filter((c) => enrolledSlugs.includes(c.slug));
  const totalSpent = enrolledCourses.reduce((sum, c) => sum + (c.price ?? 0), 0);

  const planConfig: Record<string, { name: string; description: string; bar: string }> = {
    individual: {
      name: "Individual",
      description: "Pay-per-course access. Perfect for solo learners and individual certification.",
      bar: "from-violet-600 to-violet-400",
    },
    team: {
      name: "Team",
      description: "Shared access for teams of 5–25 with centralized billing and progress tracking.",
      bar: "from-cyan-600 to-cyan-400",
    },
    org: {
      name: "Organization",
      description: "Unlimited seats, priority support, custom branding and reporting.",
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

      {/* Purchase history */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Purchase History</h2>
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
                        Paid
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
                Ask about our Team and Organization plans with bulk pricing, admin dashboards, and progress reporting.
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
