import Link from "next/link";
import { getOrgInvite } from "@/lib/org/store";
import { CheckCircle2, AlertTriangle } from "lucide-react";

type Props = { searchParams: Promise<{ token?: string }> };

export default async function AcceptInvitePage({ searchParams }: Props) {
  const { token } = await searchParams;
  const invite = token ? await getOrgInvite(token) : null;
  const expired =
    invite && new Date(invite.expiresAt).getTime() < Date.now();

  return (
    <main className="min-h-screen bg-[#02020a] px-6 py-20">
      <div className="max-w-lg mx-auto glass-card p-8 space-y-5">
        <h1 className="text-2xl font-bold text-white">Team invitation</h1>

        {!token && (
          <p className="text-slate-400 text-sm">
            Missing invite token. Open the link from your invitation email.
          </p>
        )}

        {token && !invite && (
          <div className="flex gap-3 text-sm text-amber-200">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            We couldn&apos;t find this invite. It may have been removed — ask your
            team admin to resend.
          </div>
        )}

        {invite && expired && (
          <div className="flex gap-3 text-sm text-red-300">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            This invite expired on {new Date(invite.expiresAt).toLocaleDateString()}.
            Ask your admin to send a new one.
          </div>
        )}

        {invite && !expired && (
          <>
            <div className="flex gap-3 text-sm text-green-300">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              You&apos;re invited to <strong className="text-white">{invite.orgName}</strong>{" "}
              as {invite.name}.
            </div>
            {invite.courseSlugs.length > 0 && (
              <p className="text-sm text-slate-400">
                Assigned trainings: {invite.courseSlugs.join(", ")}
              </p>
            )}
            <p className="text-sm text-slate-400">
              Create or sign into NyxPulse with <strong className="text-white">{invite.email}</strong>.
              If your account already exists, your admin can assign courses and they&apos;ll
              appear on your dashboard automatically.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/sign-up?redirect_url=${encodeURIComponent("/dashboard")}`}
                className="btn-primary text-sm py-2"
              >
                Create account
              </Link>
              <Link
                href={`/sign-in?redirect_url=${encodeURIComponent("/dashboard")}`}
                className="btn-outline text-sm py-2"
              >
                Sign in
              </Link>
            </div>
          </>
        )}

        <Link href="/" className="text-xs text-violet-300 hover:text-white inline-block">
          ← Back to NyxPulse
        </Link>
      </div>
    </main>
  );
}
