"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, LayoutDashboard, BookOpen, Loader2, AlertCircle } from "lucide-react";
import StarField from "@/components/StarField";

type StatusState =
  | { kind: "loading"; message: string }
  | { kind: "ready"; courseSlugs: string[] }
  | { kind: "error"; message: string };

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [state, setState] = useState<StatusState>({
    kind: "loading",
    message: "Confirming your payment…",
  });

  useEffect(() => {
    if (!sessionId) {
      setState({
        kind: "error",
        message: "Missing checkout session. If you completed payment, open your dashboard.",
      });
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const res = await fetch(
          `/api/stripe/session-status?session_id=${encodeURIComponent(sessionId)}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Unable to verify payment");
        }

        if (data.paid && data.enrolled) {
          if (!cancelled) {
            setState({ kind: "ready", courseSlugs: data.courseSlugs ?? [] });
          }
          return;
        }

        if (data.paid && !data.enrolled && attempts < 8) {
          if (!cancelled) {
            setState({
              kind: "loading",
              message: "Payment received. Provisioning your courses…",
            });
          }
          setTimeout(poll, 1200);
          return;
        }

        if (!cancelled) {
          setState({
            kind: "error",
            message:
              "Payment is still processing. Refresh this page in a moment, or open your dashboard.",
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            kind: "error",
            message: err instanceof Error ? err.message : "Unable to verify payment",
          });
        }
      }
    };

    void poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <StarField />
      <div className="relative z-10 text-center max-w-lg w-full">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/30 border border-violet-500/30 flex items-center justify-center">
              {state.kind === "loading" ? (
                <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
              ) : state.kind === "ready" ? (
                <CheckCircle className="w-12 h-12 text-violet-400" />
              ) : (
                <AlertCircle className="w-12 h-12 text-amber-400" />
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/10 to-cyan-500/10 blur-xl" />
          </div>
        </div>

        {state.kind === "loading" && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Finalizing enrollment
            </h1>
            <p className="text-slate-400 text-lg mb-10">{state.message}</p>
          </>
        )}

        {state.kind === "ready" && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              You&apos;re enrolled!
            </h1>
            <p className="text-slate-400 text-lg mb-2">Your purchase was successful.</p>
            <p className="text-slate-500 text-sm mb-10">
              {state.courseSlugs.length > 1
                ? `${state.courseSlugs.length} courses were added to your dashboard.`
                : "Your course has been added to your dashboard."}{" "}
              Head there to start learning and earn your certificate.
            </p>
          </>
        )}

        {state.kind === "error" && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Almost there
            </h1>
            <p className="text-slate-400 text-lg mb-10">{state.message}</p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard/courses"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            href="/courses"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Browse More Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-600">
          A receipt has been sent to your email. Questions?{" "}
          <a
            href="mailto:info@nyxpulse.com"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
