import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { jeremyInstructor } from "@/lib/instructors";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Jeremy | NyxPulse Instructor",
  description:
    "Meet Jeremy, NyxPulse lead emergency training instructor and American Red Cross certified instructor.",
};

export default function JeremyInstructorPage() {
  const taughtCourses = courses.filter(
    (course) => course.instructor?.name === jeremyInstructor.name
  );

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

          <div className="glass-card p-10 lg:p-14 mb-8">
            <div className="inline-flex items-center gap-2 badge badge-cyan mb-4">
              <GraduationCap className="w-4 h-4" />
              Lead Instructor
            </div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              {jeremyInstructor.name}
            </h1>
            <p className="text-violet-300 mb-6">{jeremyInstructor.title}</p>
            <p className="text-slate-300 leading-relaxed mb-8">{jeremyInstructor.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-white font-semibold mb-3">Credentials</h2>
                <ul className="space-y-2">
                  {jeremyInstructor.credentials.map((item) => (
                    <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-white font-semibold mb-3">Teaches through</h2>
                <ul className="space-y-2">
                  {jeremyInstructor.teachesThrough.map((item) => (
                    <li key={item} className="text-sm text-slate-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {jeremyInstructor.specialties.map((item) => (
                <span key={item} className="badge badge-cyan">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Courses with Jeremy</h2>
            <div className="space-y-3">
              {taughtCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-colors"
                >
                  <span className="text-white font-medium">
                    {course.icon} {course.title}
                  </span>
                  <span className="text-sm text-slate-400">${course.price} flat fee</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard/sessions" className="btn-primary text-center">
                Book a skills session
              </Link>
              <Link href="/certifications/american-red-cross" className="btn-outline text-center">
                Red Cross pathway details
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
