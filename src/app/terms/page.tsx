import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "Terms of Service | NyxPulse",
  description: "Review NyxPulse's terms of service and user agreement.",
};

export default function TermsPage() {
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
            <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-slate-400 mb-10">Last updated: March 28, 2026</p>

            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing and using NyxPulse, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. License to Use Platform</h2>
                <p>
                  NyxPulse grants you a limited, non-exclusive, non-transferable license to use the platform for the purpose of accessing training courses and obtaining certifications. You may not:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Reproduce, duplicate, copy, or sell any portion of the service</li>
                  <li>Reverse engineer, decompile, or attempt to derive source code</li>
                  <li>Remove or modify any copyright, trademark, or proprietary notices</li>
                  <li>Use the service for any unlawful purpose</li>
                  <li>Share login credentials or allow unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                <p>
                  You are responsible for:
                </p>
                <ul className="space-y-2 list-disc list-inside mt-3">
                  <li>Maintaining the confidentiality of your account and password</li>
                  <li>Providing accurate and complete information</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Not using the platform to harass, abuse, or threaten others</li>
                  <li>Not uploading malicious code or engaging in hacking attempts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Certifications & Credentials</h2>
                <p>
                  Certificates issued by NyxPulse are digital credentials verifying course completion. They are valid for the tenure specified in the course materials and do not constitute professional licensing. Learners are solely responsible for maintaining their certifications and complying with applicable regulatory requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>All prices are in USD unless otherwise stated</li>
                  <li>Payment is processed securely via Stripe</li>
                  <li>Individual course purchases are non-refundable once access is granted</li>
                  <li>Team and enterprise plans may offer refunds subject to our refund policy</li>
                  <li>Invoices are issued upon purchase for business records</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Refund Policy</h2>
                <p>
                  Individual courses: Non-refundable after access is granted. Request within 7 days if course is inaccessible or defective. Team cohorts: Refunds available if program is cancelled by NyxPulse. Enterprise contracts: Subject to specific agreement terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, NyxPulse shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, even if advised of the possibility of such damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
                <p>
                  The platform is provided &quot;as is&quot; without warranties of any kind, express or implied. NyxPulse does not warrant that the service will be uninterrupted, error-free, or secure. Use of the service is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                <p>
                  NyxPulse may suspend or terminate your account if you violate these terms, engage in fraudulent activity, or abuse the platform. Upon termination, your right to use the service ends immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of material changes via email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <p>
                  These terms are governed by the laws of the United States. Any disputes shall be resolved in accordance with applicable federal and state law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Contact</h2>
                <p>
                  For questions about these terms, contact:
                </p>
                <div className="mt-4 text-sm">
                  <p><strong>NyxCollective LLC</strong></p>
                  <p>Email: <a href="mailto:legal@nyxpulse.com" className="text-indigo-300 hover:text-white">legal@nyxpulse.com</a></p>
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
