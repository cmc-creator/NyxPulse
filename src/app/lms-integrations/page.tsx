import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Zap, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "LMS Integrations | NyxPulse",
  description: "Integrate NyxPulse with your learning management system.",
};

export default function LMSIntegrationsPage() {
  const integrations = [
    {
      name: "Canvas",
      status: "beta",
      description: "Sync NyxPulse courses and grades with Canvas LMS",
      features: [
        "Embed NyxPulse courses in Canvas modules",
        "Auto-sync completion and grades",
        "Deep link to course from Canvas assignments",
        "SSO via Canvas OAuth",
      ],
    },
    {
      name: "Blackboard",
      status: "planned",
      description: "Coming Q3 2026 - Full Blackboard LTI integration",
      features: [
        "LTI 1.3 implementation",
        "Course roster sync",
        "Grade passback",
        "Deep linking support",
      ],
    },
    {
      name: "Moodle",
      status: "planned",
      description: "Coming Q4 2026 - Moodle plugin and LTI",
      features: [
        "Moodle plugin for direct integration",
        "LTI standard support",
        "Course synchronization",
        "Analytics dashboard",
      ],
    },
    {
      name: "Brightspace (D2L)",
      status: "roadmap",
      description: "Planned integration - Contact sales for priority",
      features: [
        "LTI integration",
        "Content import/export",
        "Grade sync",
        "Deep linking",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-indigo-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <h1 className="font-display text-4xl font-bold text-white mb-4">LMS Integrations</h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Integrate NyxPulse with your existing learning management system. Embed courses, sync grades, maintain SSO, and build seamless training workflows.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {integrations.map((integration) => {
              const statusColor =
                integration.status === "beta"
                  ? "badge-cyan"
                  : integration.status === "planned"
                    ? "badge-amber"
                    : "badge-violet";

              const statusLabel =
                integration.status === "beta"
                  ? "Available Now (Beta)"
                  : integration.status === "planned"
                    ? "Coming Soon"
                    : "On Roadmap";

              return (
                <div
                  key={integration.name}
                  className="glass-card p-8 rounded-2xl border border-[rgba(99,102,241,0.2)] hover:border-[rgba(99,102,241,0.4)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{integration.name}</h3>
                        <span className={`badge ${statusColor}`}>{statusLabel}</span>
                      </div>
                      <p className="text-slate-400">{integration.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-[rgba(99,102,241,0.1)]">
                    {integration.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-300 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {integration.status === "beta" && (
                    <div className="mt-6 pt-6 border-t border-[rgba(99,102,241,0.1)]">
                      <a
                        href="mailto:integrations@nyxpulse.com"
                        className="inline-flex items-center gap-2 text-indigo-300 hover:text-white transition-colors"
                      >
                        Get Integration Guide
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {integration.status === "planned" && (
                    <div className="mt-6 pt-6 border-t border-[rgba(99,102,241,0.1)]">
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/30 transition-colors">
                        Notify Me
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">How Integrations Work</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    1
                  </span>
                  Authentication (SSO)
                </h3>
                <p className="text-slate-400">
                  Based on your LMS platform, we support LTI 1.3, OAuth 2.0, or custom SSO. Users log in once and access NyxPulse without re-authenticating.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    2
                  </span>
                  Course Embedding
                </h3>
                <p className="text-slate-400">
                  Embed NyxPulse courses directly in your LMS module or course outline. Deep linking ensures students go straight to the right content.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    3
                  </span>
                  Data Sync
                </h3>
                <p className="text-slate-400">
                  Grades, completion status, and certificates sync back to your LMS. Your gradebook stays up-to-date automatically.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    4
                  </span>
                  Reporting
                </h3>
                <p className="text-slate-400">
                  View NyxPulse analytics and reports in your LMS dashboard. No context switching needed.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 lg:p-14">
            <h2 className="text-2xl font-bold text-white mb-4">Don't see your LMS?</h2>
            <p className="text-slate-400 mb-6">
              We can build integrations for other LMS platforms. Contact our integrations team to discuss your specific needs.
            </p>
            <a href="mailto:integrations@nyxpulse.com" className="button button-pulse inline-flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Request Integration
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
