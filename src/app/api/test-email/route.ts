import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { sendEnrollmentConfirmationEmail } from "@/lib/email-automation";

/**
 * SMTP smoke-test endpoint.
 * Always requires x-smtp-test-token header matching SMTP_TEST_TOKEN.
 * Disabled entirely when SMTP_TEST_TOKEN is unset (recommended for production).
 */
export async function POST(req: Request) {
  const smtpTestToken = process.env.SMTP_TEST_TOKEN;
  if (!smtpTestToken) {
    return NextResponse.json(
      { error: "SMTP test endpoint is disabled." },
      { status: 404 }
    );
  }

  const requestToken = req.headers.get("x-smtp-test-token");
  if (!requestToken || requestToken !== smtpTestToken) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid x-smtp-test-token header." },
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    name?: string;
  };

  const user = await currentUser().catch(() => null);
  const accountEmail = user?.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;
  const targetEmail = body.email ?? accountEmail;

  if (!targetEmail) {
    return NextResponse.json(
      { error: 'No target email provided. Pass { email: "you@example.com" }.' },
      { status: 400 }
    );
  }

  const firstName = body.name ?? user?.firstName ?? user?.username ?? "NyxPulse Learner";
  const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";

  const result = await sendEnrollmentConfirmationEmail(
    targetEmail,
    firstName,
    ["SMTP Test Message"],
    `${appUrl}/dashboard`
  );

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? "Failed to send test email." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    sentTo: targetEmail,
    messageId: result.messageId,
  });
}
