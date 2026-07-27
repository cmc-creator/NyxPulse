import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import { isFirebaseClientConfigured } from "@/lib/firebase/client-config";

/**
 * Non-secret env presence check for debugging Vercel setup.
 * Does not return key values. Avoids importing firebase-admin.
 */
export async function GET() {
  try {
    const env = {
      firebaseClient: isFirebaseClientConfigured(),
      firebaseAdmin: isFirebaseAdminConfigured(),
      stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      nextPublicUrl: Boolean(process.env.NEXT_PUBLIC_URL),
      smtpHost: Boolean(process.env.SMTP_HOST),
      instructorEmails: Boolean(process.env.NYXPULSE_INSTRUCTOR_EMAILS?.trim()),
      instructorPin: Boolean(process.env.NYXPULSE_INSTRUCTOR_PIN?.trim()),
    };

    return NextResponse.json({
      ok: true,
      launchReady: env.firebaseClient && env.firebaseAdmin,
      paymentsReady: env.stripeSecretKey && env.stripeWebhookSecret,
      instructorReady: env.instructorEmails || env.instructorPin,
      missingForAuth: (
        [
          !env.firebaseClient && "NEXT_PUBLIC_FIREBASE_* client config",
          !env.firebaseAdmin && "FIREBASE_SERVICE_ACCOUNT_JSON",
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
