import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Mail,
  Building2,
} from "lucide-react";
import { courses } from "@/lib/courses";

interface PublicMetadata {
  courses?: string[];
  completedCourses?: string[];
  plan?: string;
  orgName?: string;
  orgRole?: "admin" | "member";
  orgMembers?: { email: string; name: string; courses: string[]; completedCourses: string[] }[];
}

export default async function OrgPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const pub = (user.publicMetadata ?? {}) as PublicMetadata;
  const plan = pub.plan ?? "individual";
  const orgName = pub.orgName ?? "Your Organization";
  const orgRole = pub.orgRole ?? "admin";
  const members = pub.orgMembers ?? [];

  // Gate: only team/org plan users
  if (plan === "individual") {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Team Portal
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your team&apos;s training and track progress.
          </p>
        </div>

        <div className="glass-card p-10 text-center border border-violet-500/20">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Team plan required
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            The Team Portal is available on Team and Organization plans. Manage
            multiple learners, assign courses, and track completion from one
            dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/courses" className="btn-outline inline-flex items-center gap-2">
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Feature preview */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">
            What you get with a Team plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "👥", title: "5–25 Seats", desc: "Invite team members and centralize all training under one account." },
              { icon: "📊", title: "Progress Dashboard", desc: "See who has completed what, and who still needs to finish their training." },
              { icon: "📚", title: "Bulk Course Assignment", desc: "Assign specific courses to specific team members or everyone at once." },
              { icon: "🏆", title: "Team Certificates", desc: "Download completion records for your whole team for compliance reporting." },
              { icon: "💳", title: "Central Billing", desc: "One invoice for all seats. Easy expense reporting for your organization." },
              { icon: "🎯", title: "Priority Support", desc: "Dedicated account support and faster turnaround on custom requests." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-card p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Team / Org view
  const allCourseSlugs = Array.from(
    new Set(members.flatMap((m) => m.courses))
  );
  const orgCourses = courses.filter((c) => allCourseSlugs.includes(c.slug));
  const totalCompletions = members.reduce(
    (sum, m) => sum + (m.completedCourses?.length ?? 0),
    0
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-violet-400" />
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              {orgRole === "admin" ? "Admin" : "Member"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{orgName}</h1>
          <p className="text-slate-400 mt-1">Team training dashboard</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 w-fit">
          {plan === "org" ? "Organization" : "Team"} Plan
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Team Members", value: members.length, icon: Users },
          { label: "Courses Assigned", value: orgCourses.length, icon: BookOpen },
          { label: "Completions", value: totalCompletions, icon: CheckCircle },
          { label: "Pending", value: members.length * orgCourses.length - totalCompletions, icon: Clock },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass-card p-4 text-center">
            <Icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Team members */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Team Members</h2>
          {orgRole === "admin" && (
            <button className="btn-outline text-sm py-2 inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Invite Member
            </button>
          )}
        </div>

        {members.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Users className="w-10 h-10 text-slate-600 mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-2">
              No team members yet
            </h3>
            <p className="text-slate-400 text-sm mb-5 max-w-sm mx-auto">
              Invite your colleagues to start tracking their training progress
              from this dashboard.
            </p>
            <button className="btn-primary inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Send First Invite
            </button>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Enrolled
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Completed
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => {
                  const done = member.completedCourses?.length ?? 0;
                  const enrolled = member.courses?.length ?? 0;
                  const pct = enrolled > 0 ? Math.round((done / enrolled) * 100) : 0;
                  return (
                    <tr
                      key={member.email}
                      className={i < members.length - 1 ? "border-b border-[rgba(255,255,255,0.04)]" : ""}
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-slate-500 text-xs">{member.email}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-400 hidden sm:table-cell">
                        {enrolled}
                      </td>
                      <td className="px-5 py-4 text-slate-400 hidden md:table-cell">
                        {done}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            pct === 100
                              ? "bg-green-500/15 text-green-400 border-green-500/20"
                              : pct > 0
                              ? "bg-violet-500/15 text-violet-400 border-violet-500/20"
                              : "bg-slate-500/15 text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {pct === 100 ? "Complete" : pct > 0 ? `${pct}%` : "Not started"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Assign courses */}
      {orgRole === "admin" && (
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Assign Courses</h2>
          <div className="glass-card p-6 border border-violet-500/15">
            <p className="text-slate-400 text-sm mb-5">
              Select courses to assign to all team members or specific individuals.
              Contact us to bulk-purchase seats.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {courses.map((course) => (
                <div
                  key={course.slug}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[rgba(255,255,255,0.06)] hover:border-violet-500/30 transition-colors cursor-pointer"
                >
                  <span className="text-xl flex-shrink-0">{course.icon}</span>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {course.shortTitle}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {course.price ? `$${course.price}/seat` : "Contact us"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Request Bulk Seats <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
