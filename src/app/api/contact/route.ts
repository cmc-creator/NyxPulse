import { NextResponse } from "next/server";
import {
  sendContactRequestConfirmation,
  sendContactRequestNotification,
} from "@/lib/email-automation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  org?: string;
  phone?: string;
  trainingType?: string[];
  format?: string;
  teamSize?: string;
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as ContactBody;

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const contactData = {
    name,
    email,
    org: body.org?.trim() || undefined,
    phone: body.phone?.trim() || undefined,
    trainingType: Array.isArray(body.trainingType)
      ? body.trainingType.filter((item) => typeof item === "string" && item.trim().length > 0)
      : [],
    format: body.format?.trim() || undefined,
    teamSize: body.teamSize?.trim() || undefined,
    message: body.message?.trim() || undefined,
  };

  const leadResult = await sendContactRequestNotification(contactData);

  if (!leadResult.success) {
    return NextResponse.json(
      { error: leadResult.error ?? "Unable to submit contact request." },
      { status: 500 }
    );
  }

  const confirmationResult = await sendContactRequestConfirmation(contactData);
  if (!confirmationResult.success) {
    console.error("Failed to send contact confirmation email:", confirmationResult.error);
  }

  return NextResponse.json({
    success: true,
    confirmationSent: confirmationResult.success,
  });
}
