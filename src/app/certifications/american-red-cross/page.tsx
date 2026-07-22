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
import { courses, isAmericanRedCrossCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "American Red Cross Training | NyxPulse",
  description:
    "How NyxPulse delivers American Red Cross CPR, AED, First Aid, and BLS training with a certified instructor and proper certification workflow.",
};

const steps = [
  {
    icon: GraduationCap,
    title: "1. Enroll & study prep modules",
    desc: "Use NyxPulse to learn the material before class. Prep modules are study support — not a substitute for required Red Cross online coursework when your class is blended learning.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Attend instructor skills session",
    desc: "Practice and demonstrate CPR, AED, first aid, or BLS skills with Jeremy, an American Red Cross certified instructor, using Red Cross program standards.",
  },
  {
    icon: BadgeCheck,
    title: "3. Receive official Red Cross digital certificate",
    desc: "After skills verification and course reporting in the Red Cross Learning Center, the American Red Cross issues your digital certificate by email. Employers can verify it at redcross.org.",
  },
];

export default function AmericanRedCrossPage() {
  const arcCourses = courses.filter(isAmericanRedCrossCourse);

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
              American Red Cross pathway
            </div>
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              Built for Red Cross certified instruction
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              NyxPulse supports instructor-led American Red Cross First Aid / CPR / AED and BLS
              programs taught by {jeremyInstructor.name}, {jeremyInstructor.credentials[0]}.
              We designed the platform so learners can prepare here — and still receive their
              official Red Cross certificate the correct way.
            </p>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-50">
              NyxPulse does not generate American Red Cross certificates. Official digital
              certificates come only from the American Red Cross after your instructor reports a
              completed course in the Red Cross Learning Center.
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
            <h2 className="text-2xl font-bold text-white mb-4">Lead instructor</h2>
            <p className="text-white font-semibold text-lg">{jeremyInstructor.name}</p>
            <p className="text-slate-400 text-sm mb-4">{jeremyInstructor.title}</p>
            <ul className="space-y-2">
              {jeremyInstructor.credentials.map((item) => (
                <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Red Cross programs on NyxPulse</h2>
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

          <div className="glass-card p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Compliance checklist</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>Instructor maintains current American Red Cross instructor certification and affiliation with an approved Training Provider.</li>
              <li>Official Red Cross course materials and skill sheets are used for certification classes (via Red Cross Learning Center access).</li>
              <li>Course activity is reported/closed out in the Red Cross Learning Center so students receive digital certificates.</li>
              <li>Blended classes use Red Cross online components when required; NyxPulse prep does not replace those modules.</li>
              <li>American Red Cross logos/marks are used only under authorized Training Provider guidelines.</li>
              <li>NyxPulse completion records are labeled as prep records, never as Red Cross certificates.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/courses/cpr-aed" className="btn-primary inline-flex items-center justify-center gap-2">
              Start with CPR/AED
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
