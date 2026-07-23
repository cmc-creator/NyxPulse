import { NextResponse } from "next/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";

/**
 * Non-secret env presence check for debugging Vercel setup.
 * Does not return key values.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    env: {
      clerkPublishableKey: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
      clerkSecretKey: Boolean(process.env.CLERK_SECRET_KEY),
      stripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
      stripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      firebaseAdmin: isFirebaseAdminConfigured(),
      nextPublicUrl: Boolean(process.env.NEXT_PUBLIC_URL),
      smtpHost: Boolean(process.env.SMTP_HOST),
    },
  });
}
