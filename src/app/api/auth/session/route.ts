import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { ensureUserProfile } from "@/lib/auth/profile";
import { SESSION_COOKIE_NAME, SESSION_EXPIRES_MS } from "@/lib/auth/constants";

export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Firebase Admin is not configured" },
      { status: 503 }
    );
  }

  let idToken: string;
  try {
    const body = await req.json();
    idToken = body?.idToken;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!idToken || typeof idToken !== "string") {
    return NextResponse.json({ error: "idToken is required" }, { status: 400 });
  }

  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_MS,
    });

    const user = await auth.getUser(decoded.uid);
    await ensureUserProfile({
      userId: decoded.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? user.email?.split("@")[0] ?? "NyxPulse Learner",
      firstName: user.displayName?.split(" ")[0],
      lastName: user.displayName?.split(" ").slice(1).join(" ") || undefined,
    });

    const jar = await cookies();
    jar.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRES_MS / 1000,
    });

    return NextResponse.json({ success: true, userId: decoded.uid });
  } catch (err) {
    console.error("Failed to create session:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return NextResponse.json({ success: true });
}
