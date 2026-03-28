import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { courses } from "@/lib/courses";
import CertificateCard from "@/components/CertificateCard";

export default async function CertificatesPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const enrolledSlugs = (user.publicMetadata?.courses as string[]) ?? [];
  const completedSlugs = (user.publicMetadata?.completedCourses as string[]) ?? [];

  const completedCourses = courses.filter((c) => completedSlugs.includes(c.slug));
  const inProgressCourses = courses.filter(
    (c) => enrolledSlugs.includes(c.slug) && !completedSlugs.includes(c.slug)
  );

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "Learner";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Certificates</h1>
        <p className="text-slate-400 mt-1">
          Your earned certifications and completion records.
        </p>
      </div>

      {/* Earned certificates */}
      {completedCourses.length > 0 ? (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Earned Certificates</h2>
          <div className="space-y-8">
            {completedCourses.map((course) => (
              <CertificateCard key={course.slug} course={course} fullName={fullName} />
            ))}
          </div>
        </section>
      ) : (
        <div className="glass-card p-10 text-center">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No certificates yet
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Complete all modules in a course and claim your certificate to see it
            here.
          </p>
          {inProgressCourses.length > 0 ? (
            <Link
              href={`/dashboard/courses/${inProgressCourses[0].slug}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              Continue Learning <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/courses"
              className="btn-primary inline-flex items-center gap-2"
            >
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}

      {/* In progress */}
      {inProgressCourses.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-5">In Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inProgressCourses.map((course) => (
              <div
                key={course.slug}
                className="glass-card p-5 flex items-center gap-4"
              >
                <span className="text-2xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    {course.shortTitle}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    Complete all modules to earn certificate
                  </div>
                </div>
                <Link
                  href={`/dashboard/courses/${course.slug}`}
                  className="btn-outline text-xs py-1.5 px-3 flex-shrink-0"
                >
                  Continue
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
