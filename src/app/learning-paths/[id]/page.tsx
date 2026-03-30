import type { Metadata } from "next";
import Link from "next/link";
import { getLearningPathById, getCourseBySlug } from "@/lib/courses";
import { ArrowLeft, CheckCircle, Clock, BookOpen, TrendingDown, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const path = getLearningPathById(params.id);
  if (!path) return { title: "Not Found" };

  return {
    title: `${path.title} | NyxPulse`,
    description: path.description,
  };
}

export default function LearningPathPage({ params }: { params: { id: string } }) {
  const path = getLearningPathById(params.id);
  if (!path) {
    notFound();
  }

  const courses = path.courseList.map((slug) => getCourseBySlug(slug)).filter((c) => c !== undefined);
  const individualPrice = courses.reduce((sum, c) => sum + (c?.price || 0), 0);

  const badgeBg: Record<string, string> = {
    violet: "bg-violet-500/10 text-violet-300",
    cyan: "bg-cyan-500/10 text-cyan-300",
    amber: "bg-amber-500/10 text-amber-300",
    green: "bg-green-500/10 text-green-300",
  };

  const badgeBgMuted: Record<string, string> = {
    violet: "bg-violet-500/5 text-violet-400/70",
    cyan: "bg-cyan-500/5 text-cyan-400/70",
    amber: "bg-amber-500/5 text-amber-400/70",
    green: "bg-green-500/5 text-green-400/70",
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
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-5xl mb-4">{path.icon}</div>
                <h1 className="font-display text-4xl font-bold text-white mb-2">{path.title}</h1>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${badgeBg[path.badge]} border border-[rgba(99,102,241,0.3)]`}>
                  <TrendingDown className="w-4 h-4" />
                  <span className="font-semibold">Save ${path.savings} ({Math.round((path.savings / individualPrice) * 100)}% off)</span>
                </div>
              </div>
              <div className="text-right mt-2">
                <div className="text-sm text-slate-500 uppercase tracking-[0.1em] mb-1">Bundle Price</div>
                <div className="text-4xl font-bold text-white">${path.price}</div>
                <div className="text-xs text-slate-500 mt-2">Individual: ${individualPrice}</div>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">{path.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[rgba(99,102,241,0.08)] rounded-xl p-4 border border-[rgba(99,102,241,0.1)]">
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-2">Courses</div>
                <div className="text-2xl font-bold text-white">{path.courseList.length}</div>
              </div>
              <div className="bg-[rgba(99,102,241,0.08)] rounded-xl p-4 border border-[rgba(99,102,241,0.1)]">
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-2">Total Hours</div>
                <div className="text-2xl font-bold text-white">{path.totalHours}h</div>
              </div>
              <div className="bg-[rgba(99,102,241,0.08)] rounded-xl p-4 border border-[rgba(99,102,241,0.1)]">
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-2">Competency</div>
                <div className="text-sm font-semibold text-indigo-300">{path.competency}</div>
              </div>
            </div>

            <button className="button button-pulse w-full lg:w-auto">
              <ShoppingCart className="w-5 h-5" />
              Enroll in Path (${path.price})
            </button>
          </div>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <h2 className="text-2xl font-bold text-white mb-8">What's Included</h2>

            <div className="space-y-4">
              {courses.map((course, idx) => (
                <Link
                  key={course?.slug}
                  href={`/courses/${course?.slug}`}
                  className="block p-6 rounded-xl bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.15)] hover:border-[rgba(99,102,241,0.4)] transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-3xl flex-shrink-0 mt-1">{course?.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm text-slate-500 mb-1">
                          {idx + 1} of {courses.length}
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {course?.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mt-2">
                          {course?.description}
                        </p>
                        <div className="flex items-center gap-6 mt-4 flex-wrap">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Clock className="w-4 h-4 text-indigo-300" />
                            {course?.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <BookOpen className="w-4 h-4 text-indigo-300" />
                            {course?.modules.length} modules
                          </div>
                          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeBgMuted[course?.badge || "violet"]}`}>
                            {course?.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm text-slate-500 mb-1">Individual</div>
                      <div className="text-xl font-bold text-white">${course?.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 lg:p-14 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Facts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3">Who this path is for:</h3>
                <div className="space-y-2">
                  {courses
                    .flatMap((c) => c?.whoFor || [])
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map((role) => (
                      <div key={role} className="flex items-start gap-2 text-slate-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-indigo-300 flex-shrink-0 mt-0.5" />
                        {role}
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">You'll earn certifications for:</h3>
                <div className="space-y-2">
                  {courses.map((c) => (
                    <div key={c?.slug} className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-indigo-300 flex-shrink-0 mt-0.5" />
                      {c?.certifies}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-6">
              Want to learn more, or have questions about this path?
            </p>
            <Link href="/faq" className="text-indigo-300 hover:text-white transition-colors">
              Check our FAQ →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
