"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Course } from "@/lib/courses";
import { getTopicKey } from "@/lib/course-progress";
import {
  CheckCircle,
  Circle,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  Loader2,
} from "lucide-react";

interface CoursePlayerClientProps {
  course: Course;
  initialCompletedTopics: string[];
  isCompleted: boolean;
}

export default function CoursePlayerClient({
  course,
  initialCompletedTopics,
  isCompleted: initialIsCompleted,
}: CoursePlayerClientProps) {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    () => new Set(initialCompletedTopics)
  );
  const [activeModule, setActiveModule] = useState(0);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [claiming, setClaiming] = useState(false);
  const [saving, setSaving] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestTopics = useRef<string[]>(initialCompletedTopics);

  useEffect(() => {
    latestTopics.current = Array.from(completedTopics);
  }, [completedTopics]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const totalTopics = course.modules.reduce(
    (acc, m) => acc + m.topics.length,
    0
  );
  const progress =
    totalTopics > 0
      ? Math.round((completedTopics.size / totalTopics) * 100)
      : 0;

  const persistProgress = async (topics: string[]) => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/courses/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: course.slug,
          completedTopics: topics,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error ?? "Could not save progress.");
        return false;
      }
      return true;
    } catch {
      setSaveError("Network error while saving progress.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const schedulePersist = (topics: string[]) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void persistProgress(topics);
    }, 350);
  };

  const claimCertificate = async () => {
    setClaiming(true);
    setClaimError(null);

    const saved = await persistProgress(Array.from(completedTopics));
    if (!saved) {
      setClaimError("Save your progress before claiming a certificate.");
      setClaiming(false);
      return;
    }

    try {
      const res = await fetch("/api/courses/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: course.slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setClaimError(data.error ?? "Something went wrong.");
        return;
      }
      setIsCompleted(true);
    } catch {
      setClaimError("Network error. Please try again.");
    } finally {
      setClaiming(false);
    }
  };

  const toggleTopic = (moduleIdx: number, topicIdx: number) => {
    if (isCompleted) return;

    const key = getTopicKey(moduleIdx, topicIdx);
    const updated = new Set(completedTopics);
    if (updated.has(key)) {
      updated.delete(key);
    } else {
      updated.add(key);
    }
    const topics = Array.from(updated);
    setCompletedTopics(updated);
    latestTopics.current = topics;
    schedulePersist(topics);
  };

  const isModuleComplete = (moduleIdx: number) =>
    course.modules[moduleIdx].topics.every((_, ti) =>
      completedTopics.has(getTopicKey(moduleIdx, ti))
    );

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Courses
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{course.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{course.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {course.modules.length} modules
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Your Progress</span>
          <span className="text-sm text-violet-300 font-semibold">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>
            {completedTopics.size} / {totalTopics} topics completed
            {saving ? " · Saving…" : ""}
          </span>
          {progress === 100 && (
            <span className="text-green-400 font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Ready to claim
            </span>
          )}
        </div>
        {saveError && <p className="text-red-400 text-xs mt-2">{saveError}</p>}

        {progress === 100 && (
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center gap-3">
            {isCompleted ? (
              <Link
                href="/dashboard/certificates"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Award className="w-4 h-4" />
                View Your Certificate
              </Link>
            ) : (
              <>
                <button
                  onClick={claimCertificate}
                  disabled={claiming || saving}
                  className="btn-primary inline-flex items-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {claiming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Claiming…
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      Claim Certificate
                    </>
                  )}
                </button>
                <span className="text-xs text-slate-500">
                  You have completed all modules — claim your certificate.
                </span>
              </>
            )}
            {claimError && <p className="text-red-400 text-xs">{claimError}</p>}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
            Modules
          </h2>
          {course.modules.map((mod, mi) => (
            <button
              key={mi}
              onClick={() => setActiveModule(mi)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 ${
                activeModule === mi
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "glass-card text-slate-300 hover:text-white hover:border-violet-500/20"
              }`}
            >
              {isModuleComplete(mi) ? (
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-600 flex-shrink-0" />
              )}
              <span className="flex-1 min-w-0 truncate">{mod.title}</span>
              <ChevronRight
                className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                  activeModule === mi ? "rotate-90" : ""
                }`}
              />
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-1">
              Module {activeModule + 1}: {course.modules[activeModule].title}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Check off topics as you work through this module. Progress is saved to your account.
            </p>

            <div className="space-y-3">
              {course.modules[activeModule].topics.map((topic, ti) => {
                const key = getTopicKey(activeModule, ti);
                const done = completedTopics.has(key);
                return (
                  <button
                    key={ti}
                    onClick={() => toggleTopic(activeModule, ti)}
                    disabled={isCompleted}
                    className={`w-full flex items-start gap-3 text-left px-4 py-3 rounded-xl transition-all border disabled:cursor-default ${
                      done
                        ? "bg-green-500/10 border-green-500/25 text-green-300"
                        : "border-[rgba(255,255,255,0.06)] hover:border-violet-500/30 text-slate-300 hover:text-white"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${done ? "line-through opacity-70" : ""}`}>
                      {topic}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-8 pt-5 border-t border-[rgba(255,255,255,0.06)]">
              <button
                onClick={() => setActiveModule((p) => Math.max(0, p - 1))}
                disabled={activeModule === 0}
                className="btn-outline text-sm py-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              {activeModule < course.modules.length - 1 ? (
                <button
                  onClick={() => setActiveModule((p) => p + 1)}
                  className="btn-primary text-sm py-2"
                >
                  Next Module →
                </button>
              ) : (
                <Link href="/dashboard/courses" className="btn-primary text-sm py-2">
                  Finish &amp; Return →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Learning Outcomes
        </h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {course.outcomes.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
