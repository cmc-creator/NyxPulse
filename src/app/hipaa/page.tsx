import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "HIPAA Compliance | NyxPulse",
  description: "NyxPulse HIPAA compliance information and business associate agreement.",
};

export default function HIPAAPage() {
  const features = [
    {
      icon: Lock,
      title: "Data Encryption",
      desc: "All data in transit uses TLS 1.2+. Protected health information at rest is AES-256 encrypted.",
    },
    {
      icon: Eye,
      title: "Access Controls",
      desc: "Role-based access, multi-factor authentication, and audit logging of all data access.",
    },
    {
      icon: Shield,
      title: "Business Associate Agreement",
      desc: "We sign BAAs with covered entities and business associates as required by HIPAA.",
    },
    {
      icon: AlertCircle,
      title: "Breach Notification",
      desc: "Immediate notification protocol in case of unauthorized access or data breach.",
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
            <p className="text-slate-400 mb-8">NyxPulse is designed to support healthcare organizations while maintaining strict HIPAA compliance.</p>
            <div className="inline-flex items-center gap-2 badge badge-violet">
              <Shield className="w-4 h-4" />
              HIPAA-Ready Platform
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
                  NyxPulse is built to support healthcare organizations with strict HIPAA compliance requirements. We maintain administrative, physical, and technical safeguards appropriate for handling Protected Health Information (PHI).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Administrative Safeguards</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Designated privacy and security officers</li>
                  <li>Regular workforce training on HIPAA obligations</li>
                  <li>Policies and procedures for PHI handling</li>
                  <li>Authorization and access management</li>
                  <li>Regular risk assessments and compliance audits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Physical Safeguards</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Secure data centers with restricted access</li>
                  <li>Environmental controls (fire suppression, temperature monitoring)</li>
                  <li>Surveillance and intrusion detection systems</li>
                  <li>Workstation security and device controls</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Technical Safeguards</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Encryption:</strong> AES-256 for data at rest, TLS 1.2+ for data in transit</li>
                  <li><strong>Authentication:</strong> Multi-factor authentication, strong password policies</li>
                  <li><strong>Audit Controls:</strong> Comprehensive logging of access, modifications, and deletions</li>
                  <li><strong>Access Controls:</strong> Role-based permissions, principle of least privilege</li>
                  <li><strong>Integrity Controls:</strong> Data validation and checksums</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Business Associate Agreement (BAA)</h2>
                <p>
                  If you are a HIPAA-covered entity or business associate, we require execution of a Business Associate Agreement before you process any Protected Health Information through our platform. The BAA specifies:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Permitted uses and disclosures of PHI</li>
                  <li>Security and privacy requirements</li>
                  <li>Breach notification obligations</li>
                  <li>Permitted subcontractors and their obligations</li>
                  <li>Right to audit and inspect compliance</li>
                </ul>
                <p className="mt-4">
                  To request a BAA template, contact <a href="mailto:hipaa@nyxpulse.com" className="text-indigo-300 hover:text-white">hipaa@nyxpulse.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Breach Notification</h2>
                <p>
                  In the unlikely event of a confirmed breach of unsecured PHI, we will:
                </p>
                <ol className="space-y-2 list-decimal list-inside mt-3">
                  <li>Notify you without unreasonable delay (generally within 24 hours)</li>
                  <li>Provide information about the breach, individuals affected, and mitigation steps</li>
                  <li>Cooperate with your breach notification obligations to individuals and regulators</li>
                  <li>Retain evidence for regulatory review</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Subcontractors</h2>
                <p>
                  We may use subcontractors to process PHI. All subcontractors are contractually bound to the same privacy and security obligations as NyxPulse. Current subcontractors:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Stripe (payment processing) — PCI-DSS compliant</li>
                  <li>Clerk (authentication) — SOC 2 Type II certified</li>
                  <li>Vercel (hosting) — SOC 2 Type II, ISO 27001 certified</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Compliance Audits & Assessments</h2>
                <p>
                  We conduct regular security audits and penetration testing. We are happy to provide:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Evidence of compliance (audit reports, certifications)</li>
                  <li>Right to conduct audits and inspections (as specified in BAA)</li>
                  <li>Copies of security and privacy policies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">State Privacy Laws</h2>
                <p>
                  We also comply with state-level privacy laws including CCPA (California), CPA (Colorado), and similar regulations. We respect user rights regarding data access, deletion, and opt-out.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact & Support</h2>
                <p>
                  For HIPAA compliance questions, audit requests, or to initiate a BAA:
                </p>
                <div className="mt-4 text-sm">
                  <p><strong>NyxCollective LLC</strong></p>
                  <p><strong>HIPAA Privacy Officer:</strong> privacy@nyxpulse.com</p>
                  <p><strong>HIPAA Security Officer:</strong> security@nyxpulse.com</p>
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
