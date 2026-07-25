"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Fingerprint, Copy, CheckCircle2, ExternalLink, Swords, RefreshCw } from "lucide-react";

type PassportPayload = {
  recipientName: string;
  readiness: number;
  rows: Array<{
    slug: string;
    title: string;
    shortTitle: string;
    icon: string;
    completed: boolean;
    certificateId?: string;
    gatesRequired: number;
    gatesPassed: number;
    averageGateScore: number | null;
    americanRedCrossPathway: boolean;
    skillsSessionRecommended: boolean;
  }>;
  refreshers?: Array<{
    courseSlug: string;
    shortTitle: string;
    icon: string;
    daysRemaining: number;
    status: "ok" | "due-soon" | "overdue" | "completed-recently";
    dueAt: string;
  }>;
  skillSignoffs?: Array<{
    courseSlug: string;
    signedAt: string;
    instructorName: string;
    skillCount: number;
  }>;
};

export default function PassportPage() {
  const [data, setData] = useState<PassportPayload | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/passport");
        const json = await res.json();
        if (!res.ok) {
          setError(json.error ?? "Could not load passport.");
          return;
        }
        setData(json);
      } catch {
        setError("Network error loading passport.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const createShare = async () => {
    setError(null);
    try {
      const res = await fetch("/api/passport/share", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not create share link.");
        return;
      }
      setShareUrl(json.url);
    } catch {
      setError("Network error creating share link.");
    }
  };

  const copy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return <p className="text-slate-400">Loading Skills Passport…</p>;
  }

  if (!data) {
    return <p className="text-red-400">{error ?? "Passport unavailable."}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">
            <Fingerprint className="w-3.5 h-3.5" />
            NyxPulse Advantage
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Skills Passport</h1>
          <p className="text-slate-400 mt-1 max-w-2xl">
            Your employer-ready readiness profile: completed trainings, Advantage Gate scores,
            and optional Red Cross skills pathways — shareable in one link.
          </p>
        </div>
        <div className="glass-card px-5 py-4 text-center">
          <div className="text-3xl font-display font-bold gradient-text">{data.readiness}</div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
            readiness score
          </div>
        </div>
      </div>

      <div className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-white font-semibold">Employer share pack</h2>
          <p className="text-sm text-slate-400 mt-1">
            Generate a public verification page hiring managers can open without logging in.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={createShare} className="btn-primary text-sm py-2">
            Generate share link
          </button>
          {shareUrl && (
            <button onClick={copy} className="btn-outline text-sm py-2 inline-flex items-center gap-2">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy link"}
            </button>
          )}
        </div>
      </div>
      {shareUrl && (
        <p className="text-xs text-cyan-300 break-all">
          <a href={shareUrl} className="underline hover:text-white" target="_blank" rel="noreferrer">
            {shareUrl}
          </a>
        </p>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {data.refreshers && data.refreshers.some((r) => r.status === "due-soon" || r.status === "overdue") && (
        <div className="glass-card p-5 border border-amber-400/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-amber-200 font-semibold">
            <RefreshCw className="w-4 h-4" />
            Spaced refresher challenges
          </div>
          <p className="text-sm text-slate-400">
            Re-clear Advantage Gates to keep readiness current (90-day window).
          </p>
          <div className="space-y-2">
            {data.refreshers
              .filter((r) => r.status === "due-soon" || r.status === "overdue")
              .map((r) => (
                <div
                  key={r.courseSlug}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                >
                  <span className="text-white">
                    {r.icon} {r.shortTitle}{" "}
                    <span
                      className={
                        r.status === "overdue" ? "text-red-300" : "text-amber-200"
                      }
                    >
                      {r.status === "overdue"
                        ? `${Math.abs(r.daysRemaining)}d overdue`
                        : `due in ${r.daysRemaining}d`}
                    </span>
                  </span>
                  <Link
                    href={`/dashboard/courses/${r.courseSlug}`}
                    className="btn-outline text-xs py-1.5"
                  >
                    Re-clear gates
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {data.rows.length === 0 ? (
          <div className="glass-card p-8 text-center text-slate-400">
            Enroll in a training to start building your passport.{" "}
            <Link href="/courses" className="text-violet-300 hover:text-white">
              Browse courses
            </Link>
          </div>
        ) : (
          data.rows.map((row) => (
            <div key={row.slug} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-3xl">{row.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-white font-semibold">{row.shortTitle}</h3>
                  {row.completed ? (
                    <span className="text-[10px] uppercase tracking-wider text-green-300 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full">
                      Certified
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-amber-200 bg-amber-500/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      In progress
                    </span>
                  )}
                  {row.americanRedCrossPathway && (
                    <span className="text-[10px] uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 px-2 py-0.5 rounded-full">
                      ARC pathway
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 mt-1 truncate">{row.title}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Swords className="w-3.5 h-3.5 text-amber-300" />
                    Gates {row.gatesPassed}/{row.gatesRequired}
                  </span>
                  {row.averageGateScore !== null && <span>Avg gate {row.averageGateScore}%</span>}
                  {row.certificateId && (
                    <Link
                      href={`/verify/${encodeURIComponent(row.certificateId)}`}
                      className="inline-flex items-center gap-1 text-violet-300 hover:text-white"
                    >
                      Verify cert <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
              <Link href={`/dashboard/courses/${row.slug}`} className="btn-outline text-sm py-2">
                Open course
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
