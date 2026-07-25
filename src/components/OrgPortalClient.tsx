"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  Clock,
  Mail,
  Users,
} from "lucide-react";
import { roleMatrices } from "@/lib/roles/matrices";
import type { OrgMember } from "@/lib/org/types";

type CatalogItem = {
  slug: string;
  shortTitle: string;
  title: string;
  icon: string;
  price: number | null;
};

type Props = {
  initialPlan: string;
  initialOrgName: string;
  initialOrgRole: "admin" | "member";
  initialMembers: OrgMember[];
  catalog: CatalogItem[];
};

export default function OrgPortalClient({
  initialPlan,
  initialOrgName,
  initialOrgRole,
  initialMembers,
  catalog,
}: Props) {
  const [plan, setPlan] = useState(initialPlan);
  const [orgName, setOrgName] = useState(initialOrgName);
  const [orgRole] = useState(initialOrgRole);
  const [members, setMembers] = useState<OrgMember[]>(initialMembers);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRoleId, setInviteRoleId] = useState<string>(roleMatrices[0]?.id ?? "");
  const [assignEmail, setAssignEmail] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showInvite, setShowInvite] = useState(false);

  const orgCourses = useMemo(() => {
    const slugs = new Set(members.flatMap((m) => m.courses));
    return catalog.filter((c) => slugs.has(c.slug));
  }, [members, catalog]);

  const totalCompletions = members.reduce(
    (sum, m) => sum + (m.completedCourses?.length ?? 0),
    0
  );

  const run = async (body: Record<string, unknown>) => {
    setBusy(true);
    setError(null);
    setOk(null);
    try {
      const res = await fetch("/api/org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Request failed");
        return null;
      }
      if (json.members) setMembers(json.members);
      if (json.plan) setPlan(json.plan);
      if (json.orgName) setOrgName(json.orgName);
      return json;
    } catch {
      setError("Network error");
      return null;
    } finally {
      setBusy(false);
    }
  };

  if (plan === "individual") {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Team Portal</h1>
          <p className="text-slate-400 mt-1">
            Manage your team&apos;s training and track progress.
          </p>
        </div>

        <div className="glass-card p-10 text-center border border-violet-500/20">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Team plan required</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Invite learners, assign role matrices, and track completions from one
            dashboard. Contact sales for a facility quote, or enable a sandbox team
            workspace to try the roster tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              disabled={busy}
              onClick={() => void run({ action: "bootstrap-org", name: "My Facility Team" })}
              className="btn-outline inline-flex items-center gap-2"
            >
              Enable team sandbox
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          {ok && <p className="text-green-400 text-sm mt-4">{ok}</p>}
        </div>
      </div>
    );
  }

  const toggleCourse = (slug: string) => {
    setSelectedCourses((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="space-y-10">
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Team Members", value: members.length, icon: Users },
          { label: "Courses Assigned", value: orgCourses.length, icon: BookOpen },
          { label: "Completions", value: totalCompletions, icon: CheckCircle },
          {
            label: "Pending",
            value: Math.max(0, members.reduce((s, m) => s + m.courses.length, 0) - totalCompletions),
            icon: Clock,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass-card p-4 text-center">
            <Icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Team Members</h2>
          {orgRole === "admin" && (
            <button
              onClick={() => setShowInvite((v) => !v)}
              className="btn-outline text-sm py-2 inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Invite Member
            </button>
          )}
        </div>

        {showInvite && orgRole === "admin" && (
          <div className="glass-card p-5 mb-5 space-y-3">
            <h3 className="text-white font-semibold">Invite a learner</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Full name"
                className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
              />
              <input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="work@email.com"
                type="email"
                className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
              />
              <select
                value={inviteRoleId}
                onChange={(e) => setInviteRoleId(e.target.value)}
                className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm sm:col-span-2"
              >
                {roleMatrices.map((role) => (
                  <option key={role.id} value={role.id}>
                    Role pack: {role.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={busy || !inviteName || !inviteEmail}
              onClick={async () => {
                const json = await run({
                  action: "invite",
                  name: inviteName,
                  email: inviteEmail,
                  workforceRoleId: inviteRoleId,
                });
                if (json) {
                  setOk(
                    json.emailSent
                      ? `Invited ${inviteName}. Email sent.`
                      : `Invited ${inviteName}. Email not sent (${json.emailError ?? "SMTP off"}) — share /accept-invite?token=${json.inviteToken}`
                  );
                  setInviteName("");
                  setInviteEmail("");
                  setShowInvite(false);
                }
              }}
              className="btn-primary text-sm py-2"
            >
              Send invite + assign role courses
            </button>
          </div>
        )}

        {members.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Users className="w-10 h-10 text-slate-600 mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white mb-2">No team members yet</h3>
            <p className="text-slate-400 text-sm mb-5 max-w-sm mx-auto">
              Invite colleagues to track training progress from this dashboard.
            </p>
            <button
              onClick={() => setShowInvite(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
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
                    Role
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Enrolled
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
                  const roleTitle =
                    roleMatrices.find((r) => r.id === member.workforceRoleId)?.title ?? "—";
                  return (
                    <tr
                      key={member.email}
                      className={
                        i < members.length - 1
                          ? "border-b border-[rgba(255,255,255,0.04)]"
                          : ""
                      }
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-slate-500 text-xs">{member.email}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-400 hidden sm:table-cell text-xs">
                        {roleTitle}
                      </td>
                      <td className="px-5 py-4 text-slate-400 hidden md:table-cell">
                        {enrolled}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            member.status === "invited"
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/20"
                              : pct === 100
                                ? "bg-green-500/15 text-green-400 border-green-500/20"
                                : pct > 0
                                  ? "bg-violet-500/15 text-violet-400 border-violet-500/20"
                                  : "bg-slate-500/15 text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {member.status === "invited"
                            ? "Invited"
                            : pct === 100
                              ? "Complete"
                              : pct > 0
                                ? `${pct}%`
                                : "Not started"}
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

      {orgRole === "admin" && (
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Assign Courses</h2>
          <div className="glass-card p-6 border border-violet-500/15 space-y-4">
            <p className="text-slate-400 text-sm">
              Assign flat-fee programs to a roster member. If they already have a
              NyxPulse account with that email, enrollment is applied immediately.
            </p>
            <select
              value={assignEmail}
              onChange={(e) => setAssignEmail(e.target.value)}
              className="w-full max-w-md rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            >
              <option value="">Select member…</option>
              {members.map((m) => (
                <option key={m.email} value={m.email}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catalog.map((course) => {
                const active = selectedCourses.includes(course.slug);
                return (
                  <button
                    type="button"
                    key={course.slug}
                    onClick={() => toggleCourse(course.slug)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                      active
                        ? "border-violet-400/50 bg-violet-500/10"
                        : "border-[rgba(255,255,255,0.06)] hover:border-violet-500/30"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{course.icon}</span>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium truncate">
                        {course.shortTitle}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {course.price ? `$${course.price} flat fee` : "Contact us"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              disabled={busy || !assignEmail || selectedCourses.length === 0}
              onClick={async () => {
                const json = await run({
                  action: "assign",
                  memberEmail: assignEmail,
                  courseSlugs: selectedCourses,
                });
                if (json) {
                  setOk(`Assigned ${selectedCourses.length} course(s) to ${assignEmail}.`);
                  setSelectedCourses([]);
                }
              }}
              className="btn-primary text-sm py-2"
            >
              Assign selected courses
            </button>
            <Link href="/dashboard/drills" className="text-sm text-cyan-300 hover:text-white block">
              Run a facility drill with this team →
            </Link>
          </div>
        </section>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {ok && <p className="text-green-400 text-sm">{ok}</p>}
    </div>
  );
}
