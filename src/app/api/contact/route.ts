import { NextResponse } from "next/server";
import {
  sendContactRequestConfirmation,
  sendContactRequestNotification,
} from "@/lib/email-automation";
import { storeContactLead } from "@/lib/lead-store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const requestLog = new Map<string, number[]>();

type ContactBody = {
  name?: string;
  email?: string;
  org?: string;
  phone?: string;
  trainingType?: string[];
  format?: string;
  teamSize?: string;
  message?: string;
  website?: string;
};

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(key) ?? [];
  const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  requestLog.set(key, recentTimestamps);
  return false;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as ContactBody;
  const clientIp = getClientIp(req);

  if (body.website?.trim()) {
    return NextResponse.json({ success: true, confirmationSent: false });
  }

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

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

  try {
    await storeContactLead({
      ...contactData,
      createdAt: new Date().toISOString(),
      sourceIp: clientIp,
    });
  } catch (error) {
    // Lead capture should not block user confirmation if storage is unavailable.
    console.error("Failed to persist contact lead:", error);
  }

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
