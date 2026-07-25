"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Radio, Timer, ArrowRight, Play } from "lucide-react";
import type { DrillRecord } from "@/lib/drills/types";
import type { DrillTemplate } from "@/lib/drills/types";

export default function DrillsPage() {
  const [templates, setTemplates] = useState<DrillTemplate[]>([]);
  const [drills, setDrills] = useState<DrillRecord[]>([]);
  const [facilityName, setFacilityName] = useState("");
  const [startingId, setStartingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch("/api/drills");
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to load drills");
    setTemplates(json.templates ?? []);
    setDrills(json.drills ?? []);
  };

  useEffect(() => {
    void (async () => {
      try {
        await load();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load drills.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const start = async (templateId: string) => {
    setError(null);
    if (!facilityName.trim()) {
      setError("Enter your facility / unit name before starting a drill.");
      return;
    }
    setStartingId(templateId);
    try {
      const res = await fetch("/api/drills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, facilityName: facilityName.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not start drill.");
        return;
      }
      window.location.href = `/dashboard/drills/${json.drill.id}`;
    } catch {
      setError("Network error starting drill.");
    } finally {
      setStartingId(null);
    }
  };

  if (loading) return <p className="text-slate-400">Loading Facility Drill Mode…</p>;

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">
          <Radio className="w-3.5 h-3.5" />
          NyxPulse Advantage
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Facility Drill Mode</h1>
        <p className="text-slate-400 mt-1 max-w-2xl">
          Run timed team drills with injects, role missions, and after-action reports — practice
          that sticks beyond e-learning checkboxes.
        </p>
      </div>

      <div className="glass-card p-5">
        <label className="block text-sm text-slate-300 mb-2">Facility / unit name</label>
        <input
          value={facilityName}
          onChange={(e) => setFacilityName(e.target.value)}
          placeholder="e.g. Memorial ED Pod B"
          className="w-full max-w-md rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white text-sm outline-none focus:border-violet-400/50"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Drill templates</h2>
        {templates.map((template) => (
          <div key={template.id} className="glass-card p-5 flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-white font-semibold">{template.title}</h3>
                <span className="text-[10px] uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                  {template.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Timer className="w-3.5 h-3.5" />
                  {template.durationMinutes} min
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{template.summary}</p>
              <ul className="mt-2 text-xs text-slate-500 space-y-0.5">
                {template.objectives.slice(0, 2).map((o) => (
                  <li key={o}>• {o}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => void start(template.id)}
              disabled={startingId === template.id}
              className="btn-primary text-sm py-2 inline-flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              {startingId === template.id ? "Starting…" : "Start drill"}
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Your recent drills</h2>
        {drills.length === 0 ? (
          <div className="glass-card p-8 text-center text-slate-400 text-sm">
            No drills yet. Start one above when your team is ready.
          </div>
        ) : (
          drills.map((drill) => (
            <Link
              key={drill.id}
              href={`/dashboard/drills/${drill.id}`}
              className="glass-card p-4 flex items-center justify-between gap-3 hover:border-violet-500/30 transition-colors"
            >
              <div>
                <div className="text-white font-medium">{drill.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {drill.facilityName} · {drill.status} ·{" "}
                  {new Date(drill.startedAt).toLocaleString()}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
