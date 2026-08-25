import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";
import { findUserIdByEmail, getUserProfile, updateUserProfile } from "@/lib/auth/profile";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";

const VALID_PLANS = ["individual", "team", "org"] as const;
type Plan = (typeof VALID_PLANS)[number];

/**
 * Grant or change a client's billing plan (sales-led team/org onboarding).
 *
 * Auth (either):
 * - Header `x-admin-bootstrap-token` matching `NYXPULSE_ADMIN_BOOTSTRAP_TOKEN`, or
 * - Signed-in user with Firebase custom claim `admin: true`
 *
 * Body: `{ "email": "buyer@client.com", "plan": "team" | "org" | "individual", "orgName"?: "Client Facility" }`
 *
 * Setting `team`/`org` makes that user an org admin so they can manage
 * their roster in the Team Portal (invite staff, assign courses). Team
 * invoicing stays in Stripe (send a Stripe invoice manually) or offline.
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

  let email: string;
  let plan: Plan;
  let orgName: string | undefined;
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    plan = body?.plan;
    orgName = typeof body?.orgName === "string" ? body.orgName.trim() || undefined : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (!VALID_PLANS.includes(plan)) {
    return NextResponse.json(
      { error: `plan must be one of: ${VALID_PLANS.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const userId = await findUserIdByEmail(email);
    if (!userId) {
      return NextResponse.json(
        { error: `No account found for ${email}. Ask the client to sign up first.` },
        { status: 404 }
      );
    }

    const profile = await getUserProfile(userId);
    const updated = await updateUserProfile(userId, {
      plan,
      ...(plan === "individual"
        ? {}
        : {
            orgRole: "admin" as const,
            orgName: orgName ?? profile?.orgName ?? "Your Organization",
          }),
    });

    return NextResponse.json({
      success: true,
      userId,
      email,
      plan: updated.plan,
      orgName: updated.orgName ?? null,
      note:
        plan === "individual"
          ? "Plan reset to individual."
          : "User can now manage their roster in the Team Portal (/dashboard/org).",
    });
  } catch (err) {
    console.error("Failed to update plan:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update plan" },
      { status: 500 }
    );
  }
}
