import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight, ArrowLeft, Check, Monitor, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { getCourseBySlug, courses } from "@/lib/courses";
import { currentUser } from "@clerk/nextjs/server";
import BuyButton from "@/components/BuyButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found | NyxPulse" };
  return {
    title: `${course.title} | NyxPulse`,
    description: course.description,
  };
}

const badgeClass: Record<string, string> = {
  violet: "badge-violet",
  cyan: "badge-cyan",
  amber: "badge-amber",
  green: "badge-green",
};

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const user = await currentUser();
  const enrolledSlugs = (user?.publicMetadata?.courses as string[]) ?? [];
  const hasCourse = enrolledSlugs.includes(slug);

  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-slate-500 hover:text-violet-400 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all courses
          </Link>

          {/* Hero section */}
          <div className="glass-card p-8 lg:p-12 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-cyan-500" />

            {/* Category & badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className={`badge ${badgeClass[course.badge]}`}>{course.category}</span>
              <span className="badge badge-violet">{course.level}</span>
              {course.format.map((f) => (
                <span key={f} className="badge badge-cyan">
                  {f === "Live" ? <Users className="w-3 h-3 mr-1" /> : <Monitor className="w-3 h-3 mr-1" />}
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-start gap-4">
              <span className="text-5xl" role="img" aria-label={course.shortTitle}>
                {course.icon}
              </span>
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-2 leading-tight">
                  {course.title}
                </h1>
                <p className="text-violet-400 text-lg font-medium">{course.tagline}</p>
              </div>
            </div>

            <p className="text-slate-400 text-base leading-relaxed mt-5 max-w-3xl">
              {course.description}
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Duration", value: course.duration },
                { label: "Level", value: course.level },
                { label: "Certifies", value: course.certifies },
                {
                  label: "Price",
                  value: course.price ? `$${course.price}/person` : "Contact us",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-[rgba(124,58,237,0.08)] rounded-xl p-4 border border-[rgba(124,58,237,0.15)]"
                >
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-white font-semibold text-sm">{value}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <BuyButton
                courseSlug={course.slug}
                price={course.price}
                hasCourse={hasCourse}
              />
              <Link href="/contact" className="btn-outline px-10 py-3.5 text-base text-center">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Modules — main column */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500 inline-block" />
                Curriculum
              </h2>
              {course.modules.map((mod, i) => (
                <div
                  key={mod.title}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs font-bold">
                      {i + 1}
                    </div>
                    <h3 className="text-white font-semibold">{mod.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {mod.topics.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-400">
                        <Check className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Outcomes */}
              <div className="glass-card p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Learning Outcomes
                </h3>
                <ul className="space-y-2.5">
                  {course.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-slate-400">
                      <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who it's for */}
              <div className="glass-card p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  Who This Is For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.whoFor.map((w) => (
                    <span key={w} className="badge badge-violet text-xs">
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration detail */}
              <div className="glass-card p-6">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Delivery Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Duration</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Formats</span>
                    <span className="text-white">{course.format.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Group min.</span>
                    <span className="text-white">1 person</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Group max.</span>
                    <span className="text-white">Contact us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other courses */}
          <div className="mt-16">
            <h2 className="text-white font-bold text-2xl mb-6">Explore Other Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses
                .filter((c) => c.slug !== course.slug)
                .slice(0, 3)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/courses/${c.slug}`}
                    className="glass-card p-5 flex items-center gap-3 hover:border-violet-500/50 transition-all group"
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{c.shortTitle}</div>
                      <div className="text-slate-500 text-xs truncate">{c.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
