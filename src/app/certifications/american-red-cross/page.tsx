import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { jeremyInstructor } from "@/lib/instructors";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "American Red Cross Pathway | NyxPulse",
  description:
    "How NyxPulse Certificates of Completion work alongside optional American Red Cross digital certificates with instructor Jeremy.",
};

const steps = [
  {
    icon: GraduationCap,
    title: "1. Complete NyxPulse training + earn our certificate",
    desc: "Finish the course modules and claim your NyxPulse Certificate of Completion (with certificate ID). This is your platform credential whether or not you pursue Red Cross paperwork.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Optional: book a skills session",
    desc: "If you need an official American Red Cross digital certificate, book a skills session with Jeremy. He may teach through NyxPulse or another authorized organization.",
  },
  {
    icon: BadgeCheck,
    title: "3. Official Red Cross digital certificate (when applicable)",
    desc: "When a class is taught and reported under an authorized Red Cross Training Provider agreement, the American Red Cross issues the digital certificate via the Learning Center — not NyxPulse.",
  },
];

export default function AmericanRedCrossPage() {
  const arcCourses = courses.filter((course) => course.americanRedCrossPathway);

  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-indigo-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <div className="inline-flex items-center gap-2 badge badge-cyan mb-4">
              <ShieldCheck className="w-4 h-4" />
              Dual certificate pathways
            </div>
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              NyxPulse certificates + optional Red Cross pathway
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              NyxPulse issues its own Certificates of Completion. Separately, Jeremy
              ({jeremyInstructor.credentials[0]}) can run skills sessions for learners who also
              need an official American Red Cross digital certificate. He teaches through NyxPulse
              and other organizations as scheduled.
            </p>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-50">
              NyxPulse never generates American Red Cross wallet/digital cards. Those come only from
              the American Red Cross after an authorized class is reported in the Red Cross Learning Center.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="glass-card p-6 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/25 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold mb-1">{step.title}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Programs with Red Cross pathway</h2>
            <div className="space-y-3">
              {arcCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[rgba(99,102,241,0.15)] hover:border-cyan-400/40 transition-colors"
                >
                  <div>
                    <div className="text-white font-semibold">
                      {course.icon} {course.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{course.certifies}</div>
                  </div>
                  <div className="text-sm text-cyan-300">${course.price} flat fee</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/sessions" className="btn-primary inline-flex items-center justify-center gap-2">
              Book a skills session
            </Link>
            <Link href="/instructors/jeremy" className="btn-outline inline-flex items-center justify-center gap-2">
              Meet Jeremy
            </Link>
            <a
              href="https://www.redcross.org/take-a-class/digital-certificate"
              target="_blank"
              rel="noreferrer"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Red Cross Find My Certificate <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
