import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { courses } from "@/lib/courses";
import { asStringArray, type PrivateUserMetadata, type PublicUserMetadata } from "@/lib/user-metadata";
import { getAllTopicKeys } from "@/lib/course-progress";

export default async function MyCoursesPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
  const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
  const enrolledSlugs = asStringArray(publicMetadata.courses);
  const completedSlugs = asStringArray(publicMetadata.completedCourses);
  const enrolledCourses = courses.filter((course) => enrolledSlugs.includes(course.slug));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">My Courses</h1>
        <p className="text-slate-400 mt-1">
          Continue training and track progress across your enrolled courses.
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No courses yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Browse the catalog to enroll in CPR, BLS, de-escalation, and more.
          </p>
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
            Browse Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((course) => {
            const done = completedSlugs.includes(course.slug);
            const progressTopics = asStringArray(privateMetadata.courseProgress?.[course.slug]);
            const total = getAllTopicKeys(course).length;
            const progress =
              done ? 100 : total > 0 ? Math.round((progressTopics.length / total) * 100) : 0;

            return (
              <Link
                key={course.slug}
                href={`/dashboard/courses/${course.slug}`}
                className="glass-card p-6 hover:border-violet-500/30 transition-colors block"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{course.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-white font-semibold truncate">{course.shortTitle}</h2>
                      {done && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-green-400">
                          <CheckCircle className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{course.tagline}</p>
                    <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{progress}% complete</span>
                      <span className="text-violet-300 inline-flex items-center gap-1">
                        Continue <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
