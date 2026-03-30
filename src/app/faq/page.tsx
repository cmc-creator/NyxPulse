import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "FAQ | NyxPulse",
  description: "Frequently asked questions about NyxPulse training courses, pricing, and certifications.",
};

const faqs = [
  {
    q: "What courses does NyxPulse offer?",
    a: "We offer comprehensive emergency and safety training: CPR/AED ($49), BLS ($69), De-escalation ($89), Emergency Management ($199), ICS/HICS ($119), and OSHA Safety ($59). Each course includes video instruction, interactive scenarios, knowledge checks, and certificate issuance.",
  },
  {
    q: "Are NyxPulse certificates recognized by healthcare providers?",
    a: "Yes. Our certificates are recognized by hospitals, clinics, EMS, fire departments, and other healthcare organizations. Certificates verify completion of accredited training and are valid for the tenure specified in course materials. Always check your organization's requirements for additional licensing or state-specific certifications.",
  },
  {
    q: "How long do certificates remain valid?",
    a: "Validity depends on the course and regulatory requirements. CPR/BLS typically expire in 2 years. De-escalation and Emergency Management are valid for 3 years. OSHA certifications may have longer validity. Check your course details for specific renewal timelines.",
  },
  {
    q: "Can I take courses on my phone or tablet?",
    a: "Yes. NyxPulse is fully responsive and works on all devices. You can start a course on desktop and continue on mobile without losing progress. All videos, knowledge checks, and assessments are optimized for smaller screens.",
  },
  {
    q: "Do you offer team discounts?",
    a: "Absolutely. Our Team Bundle plan provides 20% discount for 5+ users, 30% off for 20+ team members. Enterprise plans with custom pricing are available for 50+ users. Contact our team at sales@nyxpulse.com for a quote.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) via Stripe. All payments are PCI-DSS compliant and secure. We also support ACH bank transfers for enterprise customers.",
  },
  {
    q: "What is your refund policy?",
    a: "Individual courses are non-refundable after access is granted. Refund requests within 7 days are considered if the course is inaccessible or defective. Team and enterprise plans may have different refund terms. See our Terms of Service for details.",
  },
  {
    q: "Are NyxPulse courses HIPAA compliant?",
    a: "Yes. We are HIPAA-ready and sign Business Associate Agreements (BAAs) with healthcare organizations. All Protected Health Information is encrypted, access-controlled, audited, and stored securely. Contact hipaa@nyxpulse.com to initiate a BAA.",
  },
  {
    q: "Can instructors see individual learner progress?",
    a: "Administrators with access to the organization dashboard can view completion rates, assessment scores, and certificate issuance dates. Individual learner progress is role-restricted and governed by your data access policies.",
  },
  {
    q: "How are certificates issued?",
    a: "Certificates are automatically generated and issued upon successful completion of a course (typically including a final assessment). Learners can download their certificates in PDF format, print them, or share a digital credential link.",
  },
  {
    q: "What happens if I don't pass an assessment?",
    a: "Most courses allow unlimited retries. You can review the content, take practice quizzes, and attempt the final assessment again. Some enterprise courses may have restricted retries. Check your specific course materials.",
  },
  {
    q: "Can I generate reports on team training compliance?",
    a: "Yes. The Admin Dashboard provides completion reports, certification expiration tracking, and compliance status. You can filter by course, date range, and team. Export reports in CSV format for additional analysis.",
  },
  {
    q: "What support channels are available?",
    a: "We offer email support (support@nyxpulse.com), in-app help, and comprehensive documentation. Enterprise customers have access to a dedicated support line. Most inquiries are resolved within 24 hours.",
  },
  {
    q: "Do you offer API integrations for LMS systems?",
    a: "Yes. We're building integrations with Canvas, Blackboard, and Moodle. Contact integrations@nyxpulse.com to request or discuss your specific LMS platform.",
  },
  {
    q: "How does the affiliate program work?",
    a: "Our affiliate program is launching soon. Partners earn commission on referred customers. Early affiliates will receive preferential rates and dedicated support. Sign up at nyxpulse.com/affiliates.",
  },
];

export default function FAQPage() {
  // Generate FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

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
            <h1 className="font-display text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
            <p className="text-slate-400">Quick answers to common questions about courses, pricing, and certifications.</p>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-[rgba(99,102,241,0.2)] hover:border-[rgba(99,102,241,0.4)] transition-colors group"
              >
                <summary className="flex items-center justify-between p-6 lg:p-8 cursor-pointer select-none">
                  <h3 className="text-white font-semibold text-lg pr-4 group-open:text-indigo-300 transition-colors">
                    {faq.q}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-indigo-300 flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 border-t border-[rgba(99,102,241,0.1)]">
                  <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="glass-card p-10 lg:p-14 mt-10 border-l-4 border-indigo-500">
            <h2 className="text-white font-bold text-xl mb-3">Still have questions?</h2>
            <p className="text-slate-300 mb-6">
              Our support team is here to help. Reach out anytime.
            </p>
            <div className="flex gap-4">
              <a href="mailto:support@nyxpulse.com" className="button button-pulse">
                Email us
              </a>
              <a href="https://nyxpulse.com" className="button button-outline">
                Contact form
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
