"use client";

import Link from "next/link";
import { Clock, ArrowRight, Monitor, Users } from "lucide-react";
import { getFeaturedCourses } from "@/lib/courses";

const badgeClass: Record<string, string> = {
  violet: "badge-violet",
  cyan: "badge-cyan",
  amber: "badge-amber",
  green: "badge-green",
};

const formatIcons: Record<string, React.ReactNode> = {
  Live: <Users className="w-3.5 h-3.5" />,
  Virtual: <Monitor className="w-3.5 h-3.5" />,
  Hybrid: <span className="text-[10px] font-bold">H</span>,
};

export default function CoursesPreview() {
  const featured = getFeaturedCourses();

  return (
    <section id="courses" className="relative py-24 lg:py-32 px-6">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[420px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(14,165,164,0.09) 0%, transparent 72%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="badge badge-cyan mb-4">Program Catalog</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Training Pathways Designed
              <span className="gradient-text"> for Real Operations</span>
            </h2>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-teal-300 hover:text-teal-200 font-medium text-sm transition-colors whitespace-nowrap"
          >
            View all courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {featured.map((course) => (
            <div key={course.slug} className="course-card group relative overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-rose-400" />

              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${badgeClass[course.badge]}`}>{course.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" role="img" aria-label={course.shortTitle}>
                        {course.icon}
                      </span>
                      <h3 className="text-white font-bold text-xl leading-tight">{course.shortTitle}</h3>
                    </div>
                  </div>
                  {course.price !== null && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold gradient-text font-display">${course.price}</div>
                      <div className="text-xs text-slate-400">per person</div>
                    </div>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-2">{course.tagline}</p>

                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="text-slate-600">|</span>
                    {course.level}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {course.format.map((f) => (
                      <span key={f} className="flex items-center gap-1 badge badge-violet text-[10px] py-0.5 px-2">
                        {formatIcons[f]}
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/courses/${course.slug}`} className="btn-primary text-sm py-2.5 px-6 flex-1 text-center">
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                  <Link href="/contact" className="btn-outline text-sm py-2.5 px-5 whitespace-nowrap">
                    Book Session
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses" className="btn-primary px-10 py-3.5">
            <span className="flex items-center gap-2">
              See All 6 Programs
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
