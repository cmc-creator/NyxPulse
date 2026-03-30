import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { sendEnrollmentConfirmationEmail } from "@/lib/email-automation";

export async function POST(req: Request) {
  const { userId } = await auth();
  const smtpTestToken = process.env.SMTP_TEST_TOKEN;
  const requestToken = req.headers.get("x-smtp-test-token");

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    token?: string;
    name?: string;
  };
  const fallbackToken = body.token;
  const tokenMatches =
    !!smtpTestToken && (requestToken === smtpTestToken || fallbackToken === smtpTestToken);

  // Allow either a signed-in user OR a request with the shared SMTP test token.
  if (!userId && !tokenMatches) {
    return NextResponse.json(
      {
        error:
          "Unauthorized. Sign in or provide a valid x-smtp-test-token header.",
      },
      { status: 401 }
    );
  }

  const user = userId ? await currentUser() : null;
  const accountEmail = user?.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;
  const targetEmail = body.email ?? accountEmail;

  if (!targetEmail) {
    return NextResponse.json(
      { error: "No target email provided. Pass { email: \"you@example.com\" }." },
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
