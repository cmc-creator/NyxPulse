"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Radio, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import type { DrillRecord, DrillTemplate } from "@/lib/drills/types";

export default function DrillRunnerPage() {
  const params = useParams<{ id: string }>();
  const [drill, setDrill] = useState<DrillRecord | null>(null);
  const [template, setTemplate] = useState<DrillTemplate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [whatWentWell, setWhatWentWell] = useState("");
  const [gaps, setGaps] = useState("");
  const [actions, setActions] = useState("");
  const [score, setScore] = useState(70);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch(`/api/drills/${params.id}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to load");
    setDrill(json.drill);
    setTemplate(json.template);
  };

  useEffect(() => {
    void (async () => {
      try {
        await load();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load drill.");
      }
    })();
  }, [params.id]);

  useEffect(() => {
    if (!drill || drill.status !== "active") return;
    const started = new Date(drill.startedAt).getTime();
    const tick = () => setElapsed(Math.floor((Date.now() - started) / 1000));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [drill]);

  const activeInjects = useMemo(() => {
    if (!template) return [];
    return template.injects.filter((inj) => elapsed >= inj.atSecond);
  }, [template, elapsed]);

  const patch = async (body: Record<string, unknown>) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/drills/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Update failed");
        return;
      }
      setDrill(json.drill);
      setNote("");
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (!drill && !error) {
    return <p className="text-slate-400">Loading drill…</p>;
  }
  if (!drill) {
    return (
      <div className="space-y-4">
        <p className="text-red-400">{error}</p>
        <Link href="/dashboard/drills" className="text-violet-300 text-sm">
          ← Back to drills
        </Link>
      </div>
    );
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <Link href="/dashboard/drills" className="text-xs text-violet-300 hover:text-white">
            ← All drills
          </Link>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mt-2 mb-1">
            <Radio className="w-3.5 h-3.5" />
            Live drill
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{drill.title}</h1>
          <p className="text-slate-400 text-sm mt-1">
            {drill.facilityName} · {drill.status}
          </p>
        </div>
        <div className="glass-card px-5 py-4 text-center min-w-[140px]">
          <div className="flex items-center justify-center gap-2 text-3xl font-display font-bold text-white">
            <Clock className="w-5 h-5 text-amber-300" />
            {mm}:{ss}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500 mt-1">
            elapsed
          </div>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {template && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="glass-card p-5 space-y-3">
            <h2 className="text-white font-semibold">Role missions</h2>
            {template.roles.map((role) => (
              <div key={role.id} className="border-t border-white/5 pt-3 first:border-0 first:pt-0">
                <div className="text-sm text-cyan-300 font-medium">{role.label}</div>
                <p className="text-xs text-slate-400 mt-0.5">{role.mission}</p>
              </div>
            ))}
          </section>

          <section className="glass-card p-5 space-y-3">
            <h2 className="text-white font-semibold">Injects fired</h2>
            {activeInjects.length === 0 ? (
              <p className="text-sm text-slate-500">Waiting for first inject…</p>
            ) : (
              activeInjects.map((inj) => (
                <div
                  key={`${inj.atSecond}-${inj.title}`}
                  className="rounded-xl border border-amber-400/25 bg-amber-500/5 p-3"
                >
                  <div className="flex items-center gap-2 text-amber-200 text-sm font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    T+{inj.atSecond}s — {inj.title}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{inj.detail}</p>
                </div>
              ))
            )}
          </section>
        </div>
      )}

      {drill.status === "active" && (
        <section className="glass-card p-5 space-y-3">
          <h2 className="text-white font-semibold">Timeline notes</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. AED pads on at 1:42"
              className="flex-1 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm outline-none focus:border-violet-400/50"
            />
            <button
              disabled={saving || !note.trim()}
              onClick={() => void patch({ action: "timeline", note })}
              className="btn-outline text-sm py-2"
            >
              Add note
            </button>
          </div>
          <ul className="space-y-2 text-sm">
            {[...drill.timeline].reverse().map((item, idx) => (
              <li key={`${item.at}-${idx}`} className="text-slate-400">
                <span className="text-slate-500 text-xs">
                  {new Date(item.at).toLocaleTimeString()}
                </span>{" "}
                {item.note}
              </li>
            ))}
          </ul>
        </section>
      )}

      {drill.status === "active" && (
        <section className="glass-card p-5 space-y-4">
          <h2 className="text-white font-semibold">After-action report</h2>
          {template && (
            <ul className="text-xs text-slate-500 space-y-1">
              {template.afterActionPrompts.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          )}
          <textarea
            value={whatWentWell}
            onChange={(e) => setWhatWentWell(e.target.value)}
            placeholder="What went well"
            rows={2}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm outline-none focus:border-violet-400/50"
          />
          <textarea
            value={gaps}
            onChange={(e) => setGaps(e.target.value)}
            placeholder="Gaps / friction"
            rows={2}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm outline-none focus:border-violet-400/50"
          />
          <textarea
            value={actions}
            onChange={(e) => setActions(e.target.value)}
            placeholder="Actions before next drill"
            rows={2}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm outline-none focus:border-violet-400/50"
          />
          <div>
            <label className="text-sm text-slate-300">Team readiness score: {score}</label>
            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              disabled={saving || !whatWentWell || !gaps || !actions}
              onClick={() =>
                void patch({
                  action: "complete",
                  afterAction: { whatWentWell, gaps, actions, score },
                })
              }
              className="btn-primary text-sm py-2 inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Complete after-action
            </button>
            <button
              disabled={saving}
              onClick={() => void patch({ action: "abort" })}
              className="btn-outline text-sm py-2"
            >
              Abort drill
            </button>
          </div>
        </section>
      )}

      {drill.status !== "active" && drill.afterAction && (
        <section className="glass-card p-5 space-y-3">
          <h2 className="text-white font-semibold">After-action summary</h2>
          <div className="text-3xl font-display font-bold gradient-text">
            {drill.afterAction.score}
          </div>
          <p className="text-sm text-slate-300">
            <span className="text-slate-500">Went well:</span> {drill.afterAction.whatWentWell}
          </p>
          <p className="text-sm text-slate-300">
            <span className="text-slate-500">Gaps:</span> {drill.afterAction.gaps}
          </p>
          <p className="text-sm text-slate-300">
            <span className="text-slate-500">Actions:</span> {drill.afterAction.actions}
          </p>
        </section>
      )}
    </div>
  );
}
