import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { sendEnrollmentConfirmationEmail } from "@/lib/email-automation";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const accountEmail = user?.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const targetEmail = body.email ?? accountEmail;

  if (!targetEmail) {
    return NextResponse.json(
      { error: "No target email available for this account." },
      { status: 400 }
    );
  }

  const firstName = user?.firstName ?? user?.username ?? "NyxPulse Learner";
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
