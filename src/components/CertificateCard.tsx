"use client";

import { useState } from "react";
import Link from "next/link";
import { Printer, CheckCircle, ExternalLink, ShieldCheck, Calendar } from "lucide-react";
import type { Course } from "@/lib/courses";
import type { IssuedCertificate } from "@/lib/certificates";
import { formatCertificateDate } from "@/lib/certificates";

interface CertificateCardProps {
  course: Course;
  fullName: string;
  certificate?: IssuedCertificate;
}

export default function CertificateCard({
  course,
  fullName,
  certificate,
}: CertificateCardProps) {
  const [printing, setPrinting] = useState(false);
  const hasArcPathway = Boolean(course.americanRedCrossPathway);
  const issuedLabel = certificate
    ? formatCertificateDate(certificate.issuedAt)
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  const certId = certificate?.id ?? "Pending issuance";
  const recipient = certificate?.recipientName || fullName;
  const instructorName = course.instructor?.name ?? "NyxPulse Instructor";

  const handlePrint = () => {
    setPrinting(true);
    const certEl = document.getElementById(`cert-${course.slug}`);
    if (!certEl) {
      setPrinting(false);
      return;
    }

    const win = window.open("", "_blank", "width=900,height=650");
    if (!win) {
      setPrinting(false);
      return;
    }

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>NyxPulse Certificate — ${course.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          .cert { width: 800px; padding: 60px; border: 6px solid #7c3aed; border-radius: 16px; text-align: center; position: relative; font-family: 'Inter', sans-serif; }
          .cert::before { content:''; position:absolute; inset:10px; border:1px solid rgba(124,58,237,0.25); border-radius:10px; pointer-events:none; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>${certEl.innerHTML}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => {
      win.print();
      setPrinting(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      {hasArcPathway && (
        <div className="glass-card p-4 border border-cyan-400/25 bg-cyan-500/5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-300">
            <p className="text-white font-semibold mb-1">
              NyxPulse certificate earned — Red Cross pathway optional
            </p>
            <p className="mb-3">
              This is your official <span className="text-white">NyxPulse Certificate of Completion</span>.
              If you also need an American Red Cross digital certificate, book a skills session.
              Red Cross cards are issued only when the class is taught/reported through an authorized
              Red Cross Training Provider process (Jeremy may teach through NyxPulse or other organizations).
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/dashboard/sessions?course=${encodeURIComponent(course.slug)}`}
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-white"
              >
                <Calendar className="w-3.5 h-3.5" /> Book skills session
              </Link>
              <Link
                href="/certifications/american-red-cross"
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-white"
              >
                How the Red Cross pathway works <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div
        id={`cert-${course.slug}`}
        className="cert w-full bg-white text-center p-10 rounded-2xl border-4 border-violet-600 relative overflow-hidden"
        style={{ fontFamily: "serif" }}
      >
        <div className="absolute inset-3 border border-violet-200 rounded-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <p className="text-xs tracking-[4px] uppercase text-violet-600 font-semibold font-sans">
            NyxPulse · NyxCollective LLC
          </p>

          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Certificate of Completion
          </h2>

          <p className="text-slate-500 text-sm font-sans">This certifies that</p>

          <div
            className="text-3xl sm:text-4xl font-bold text-violet-600 border-b-2 border-violet-200 inline-block pb-1"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {recipient}
          </div>

          <p className="text-slate-500 text-sm font-sans">
            has successfully completed
          </p>

          <div
            className="text-xl sm:text-2xl font-bold text-slate-800"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {course.title}
          </div>

          <p className="text-slate-400 text-xs font-sans">
            {course.duration} · {course.category}
          </p>

          <p className="text-slate-500 text-xs font-sans">
            Certificate ID: <span className="text-slate-700 font-semibold">{certId}</span>
            {certificate?.id && (
              <>
                {" · "}
                <Link
                  href={`/verify/${encodeURIComponent(certificate.id)}`}
                  className="text-violet-600 underline font-sans"
                >
                  Verify
                </Link>
              </>
            )}
          </p>

          <div className="flex justify-between items-end mt-8 pt-6 border-t border-violet-100 font-sans">
            <div className="text-left">
              <div className="text-xl font-bold text-violet-600">NyxPulse</div>
              <div className="text-xs text-slate-400">A NyxCollective LLC Product</div>
            </div>
            <div className="text-center">
              <div
                className="text-lg text-slate-800"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {instructorName}
              </div>
              <div className="text-xs text-slate-400">Instructor</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 mb-1">Date Issued</div>
              <div className="text-sm font-semibold text-slate-700">{issuedLabel}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>{course.shortTitle} · NyxPulse certificate</span>
        </div>
        <button
          onClick={handlePrint}
          disabled={printing}
          className="btn-outline text-sm py-2 inline-flex items-center gap-2 disabled:opacity-60"
        >
          <Printer className="w-4 h-4" />
          {printing ? "Opening…" : "Print / Save PDF"}
        </button>
      </div>
    </div>
  );
}
