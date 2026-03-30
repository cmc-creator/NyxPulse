import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Monitor, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "All Courses | NyxPulse",
  description:
    "Browse NyxPulse's full catalog of emergency and safety training programs: CPR, BLS, De-escalation, Emergency Management, ICS/HICS, and OSHA Safety.",
};

const badgeClass: Record<string, string> = {
  violet: "badge-violet",
  cyan: "badge-cyan",
  amber: "badge-amber",
  green: "badge-green",
};

const formatIcons: Record<string, React.ReactNode> = {
  Live: <Users className="w-3 h-3" />,
  Virtual: <Monitor className="w-3 h-3" />,
  Hybrid: <span className="text-[9px] font-bold">H</span>,
};

const categories = [...new Set(courses.map((c) => c.category))];

export default function CoursesPage() {
  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />

      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge badge-cyan mb-4">Full Curriculum</span>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white mb-4">
              All Training{" "}
              <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every NyxPulse program is available live, virtually, or as a hybrid —
              built by subject-matter experts for real-world application.
            </p>
          </div>

          {/* Category groups */}
          {categories.map((cat) => {
            const catCourses = courses.filter((c) => c.category === cat);
            return (
              <div key={cat} className="mb-16">
                <h2 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                  <span className="w-1 h-7 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500 inline-block" />
                  {cat}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {catCourses.map((course) => (
                    <div key={course.slug} className="course-card group flex flex-col">
                      <div className="h-1 w-full bg-gradient-to-r from-violet-600 to-cyan-500" />
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`badge ${badgeClass[course.badge]}`}>
                            {course.level}
                          </span>
                          {course.featured && (
                            <span className="badge badge-amber">Featured</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl" role="img" aria-label={course.shortTitle}>
                            {course.icon}
                          </span>
                          <h3 className="text-white font-bold text-lg leading-tight">
                            {course.title}
                          </h3>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                          {course.tagline}
                        </p>

                        <div className="flex items-center gap-3 mb-4 flex-wrap text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {course.duration}
                          </span>
                          <span>•</span>
                          {course.format.map((f) => (
                            <span key={f} className={`badge ${badgeClass[course.badge]} text-[10px] py-0.5 px-2 flex items-center gap-1`}>
                              {formatIcons[f]}{f}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          {course.price !== null ? (
                            <span className="text-xl font-bold gradient-text font-display">
                              ${course.price}<span className="text-sm font-normal text-slate-500">/person</span>
                            </span>
                          ) : (
                            <span className="text-slate-500 text-sm">Contact for pricing</span>
                          )}
                          <Link
                            href={`/courses/${course.slug}`}
                            className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors group-hover:gap-2.5"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Enterprise CTA */}
          <div className="glass-card p-10 text-center mt-8">
            <h3 className="font-display text-3xl font-bold text-white mb-3">
              Need a Custom Training Program?
            </h3>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              We design bespoke training solutions for hospitals, clinics, and healthcare networks.
              Reach out and let&apos;s build something tailored to your team.
            </p>
            <Link href="/contact" className="btn-primary px-10 py-3.5">
              <span className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
