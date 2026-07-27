import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { isFirebaseClientConfigured } from "@/lib/firebase/client-auth";

/**
 * Non-secret env presence check for debugging Vercel setup.
 * Does not return key values.
 */
export async function GET() {
  const firebaseClient = isFirebaseClientConfigured();
  const firebaseAdmin = isFirebaseAdminConfigured();

  return NextResponse.json({
    ok: true,
    env: {
      firebaseClient,
      firebaseAdmin,
      stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      nextPublicUrl: Boolean(process.env.NEXT_PUBLIC_URL),
      smtpHost: Boolean(process.env.SMTP_HOST),
    },
    launchReady: firebaseClient && firebaseAdmin,
  });
}
