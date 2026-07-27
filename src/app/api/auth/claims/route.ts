import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";
import { setUserAdminClaim } from "@/lib/auth/claims";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";

/**
 * Grant Firebase custom claims `{ admin: true, instructor: true }`.
 *
 * Auth (either):
 * - Header `x-admin-bootstrap-token` matching `NYXPULSE_ADMIN_BOOTSTRAP_TOKEN`, or
 * - Signed-in user who already has `claims.admin === true`
 *
 * Body: `{ "uid": "<firebase-uid>" }` — defaults to the signed-in user when omitted.
 *
 * After granting, the user must sign out and sign back in so the session cookie
 * carries the new claims.
 */
export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Firebase Admin is not configured" }, { status: 503 });
  }

  const bootstrap = process.env.NYXPULSE_ADMIN_BOOTSTRAP_TOKEN?.trim();
  const provided = req.headers.get("x-admin-bootstrap-token")?.trim();
  const session = await getSessionUser();
  const bootstrapOk = Boolean(bootstrap && provided && provided === bootstrap);
  const adminOk = session?.claims.admin === true;

  if (!bootstrapOk && !adminOk) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let uid: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    uid = typeof body?.uid === "string" ? body.uid.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!uid) uid = session?.userId;
  if (!uid) {
    return NextResponse.json({ error: "uid is required" }, { status: 400 });
  }

  try {
    await setUserAdminClaim(uid);
    return NextResponse.json({
      success: true,
      uid,
      claims: { admin: true, instructor: true },
      note: "Sign out and sign back in so the session cookie picks up the new claims.",
    });
  } catch (err) {
    console.error("Failed to set admin claims:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to set claims" },
      { status: 500 }
    );
  }
}
