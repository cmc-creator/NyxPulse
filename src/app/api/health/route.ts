import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

/**
 * Non-secret env presence check for debugging Vercel setup.
 * Does not return key values.
 */
export async function GET() {
  const firebaseClient = isFirebaseClientConfigured();
  const firebaseAdmin = isFirebaseAdminConfigured();

  const env = {
    firebaseClient,
    firebaseAdmin,
    stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    nextPublicUrl: Boolean(process.env.NEXT_PUBLIC_URL),
    smtpHost: Boolean(process.env.SMTP_HOST),
    instructorEmails: Boolean(process.env.NYXPULSE_INSTRUCTOR_EMAILS?.trim()),
    instructorPin: Boolean(process.env.NYXPULSE_INSTRUCTOR_PIN?.trim()),
  };

  return NextResponse.json({
    ok: true,
    launchReady: firebaseClient && firebaseAdmin,
    paymentsReady: env.stripeSecretKey && env.stripeWebhookSecret,
    instructorReady: env.instructorEmails || env.instructorPin,
    missingForAuth: (
      [
        !firebaseClient && "NEXT_PUBLIC_FIREBASE_* client config",
        !firebaseAdmin && "FIREBASE_SERVICE_ACCOUNT_JSON",
      ] as (string | false)[]
    ).filter(Boolean),
    env,
  });
}
