import type { Metadata } from "next";
import Link from "next/link";
import { Fingerprint, ShieldCheck, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { buildPassportRows, readinessScore } from "@/lib/passport";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  getPassportShare,
  listChallengeResults,
  listLearnerCertificates,
} from "@/lib/firebase/learner-data";
import { clerkClient } from "@clerk/nextjs/server";
import { asStringArray, type PublicUserMetadata } from "@/lib/user-metadata";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  return {
    title: `Skills Passport ${token} | NyxPulse`,
    description: "Employer-ready NyxPulse Skills Passport verification.",
  };
}

export default async function PublicPassportPage({ params }: Props) {
  const { token } = await params;
  const configured = isFirebaseAdminConfigured();
  const share = configured ? await getPassportShare(decodeURIComponent(token)) : null;

  let readiness = 0;
  let rows: ReturnType<typeof buildPassportRows> = [];
  let recipientName = share?.recipientName ?? "Learner";

  if (share) {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(share.userId);
    const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
    recipientName =
      share.recipientName ||
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      "NyxPulse Learner";
    const certificates = await listLearnerCertificates(share.userId);
    const challengeResults = await listChallengeResults(share.userId);
    rows = buildPassportRows({
      enrolledSlugs: asStringArray(publicMetadata.courses),
      completedSlugs: asStringArray(publicMetadata.completedCourses),
      certificates,
      challengeResults,
    });
    readiness = readinessScore(rows);
  }

  return (
    <div className="relative min-h-screen page-shell">
      <StarField />
      <Navbar />
      <main className="relative z-10 page-main pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-violet-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to NyxPulse
          </Link>

          <div className="glass-card p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">
                  <Fingerprint className="w-3.5 h-3.5" />
                  Skills Passport
                </div>
                <h1 className="text-2xl font-bold text-white">{recipientName}</h1>
                <p className="text-sm text-slate-400 mt-1">
                  NyxPulse Advantage readiness profile for employers and credentialing teams.
                </p>
              </div>
              {share && (
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">{readiness}</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    readiness
                  </div>
                </div>
              )}
            </div>

            {!configured ? (
              <p className="text-sm text-amber-100">
                Passport verification requires Firebase configuration.
              </p>
            ) : !share ? (
              <p className="text-sm text-rose-300">This passport link is invalid or expired.</p>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs text-green-300 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified NyxPulse share link
                </div>
                {rows.map((row) => (
                  <div
                    key={row.slug}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 flex items-center gap-3"
                  >
                    <span className="text-2xl">{row.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold">{row.shortTitle}</div>
                      <div className="text-xs text-slate-500">
                        {row.completed ? "Certificate issued" : "In progress"} · Gates{" "}
                        {row.gatesPassed}/{row.gatesRequired}
                        {row.averageGateScore !== null ? ` · Avg ${row.averageGateScore}%` : ""}
                      </div>
                    </div>
                    {row.certificateId && (
                      <Link
                        href={`/verify/${encodeURIComponent(row.certificateId)}`}
                        className="text-xs text-violet-300 hover:text-white"
                      >
                        Verify
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
