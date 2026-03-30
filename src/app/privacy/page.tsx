import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "Privacy Policy | NyxPulse",
  description: "Learn how NyxPulse protects your data and privacy.",
};

export default function PrivacyPage() {
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

          <div className="glass-card p-10 lg:p-14">
            <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-slate-400 mb-10">Last updated: March 28, 2026</p>

            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p>
                  NyxPulse (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Name, email address, phone number</li>
                  <li>Organization name and role</li>
                  <li>Payment information (processed securely via Stripe)</li>
                  <li>Course enrollment and completion history</li>
                  <li>Certificate data and credentials</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-3 mt-6">Automatic Information</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>IP address, browser type, operating system</li>
                  <li>Pages visited, time spent, referral source</li>
                  <li>Device identifiers and cookies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Deliver and improve our training courses</li>
                  <li>Process payments and issue certifications</li>
                  <li>Send course updates, completion reminders, and support communications</li>
                  <li>Comply with legal and regulatory obligations (HIPAA, state law)</li>
                  <li>Analyze usage to enhance platform functionality</li>
                  <li>Prevent fraud and maintain platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. HIPAA Compliance</h2>
                <p>
                  If you are a covered entity or business associate under HIPAA, we handle Protected Health Information (PHI) in accordance with HIPAA regulations and our Business Associate Agreement (BAA). We maintain appropriate safeguards including encryption, access controls, and audit logging.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing</h2>
                <p>
                  We do not sell your personal information. We may share information with:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li><strong>Service providers</strong> (Stripe for payments, Clerk for auth, Vercel for hosting)</li>
                  <li><strong>Legal requirements</strong> (law enforcement, court orders)</li>
                  <li><strong>Team administrators</strong> (if you join an organization, limited to relevant data)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
                <p>
                  We retain your personal information as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Course completion records are retained for 7 years. You may request deletion of non-essential data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p>
                  Depending on your location, you have the right to:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion (subject to legal retention requirements)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Data portability (export your information)</li>
                </ul>
                <p className="mt-4">
                  Contact us at <a href="mailto:privacy@nyxpulse.com" className="text-indigo-300 hover:text-white">privacy@nyxpulse.com</a> to exercise these rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Security</h2>
                <p>
                  We implement industry-standard security measures including encryption (TLS/SSL), regular security audits, and access controls. However, no system is completely secure. We cannot guarantee absolute security of transmitted data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p>
                  For privacy inquiries, contact:
                </p>
                <div className="mt-4 text-sm">
                  <p><strong>NyxCollective LLC</strong></p>
                  <p>Email: <a href="mailto:privacy@nyxpulse.com" className="text-indigo-300 hover:text-white">privacy@nyxpulse.com</a></p>
                  <p>Web: <a href="https://nyxpulse.com" className="text-indigo-300 hover:text-white">nyxpulse.com</a></p>
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
