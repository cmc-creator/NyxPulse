"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, CheckCircle2, CircleDashed } from "lucide-react";
import type { RoleMatrix } from "@/lib/roles/matrices";
import type { RoleGapAnalysis } from "@/lib/roles/gap";

type Payload = {
  roles: RoleMatrix[];
  selectedRoleId: string;
  analysis: RoleGapAnalysis | null;
};

export default function RolesPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async (roleId?: string) => {
    const qs = roleId ? `?roleId=${encodeURIComponent(roleId)}` : "";
    const res = await fetch(`/api/roles${qs}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to load");
    setData(json);
  };

  useEffect(() => {
    void (async () => {
      try {
        await load();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load roles.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const selectRole = async (roleId: string) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not save role");
        return;
      }
      await load(roleId);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-400">Loading role readiness…</p>;
  if (!data) return <p className="text-red-400">{error ?? "Unavailable"}</p>;

  const analysis = data.analysis;

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">
          <Users className="w-3.5 h-3.5" />
          NyxPulse Advantage
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Role Readiness Matrices</h1>
        <p className="text-slate-400 mt-1 max-w-2xl">
          Pick your workforce role. NyxPulse maps required trainings, Advantage Gates, and skill
          sheets — then shows exactly what’s missing.
        </p>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {data.roles.map((role) => {
          const active = role.id === data.selectedRoleId;
          return (
            <button
              key={role.id}
              disabled={saving}
              onClick={() => void selectRole(role.id)}
              className={`text-left glass-card p-4 transition-all ${
                active
                  ? "border-violet-400/50 bg-violet-500/10"
                  : "hover:border-violet-500/30"
              }`}
            >
              <div className="text-sm font-semibold text-white">{role.title}</div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{role.summary}</p>
            </button>
          );
        })}
      </div>

      {analysis && (
        <>
          <div className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <h2 className="text-white font-semibold">{analysis.role.title}</h2>
              <p className="text-sm text-slate-400 mt-1">
                Required ready {analysis.requiredReady}/{analysis.requiredTotal}
                {analysis.missingRequired.length > 0 && (
                  <> · Missing: {analysis.missingRequired.join(", ")}</>
                )}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold gradient-text">
                {analysis.readinessPercent}%
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                role readiness
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.courses.map((course) => (
              <div
                key={`${course.tier}-${course.slug}`}
                className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="text-2xl">{course.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-white font-medium">{course.shortTitle}</h3>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        course.tier === "required"
                          ? "text-amber-200 bg-amber-500/10 border-amber-400/30"
                          : "text-slate-300 bg-white/5 border-white/10"
                      }`}
                    >
                      {course.tier}
                    </span>
                    {course.ready ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-300">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400">
                        <CircleDashed className="w-3 h-3" /> Gap
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-3">
                    <span>{course.enrolled ? "Enrolled" : "Not enrolled"}</span>
                    <span>{course.completed ? "Certified" : "Not certified"}</span>
                    <span>
                      Gates {course.gatesPassed}/{course.gatesRequired}
                    </span>
                    {course.skillsSheet && (
                      <span>
                        Skills {course.skillsSigned ? "signed" : "unsigned"}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={
                    course.enrolled
                      ? `/dashboard/courses/${course.slug}`
                      : `/courses/${course.slug}`
                  }
                  className="btn-outline text-sm py-2"
                >
                  {course.enrolled ? "Open course" : "Enroll"}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
