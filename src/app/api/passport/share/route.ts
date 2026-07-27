import { getSessionUser } from "@/lib/auth/server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { createPassportShare } from "@/lib/firebase/learner-data";

export async function POST() {
  const session = await getSessionUser();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (!isFirebaseAdminConfigured()) {
    return Response.json(
      {
        error:
          "Skills Passport sharing requires Firebase Admin configuration on the server.",
      },
      { status: 503 }
    );
  }

  try {
    const { userId, firstName, lastName, displayName } = session;
    const recipientName =
      [firstName, lastName].filter(Boolean).join(" ") || displayName || "NyxPulse Learner";

    const share = await createPassportShare(userId, recipientName);
    if (!share) {
      return Response.json({ error: "Could not create share link" }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";
    return Response.json({
      success: true,
      token: share.token,
      url: `${appUrl}/ready/${encodeURIComponent(share.token)}`,
    });
  } catch (err) {
    console.error("Failed to create passport share:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
