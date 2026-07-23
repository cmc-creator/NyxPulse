"use client";

import Link from "next/link";
import { getAllLearningPaths, getCourseBySlug } from "@/lib/courses";
import { ArrowRight } from "lucide-react";

const badgeBg: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  green: "bg-green-500/10 text-green-300 border-green-500/30",
};

export default function LearningPaths() {
  const paths = getAllLearningPaths();

  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge badge-amber mb-4">Recommended Tracks</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Guidance by role.
            <span className="gradient-text"> Separate enrollments.</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Tracks help you choose the right trainings. Each course still has its own flat fee —
            CPR, OSHA, and ICS/HICS are never sold as one package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {paths.map((path) => {
            const pathCourses = path.courseList
              .map((slug) => getCourseBySlug(slug))
              .filter((course) => course !== undefined);

            return (
              <Link
                key={path.id}
                href={`/learning-paths/${path.id}`}
                className="glass-card p-8 rounded-[28px] group hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{path.icon}</div>
                  <div className={`px-3 py-1 rounded-lg border text-xs font-semibold ${badgeBg[path.badge]}`}>
                    {path.competency}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {path.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {path.description}
                </p>

                <div className="space-y-2 mb-5">
                  {pathCourses.map((course) => (
                    <div
                      key={course.slug}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.1)]"
                    >
                      <span className="text-sm text-slate-200">
                        {course.icon} {course.shortTitle}
                      </span>
                      <span className="text-sm font-semibold text-indigo-300">
                        ${course.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500 uppercase tracking-[0.1em]">
                    {path.courseList.length} separate training
                    {path.courseList.length === 1 ? "" : "s"} · {path.totalHours}h total
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <ArrowRight className="w-5 h-5 text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm mb-4">
            Looking for facility-wide delivery? We quote flat program fees — not per-seat pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-indigo-300 hover:text-white transition-colors group"
          >
            Talk to training desk
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
