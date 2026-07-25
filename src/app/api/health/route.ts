import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";

/**
 * Non-secret env presence check for debugging Vercel setup.
 * Does not return key values.
 */
export async function GET() {
  const env = {
    clerkPublishableKey: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    clerkSecretKey: Boolean(process.env.CLERK_SECRET_KEY),
    stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    firebaseAdmin: isFirebaseAdminConfigured(),
    nextPublicUrl: Boolean(process.env.NEXT_PUBLIC_URL),
    smtpHost: Boolean(process.env.SMTP_HOST),
    smtpUser: Boolean(process.env.SMTP_USER),
    smtpPass: Boolean(process.env.SMTP_PASS),
    instructorEmails: Boolean(process.env.NYXPULSE_INSTRUCTOR_EMAILS?.trim()),
    instructorPin: Boolean(process.env.NYXPULSE_INSTRUCTOR_PIN?.trim()),
    refreshersCronToken: Boolean(process.env.REFRESHERS_CRON_TOKEN?.trim()),
  };

  const launchReady =
    env.clerkPublishableKey &&
    env.clerkSecretKey &&
    env.stripeSecretKey &&
    env.stripeWebhookSecret &&
    env.firebaseAdmin &&
    env.nextPublicUrl;

  const emailReady = env.smtpHost && env.smtpUser && env.smtpPass;
  const instructorReady = env.instructorEmails || env.instructorPin;

  return NextResponse.json({
    ok: true,
    launchReady,
    emailReady,
    instructorReady,
    missingForLaunch: (
      [
        !env.clerkPublishableKey && "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
        !env.clerkSecretKey && "CLERK_SECRET_KEY",
        !env.stripeSecretKey && "STRIPE_SECRET_KEY",
        !env.stripeWebhookSecret && "STRIPE_WEBHOOK_SECRET",
        !env.firebaseAdmin && "FIREBASE_SERVICE_ACCOUNT_JSON",
        !env.nextPublicUrl && "NEXT_PUBLIC_URL",
      ] as (string | false)[]
    ).filter(Boolean),
    env,
  });
}
