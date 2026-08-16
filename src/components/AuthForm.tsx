"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getClientAuth, isFirebaseClientConfigured } from "@/lib/firebase/client-auth";
import { Loader2 } from "lucide-react";

type Mode = "sign-in" | "sign-up";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isFirebaseClientConfigured()) {
    return (
      <div className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-6 text-sm text-amber-100">
        Firebase Auth is not configured. Set the <code>NEXT_PUBLIC_FIREBASE_*</code>{" "}
        variables in Vercel (API key, auth domain, project id, app id), enable Email/Password
        in Firebase Console → Authentication, then redeploy.
      </div>
    );
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const auth = getClientAuth();
    if (!auth) {
      setError("Firebase Auth is unavailable in this browser.");
      setLoading(false);
      return;
    }

    try {
      const credential =
        mode === "sign-up"
          ? await createUserWithEmailAndPassword(auth, email.trim(), password)
          : await signInWithEmailAndPassword(auth, email.trim(), password);

      if (mode === "sign-up" && name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
      }

      const idToken = await credential.user.getIdToken(/* forceRefresh */ true);
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const raw = await res.text();
      let json: { error?: string; success?: boolean } = {};
      try {
        json = raw ? (JSON.parse(raw) as { error?: string; success?: boolean }) : {};
      } catch {
        setError(
          res.ok
            ? "Could not create session."
            : `Session service error (${res.status}). Try again after the latest deploy.`
        );
        return;
      }
      if (!res.ok) {
        setError(json.error ?? "Could not create session");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      const message =
        err && typeof err === "object" && "code" in err
          ? String((err as { code?: string }).code)
          : "Authentication failed";
      const friendly =
        message === "auth/email-already-in-use"
          ? "An account with this email already exists. Sign in instead."
          : message === "auth/invalid-credential" || message === "auth/wrong-password"
            ? "Invalid email or password."
            : message === "auth/user-not-found"
              ? "No account found. Create one at Sign up — Firebase accounts are separate from the old Clerk logins."
              : message === "auth/weak-password"
                ? "Password should be at least 6 characters."
                : "Authentication failed. Please try again.";
      setError(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[rgba(124,58,237,0.22)] bg-[rgba(6,8,16,0.82)] backdrop-blur-md p-6 sm:p-8 space-y-4 w-full max-w-md shadow-[0_20px_80px_rgba(2,6,23,0.5)]"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">
          {mode === "sign-in" ? "Sign in" : "Create account"}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {mode === "sign-in"
            ? "Access your NyxPulse trainings and Skills Passport."
            : "Start training with a free NyxPulse learner account."}
        </p>
      </div>

      {mode === "sign-up" && (
        <label className="block text-sm">
          <span className="text-slate-400 mb-1.5 block">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
          />
        </label>
      )}

      <label className="block text-sm">
        <span className="text-slate-400 mb-1.5 block">Email</span>
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
        />
      </label>

      <label className="block text-sm">
        <span className="text-slate-400 mb-1.5 block">Password</span>
        <input
          required
          type="password"
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
        />
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Please wait…
          </span>
        ) : mode === "sign-in" ? (
          "Sign in"
        ) : (
          "Create account"
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        {mode === "sign-in" ? (
          <>
            No account?{" "}
            <Link href="/sign-up" className="text-indigo-300 hover:text-indigo-200">
              Create one
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-300 hover:text-indigo-200">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
