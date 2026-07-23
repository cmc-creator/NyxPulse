import type { Metadata } from "next";
import Link from "next/link";
import { Award, ArrowLeft, ShieldCheck, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { getCourseBySlug } from "@/lib/courses";
import { formatCertificateDate } from "@/lib/certificates";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { getCertificateById } from "@/lib/firebase/learner-data";

interface Props {
  params: Promise<{ certId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certId } = await params;
  return {
    title: `Verify Certificate ${certId} | NyxPulse`,
    description: "Verify a NyxPulse Certificate of Completion.",
  };
}

export default async function VerifyCertificatePage({ params }: Props) {
  const { certId } = await params;
  const configured = isFirebaseAdminConfigured();
  const certificate = configured ? await getCertificateById(decodeURIComponent(certId)) : null;
  const course = certificate ? getCourseBySlug(certificate.courseSlug) : undefined;

  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-violet-400 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to NyxPulse
          </Link>

          <div className="glass-card p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Certificate Verification</h1>
                <p className="text-sm text-slate-400">NyxPulse Certificate of Completion</p>
              </div>
            </div>

            {!configured ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
                Certificate verification requires Firebase Admin configuration. Contact
                support@nyxpulse.com to validate a certificate ID.
              </div>
            ) : certificate && course ? (
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Valid NyxPulse certificate
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                    <dt className="text-slate-500">Certificate ID</dt>
                    <dd className="text-white font-mono text-right">{certificate.id}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                    <dt className="text-slate-500">Recipient</dt>
                    <dd className="text-white text-right">{certificate.recipientName}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                    <dt className="text-slate-500">Course</dt>
                    <dd className="text-white text-right">{course.title}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Issued</dt>
                    <dd className="text-white text-right">
                      {formatCertificateDate(certificate.issuedAt)}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
                  <XCircle className="w-3.5 h-3.5" />
                  Certificate not found
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  No NyxPulse certificate matches{" "}
                  <span className="font-mono text-slate-300">{decodeURIComponent(certId)}</span>.
                  Check the ID and try again, or contact support@nyxpulse.com.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
