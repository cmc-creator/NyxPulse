"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardCheck, Shield } from "lucide-react";
import type { SkillSheet, SkillSignoff } from "@/lib/skills/sheets";

type Payload = {
  sheets: SkillSheet[];
  signoffs: SkillSignoff[];
  recent: SkillSignoff[];
  isInstructor: boolean;
  pinConfigured: boolean;
};

export default function InstructorPortalPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [courseSlug, setCourseSlug] = useState("cpr-aed");
  const [learnerName, setLearnerName] = useState("");
  const [learnerUserId, setLearnerUserId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [pin, setPin] = useState("");
  const [notes, setNotes] = useState("");
  const [skillIds, setSkillIds] = useState<string[]>([]);

  const load = async () => {
    const res = await fetch("/api/skills");
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to load");
    setData(json);
    if (json.sheets?.[0]?.courseSlug) setCourseSlug(json.sheets[0].courseSlug);
  };

  useEffect(() => {
    void (async () => {
      try {
        await load();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load instructor portal.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sheet = useMemo(
    () => data?.sheets.find((s) => s.courseSlug === courseSlug) ?? null,
    [data, courseSlug]
  );

  useEffect(() => {
    setSkillIds(sheet?.skills.map((s) => s.id) ?? []);
  }, [sheet]);

  const toggleSkill = (id: string) => {
    setSkillIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const submit = async () => {
    setSaving(true);
    setError(null);
    setOk(null);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          learnerName,
          learnerUserId: learnerUserId.trim() || undefined,
          instructorName: instructorName.trim() || undefined,
          skillIds,
          notes: notes.trim() || undefined,
          pin: pin || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Sign-off failed");
        return;
      }
      setOk(`Signed off ${json.signoff.learnerName} on ${courseSlug}.`);
      setLearnerName("");
      setNotes("");
      await load();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-400">Loading instructor portal…</p>;
  if (!data) return <p className="text-red-400">{error ?? "Unavailable"}</p>;

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">
          <ClipboardCheck className="w-3.5 h-3.5" />
          NyxPulse Advantage
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Instructor Skill Sign-off</h1>
        <p className="text-slate-400 mt-1 max-w-2xl">
          Record observed skills for CPR/AED, BLS, First Aid, and bleeding control. This is
          NyxPulse skills evidence — Red Cross cards still require authorized reporting when
          applicable.
        </p>
      </div>

      <div className="glass-card p-4 flex items-start gap-3 text-sm">
        <Shield className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
        <div className="text-slate-400 space-y-1">
          <p>
            {data.isInstructor
              ? "You are recognized as an instructor on this account."
              : data.pinConfigured
                ? "Enter the facility instructor PIN to authorize a sign-off, or use an approved instructor account."
                                : "Production setup needed: set NYXPULSE_INSTRUCTOR_EMAILS and/or NYXPULSE_INSTRUCTOR_PIN in Vercel, mark the learner profile with instructor=true, or grant Firebase custom claims { admin: true }."}
          </p>
          <p className="text-xs text-slate-500">
            Check <code className="text-slate-400">/api/health</code> → <code className="text-slate-400">instructorReady</code> after deploying env vars.
          </p>
        </div>
      </div>

      <section className="glass-card p-5 space-y-4">
        <h2 className="text-white font-semibold">New sign-off</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="text-slate-400">Skill sheet</span>
            <select
              value={courseSlug}
              onChange={(e) => setCourseSlug(e.target.value)}
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            >
              {data.sheets.map((s) => (
                <option key={s.courseSlug} value={s.courseSlug}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-slate-400">Learner display name</span>
            <input
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
              placeholder="Alex Rivera"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-400">Learner user id (optional)</span>
            <input
              value={learnerUserId}
              onChange={(e) => setLearnerUserId(e.target.value)}
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
              placeholder="Defaults to your account if blank"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-400">Instructor name (optional)</span>
            <input
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
            />
          </label>
          {!data.isInstructor && data.pinConfigured && (
            <label className="block text-sm sm:col-span-2">
              <span className="text-slate-400">Instructor PIN</span>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-1 w-full max-w-xs rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
              />
            </label>
          )}
        </div>

        {sheet && (
          <div className="space-y-2">
            <div className="text-sm text-slate-300">Skills observed</div>
            {sheet.skills.map((skill) => (
              <label
                key={skill.id}
                className="flex items-start gap-3 text-sm text-slate-300 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={skillIds.includes(skill.id)}
                  onChange={() => toggleSkill(skill.id)}
                  className="mt-1"
                />
                <span>
                  <span className="text-white">{skill.label}</span>
                  <span className="block text-xs text-slate-500">{skill.evidence}</span>
                </span>
              </label>
            ))}
          </div>
        )}

        <label className="block text-sm">
          <span className="text-slate-400">Notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm"
          />
        </label>

        <button
          disabled={saving || !learnerName.trim() || skillIds.length === 0}
          onClick={() => void submit()}
          className="btn-primary text-sm py-2"
        >
          {saving ? "Saving…" : "Record skill sign-off"}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {ok && <p className="text-green-400 text-sm">{ok}</p>}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Your skill records</h2>
        {data.signoffs.length === 0 ? (
          <div className="glass-card p-6 text-sm text-slate-400">No sign-offs on this account yet.</div>
        ) : (
          data.signoffs.map((s) => (
            <div key={s.id} className="glass-card p-4 text-sm">
              <div className="text-white font-medium">
                {s.courseSlug} · {s.learnerName}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Signed by {s.instructorName} · {new Date(s.signedAt).toLocaleString()} ·{" "}
                {s.skillIds.length} skills
              </div>
            </div>
          ))
        )}
      </section>

      {data.isInstructor && data.recent.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Recent facility sign-offs</h2>
          {data.recent.map((s) => (
            <div key={s.id} className="glass-card p-4 text-sm text-slate-400">
              {s.learnerName} · {s.courseSlug} · {s.instructorName}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
