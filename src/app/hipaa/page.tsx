import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "HIPAA Compliance | NyxPulse",
  description: "NyxPulse HIPAA readiness information and business associate agreement process.",
};

export default function HIPAAPage() {
  const features = [
    {
      icon: Lock,
      title: "Transport Security",
      desc: "Application traffic uses TLS in production via our hosting and auth providers.",
    },
    {
      icon: Eye,
      title: "Access Controls",
      desc: "Account authentication is handled by Clerk with signed-in access to learner dashboards.",
    },
    {
      icon: Shield,
      title: "Business Associate Agreement",
      desc: "We can discuss and execute a BAA for covered-entity deployments that require one.",
    },
    {
      icon: AlertCircle,
      title: "Incident Response",
      desc: "Security and privacy inquiries are routed to our compliance contacts for investigation.",
    },
  ];

  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-indigo-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <h1 className="font-display text-4xl font-bold text-white mb-2">HIPAA Compliance</h1>
            <p className="text-slate-400 mb-8">
              NyxPulse is built for healthcare training workflows. Current self-serve accounts are designed for learner identity, enrollment, and course progress — not for storing clinical PHI by default.
            </p>
            <div className="inline-flex items-center gap-2 badge badge-violet">
              <Shield className="w-4 h-4" />
              HIPAA-ready for covered deployments
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card p-6 rounded-2xl border border-[rgba(99,102,241,0.2)]">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-300 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-10 lg:p-14">
            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p>
                  NyxPulse supports healthcare organizations that need emergency and safety training.
                  If your deployment will process Protected Health Information (PHI), contact us before go-live so we can review scope, execute a Business Associate Agreement when required, and confirm the appropriate safeguards for that engagement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">What the platform stores today</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Account identity and authentication data (via Clerk)</li>
                  <li>Course enrollment and completion status</li>
                  <li>Learner progress checklists for enrolled courses</li>
                  <li>Payment metadata required for Stripe checkout and receipts</li>
                  <li>Contact/sales inquiry details you submit voluntarily</li>
                </ul>
                <p className="mt-4">
                  Please do not submit clinical notes, patient identifiers, or other PHI through contact forms or course content unless we have an active BAA and a confirmed PHI-capable configuration for your organization.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Business Associate Agreement (BAA)</h2>
                <p>
                  Covered entities and business associates that need a BAA should contact us before processing PHI in NyxPulse. A BAA engagement typically covers permitted uses/disclosures, security obligations, breach notification, and subcontractor requirements.
                </p>
                <p className="mt-4">
                  To request a BAA discussion, email{" "}
                  <a href="mailto:hipaa@nyxpulse.com" className="text-indigo-300 hover:text-white">
                    hipaa@nyxpulse.com
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service providers</h2>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Stripe — payment processing</li>
                  <li>Clerk — authentication</li>
                  <li>Vercel — application hosting</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
                <div className="mt-4 text-sm">
                  <p><strong>NyxCollective LLC</strong></p>
                  <p><strong>Privacy:</strong> privacy@nyxpulse.com</p>
                  <p><strong>Security:</strong> security@nyxpulse.com</p>
                  <p>Phone: (623) 806-4918</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
