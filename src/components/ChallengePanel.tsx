"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Lock, RotateCcw, Swords, Trophy } from "lucide-react";
import type { ChallengeAttemptResult, CourseChallenge } from "@/lib/challenges/types";

type Props = {
  courseSlug: string;
  challenges: CourseChallenge[];
  initialResults: Record<string, ChallengeAttemptResult>;
  disabled?: boolean;
  onResultsChange?: (results: Record<string, ChallengeAttemptResult>) => void;
};

export default function ChallengePanel({
  courseSlug,
  challenges,
  initialResults,
  disabled,
  onResultsChange,
}: Props) {
  const [results, setResults] = useState(initialResults);
  const [activeId, setActiveId] = useState(challenges[0]?.id ?? "");
  const active = challenges.find((c) => c.id === activeId) ?? challenges[0];

  const passedCount = useMemo(
    () => challenges.filter((c) => results[c.id]?.passed).length,
    [challenges, results]
  );

  if (!active) return null;

  return (
    <div className="glass-card p-6 space-y-5 border border-amber-400/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">
            <Swords className="w-3.5 h-3.5" />
            NyxPulse Advantage Gates
          </div>
          <h3 className="text-white font-bold text-lg">Prove readiness — not just attendance</h3>
          <p className="text-sm text-slate-400 mt-1">
            Pass scenario judgment calls and mastery gates before claiming your certificate.
            {` ${passedCount}/${challenges.length} gates cleared.`}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold gradient-text">
            {passedCount}/{challenges.length}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500">cleared</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {challenges.map((challenge) => {
          const passed = Boolean(results[challenge.id]?.passed);
          return (
            <button
              key={challenge.id}
              onClick={() => setActiveId(challenge.id)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                activeId === challenge.id
                  ? "border-amber-400/50 bg-amber-400/10 text-amber-100"
                  : passed
                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                    : "border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {passed ? "✓ " : ""}
              {challenge.title}
            </button>
          );
        })}
      </div>

      {active.kind === "scenario" ? (
        <ScenarioRunner
          courseSlug={courseSlug}
          challenge={active}
          existing={results[active.id]}
          disabled={disabled}
          onComplete={(result, all) => {
            setResults(all);
            onResultsChange?.(all);
          }}
        />
      ) : (
        <QuizRunner
          courseSlug={courseSlug}
          challenge={active}
          existing={results[active.id]}
          disabled={disabled}
          onComplete={(result, all) => {
            setResults(all);
            onResultsChange?.(all);
          }}
        />
      )}
    </div>
  );
}

