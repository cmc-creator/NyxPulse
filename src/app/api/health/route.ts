import { NextResponse } from "next/server";
import {
  diagnoseFirebaseAdminEnv,
  isFirebaseAdminConfigured,
} from "@/lib/firebase/admin-env";
import { isFirebaseClientConfigured } from "@/lib/firebase/client-config";

export const dynamic = "force-dynamic";

/**
 * Non-secret env presence check for debugging Vercel setup.
 * Does not return key values. Avoids importing firebase-admin.
 */
export async function GET() {
  try {
    const clientProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() || null;
    const adminDiag = diagnoseFirebaseAdminEnv();
    const adminProjectId = adminDiag.adminProjectId;
    const projectIdsMatch = Boolean(
      clientProjectId && adminProjectId && clientProjectId === adminProjectId
    );

    const env = {
      firebaseClient: isFirebaseClientConfigured(),
      firebaseAdmin: isFirebaseAdminConfigured(),
      stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      nextPublicUrl: Boolean(process.env.NEXT_PUBLIC_URL),
      smtpHost: Boolean(process.env.SMTP_HOST),
      instructorEmails: Boolean(process.env.NYXPULSE_INSTRUCTOR_EMAILS?.trim()),
      instructorPin: Boolean(process.env.NYXPULSE_INSTRUCTOR_PIN?.trim()),
      clientProjectId,
      adminProjectId,
      projectIdsMatch,
      adminDiag: {
        jsonEnvPresent: adminDiag.jsonEnvPresent,
        jsonEnvChars: adminDiag.jsonEnvChars,
        base64EnvPresent: adminDiag.base64EnvPresent,
        parseOk: adminDiag.parseOk,
        parseIssue: adminDiag.parseIssue,
        hasProjectId: adminDiag.hasProjectId,
        hasClientEmail: adminDiag.hasClientEmail,
        hasPrivateKey: adminDiag.hasPrivateKey,
        splitVarsComplete: adminDiag.splitVarsComplete,
        source: adminDiag.source,
      },
    };

    return NextResponse.json({
      ok: true,
      launchReady: env.firebaseClient && env.firebaseAdmin && projectIdsMatch,
      paymentsReady: env.stripeSecretKey && env.stripeWebhookSecret,
      instructorReady: env.instructorEmails || env.instructorPin,
      missingForAuth: (
        [
          !env.firebaseClient && "NEXT_PUBLIC_FIREBASE_* client config",
          !env.firebaseAdmin &&
            (adminDiag.parseIssue ||
              "Set FIREBASE_SERVICE_ACCOUNT_BASE64 (recommended) or FIREBASE_SERVICE_ACCOUNT_JSON for project nyxpulse"),
          env.firebaseClient &&
            env.firebaseAdmin &&
            !projectIdsMatch &&
            "NEXT_PUBLIC_FIREBASE_PROJECT_ID must match service account project_id",
        ] as (string | false)[]
      ).filter(Boolean),
      env,
    });
  } catch (err) {
    console.error("Health check failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Health check failed",
      },
      { status: 500 }
    );
  }
}
