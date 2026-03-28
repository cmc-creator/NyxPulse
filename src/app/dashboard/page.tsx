import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/courses";
import { BookOpen, Calendar, Award, ArrowRight, Zap } from "lucide-react";

interface UserMetadata {
  courses?: string[];
  completedCourses?: string[];
  plan?: string;
}

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const metadata = (user.publicMetadata ?? {}) as UserMetadata;
  const enrolledSlugs: string[] = metadata.courses ?? [];
  const completedSlugs: string[] = metadata.completedCourses ?? [];
  const plan = metadata.plan ?? "individual";

  const enrolledCourses = courses.filter((c) => enrolledSlugs.includes(c.slug));

  const firstName = user.firstName ?? "there";

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: BookOpen,
      color: "from-violet-600 to-violet-400",
      glow: "rgba(124,58,237,0.3)",
    },
    {
      label: "Upcoming Sessions",
      value: 0,
      icon: Calendar,
      color: "from-cyan-600 to-cyan-400",
      glow: "rgba(6,182,212,0.3)",
    },
    {
      label: "Certificates Earned",
      value: completedSlugs.length,
      icon: Award,
      color: "from-amber-600 to-amber-400",
      glow: "rgba(217,119,6,0.3)",
    },
  ];

  const planLabels: Record<string, string> = {
    individual: "Individual",
    team: "Team",
    org: "Organization",
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {firstName}!
          </h1>
          <p className="text-slate-400 mt-1">
            Here&apos;s what&apos;s happening with your training.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-600/20 text-violet-300 border border-violet-500/30 w-fit">
          <Zap className="w-3 h-3" />
          {planLabels[plan] ?? "Individual"} Plan
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, glow }) => (
          <div
            key={label}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
              style={{ boxShadow: `0 0 20px ${glow}` }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-sm text-slate-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* My Courses */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">My Courses</h2>
          <Link
            href="/courses"
            className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
          >
            Browse All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No courses yet
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              Browse our catalog and enroll in your first training to get
              started.
            </p>
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((course) => {
              const isCompleted = completedSlugs.includes(course.slug);
              return (
                <div key={course.slug} className="glass-card p-5 flex flex-col gap-4 hover:border-violet-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none">{course.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm leading-tight truncate">
                        {course.shortTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{course.category}</p>
                    </div>
                    {isCompleted && (
                      <span className="ml-auto flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                        Done
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>Progress</span>
                      <span>{isCompleted ? "100%" : "0%"}</span>
                    </div>
                    <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all"
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/courses/${course.slug}`}
                    className="mt-auto btn-primary text-sm py-2 text-center flex items-center justify-center gap-1.5"
                  >
                    {isCompleted ? "Review" : "Start Learning"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Live Sessions */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Upcoming Live Sessions</h2>
        </div>
        <div className="glass-card p-8 text-center">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white mb-2">
            No sessions scheduled
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Book a live or virtual training session with one of our certified
            instructors.
          </p>
          <Link href="/contact" className="btn-outline inline-flex items-center gap-2 text-sm">
            Book Training <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
