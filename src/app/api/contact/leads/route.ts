import { NextResponse } from "next/server";
import { listStoredContactLeads } from "@/lib/lead-store";

function isAuthorized(req: Request) {
  const configuredToken = process.env.CONTACT_LEADS_TOKEN;

  if (!configuredToken) {
    return false;
  }

  const headerToken = req.headers.get("x-contact-leads-token")?.trim();
  const authHeader = req.headers.get("authorization")?.trim();
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : undefined;

  return headerToken === configuredToken || bearerToken === configuredToken;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listStoredContactLeads();
  return NextResponse.json({ leads, count: leads.length });
}
