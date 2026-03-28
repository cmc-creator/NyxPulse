"use client";

import { useState } from "react";
import { Printer, CheckCircle } from "lucide-react";
import type { Course } from "@/lib/courses";

interface CertificateCardProps {
  course: Course;
  fullName: string;
}

export default function CertificateCard({ course, fullName }: CertificateCardProps) {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    const certEl = document.getElementById(`cert-${course.slug}`);
    if (!certEl) { setPrinting(false); return; }

    const win = window.open("", "_blank", "width=900,height=650");
    if (!win) { setPrinting(false); return; }

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Certificate — ${course.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          .cert { width: 800px; padding: 60px; border: 6px solid #7c3aed; border-radius: 16px; text-align: center; position: relative; font-family: 'Inter', sans-serif; }
          .cert::before { content:''; position:absolute; inset:10px; border:1px solid rgba(124,58,237,0.25); border-radius:10px; pointer-events:none; }
          .brand { font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: #7c3aed; margin-bottom: 8px; font-weight: 600; }
          .cert-title { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 700; color: #1a0533; margin-bottom: 28px; line-height: 1.2; }
          .certifies-text { font-size: 15px; color: #64748b; margin-bottom: 10px; }
          .recipient { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: #7c3aed; border-bottom: 2px solid #e8d9ff; display: inline-block; padding-bottom: 6px; margin-bottom: 20px; }
          .completed-text { font-size: 15px; color: #64748b; margin-bottom: 10px; }
          .course-name { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #1a0533; margin-bottom: 8px; }
          .cert-detail { font-size: 12px; color: #94a3b8; margin-bottom: 36px; }
          .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; border-top: 1px solid #e8d9ff; padding-top: 24px; }
          .footer-left { text-align: left; }
          .footer-brand { font-size: 22px; font-weight: 700; color: #7c3aed; }
          .footer-sub { font-size: 11px; color: #94a3b8; margin-top: 2px; }
          .footer-right { text-align: right; }
          .footer-label { font-size: 11px; color: #94a3b8; margin-bottom: 4px; }
          .footer-sig { font-family: 'Playfair Display', serif; font-size: 18px; color: #1a0533; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>${certEl.innerHTML}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); setPrinting(false); }, 500);
  };

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Screen preview */}
      <div
        id={`cert-${course.slug}`}
        className="cert w-full bg-white text-center p-10 rounded-2xl border-4 border-violet-600 relative overflow-hidden"
        style={{ fontFamily: "serif" }}
      >
        {/* Inner border */}
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
            {fullName}
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
            {course.certifies} · {course.duration} · {course.category}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-end mt-8 pt-6 border-t border-violet-100 font-sans">
            <div className="text-left">
              <div className="text-xl font-bold text-violet-600">NyxPulse</div>
              <div className="text-xs text-slate-400">A NyxCollective LLC Product</div>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-violet-500 mb-1" />
              <div className="text-xs text-slate-400">Verified Completion</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 mb-1">Date Issued</div>
              <div className="text-sm font-semibold text-slate-700">{today}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>{course.shortTitle} · Completed</span>
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