function ScenarioRunner({
  courseSlug,
  challenge,
  existing,
  disabled,
  onComplete,
}: {
  courseSlug: string;
  challenge: CourseChallenge;
  existing?: ChallengeAttemptResult;
  disabled?: boolean;
  onComplete: (
    result: ChallengeAttemptResult,
    all: Record<string, ChallengeAttemptResult>
  ) => void;
}) {
  const nodes = challenge.scenario?.nodes ?? [];
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const [nodeId, setNodeId] = useState(challenge.scenario?.startNodeId ?? "");
  const [path, setPath] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(Boolean(existing?.passed));
  const [scoreLabel, setScoreLabel] = useState<string | null>(
    existing ? `${existing.score}% ${existing.passed ? "· passed" : "· retry needed"}` : null
  );
  const [submitting, setSubmitting] = useState(false);

  const node = byId.get(nodeId);

  const reset = () => {
    setNodeId(challenge.scenario?.startNodeId ?? "");
    setPath([]);
    setFeedback(null);
    setFinished(false);
    setScoreLabel(null);
  };

  const pick = async (choiceId: string, choiceFeedback: string, next: string | null | undefined) => {
    if (disabled || submitting || finished) return;
    const nextPath = [...path, choiceId];
    setPath(nextPath);
    setFeedback(choiceFeedback);

    if (next) {
      setNodeId(next);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/courses/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          challengeId: challenge.id,
          choicePath: nextPath,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error ?? "Could not score scenario.");
        return;
      }
      setFinished(true);
      setScoreLabel(`${data.score}% ${data.passed ? "· passed" : "· retry needed"}`);
      onComplete(data.results.results[challenge.id], data.results.results);
    } catch {
      setFeedback("Network error scoring scenario.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-4">
      <div>
        <h4 className="text-white font-semibold">{challenge.title}</h4>
        <p className="text-sm text-slate-400 mt-1">{challenge.brief}</p>
      </div>

      {existing?.passed && finished && (
        <div className="inline-flex items-center gap-2 text-xs text-green-300 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
          <Trophy className="w-3.5 h-3.5" /> Gate cleared · best {existing.score}%
        </div>
      )}

      {!finished && node && (
        <>
          {node.context && (
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{node.context}</p>
          )}
          <p className="text-slate-100 text-sm leading-relaxed">{node.prompt}</p>
          <div className="space-y-2">
            {node.choices.map((choice) => (
              <button
                key={choice.id}
                disabled={disabled || submitting}
                onClick={() => pick(choice.id, choice.feedback, choice.nextNodeId)}
                className="w-full text-left px-4 py-3 rounded-xl border border-white/10 hover:border-amber-400/40 hover:bg-amber-400/5 text-sm text-slate-200 transition-colors disabled:opacity-50"
              >
                {choice.label}
              </button>
            ))}
          </div>
        </>
      )}

      {feedback && (
        <p className="text-sm text-amber-100/90 bg-amber-500/10 border border-amber-400/20 rounded-xl px-4 py-3">
          {feedback}
        </p>
      )}

      {scoreLabel && (
        <p className="text-sm text-slate-300 flex items-center gap-2">
          {finished && scoreLabel.includes("passed") ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Lock className="w-4 h-4 text-amber-300" />
          )}
          Result: {scoreLabel}
        </p>
      )}

      {(finished || existing) && !disabled && (
        <button onClick={reset} className="btn-outline text-sm py-2 inline-flex items-center gap-2">
          <RotateCcw className="w-3.5 h-3.5" /> Retry scenario
        </button>
      )}
    </div>
  );
}

function QuizRunner({
  courseSlug,
  challenge,
  existing,
  disabled,
  onComplete,
}: {
  courseSlug: string;
  challenge: CourseChallenge;
  existing?: ChallengeAttemptResult;
  disabled?: boolean;
  onComplete: (
    result: ChallengeAttemptResult,
    all: Record<string, ChallengeAttemptResult>
  ) => void;
}) {
  const questions = challenge.questions ?? [];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(
    existing
      ? `Last score ${existing.score}% — ${existing.passed ? "passed" : "not yet passed"}`
      : null
  );

  const submit = async () => {
    if (disabled || submitting) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/courses/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          challengeId: challenge.id,
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Could not score quiz.");
        return;
      }
      setMessage(
        `${data.score}% (${data.correct}/${data.total}) — ${
          data.passed ? "gate cleared" : "keep training and retry"
        }`
      );
      onComplete(data.results.results[challenge.id], data.results.results);
    } catch {
      setMessage("Network error scoring quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-4">
      <div>
        <h4 className="text-white font-semibold">{challenge.title}</h4>
        <p className="text-sm text-slate-400 mt-1">{challenge.brief}</p>
        <p className="text-xs text-slate-500 mt-2">Pass score: {challenge.passScore}%</p>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="space-y-2">
            <p className="text-sm text-slate-200">
              <span className="text-slate-500 mr-2">{idx + 1}.</span>
              {q.prompt}
            </p>
            <div className="space-y-1.5">
              {q.choices.map((choice) => (
                <label
                  key={choice.id}
                  className={`flex items-start gap-3 px-3 py-2 rounded-xl border text-sm cursor-pointer transition-colors ${
                    answers[q.id] === choice.id
                      ? "border-violet-400/40 bg-violet-500/10 text-white"
                      : "border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    className="mt-1"
                    name={q.id}
                    checked={answers[q.id] === choice.id}
                    disabled={disabled || submitting}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: choice.id }))}
                  />
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={disabled || submitting || Object.keys(answers).length < questions.length}
        className="btn-primary text-sm py-2 disabled:opacity-40"
      >
        {submitting ? "Scoring…" : "Submit mastery gate"}
      </button>

      {message && <p className="text-sm text-slate-300">{message}</p>}
    </div>
  );
}
