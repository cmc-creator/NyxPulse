import { NextResponse } from "next/server";

/** Lightweight probe — no Firebase / Stripe imports. */
export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() });
}
