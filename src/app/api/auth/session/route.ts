import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";
import {
  diagnoseFirebaseAdminEnv,
  isFirebaseAdminConfigured,
  parseFirebaseServiceAccount,
} from "@/lib/firebase/admin-env";
import { ensureUserProfile } from "@/lib/auth/profile";
import { SESSION_COOKIE_NAME, SESSION_EXPIRES_MS } from "@/lib/auth/constants";

export const dynamic = "force-dynamic";

function explainTokenError(err: unknown): { status: number; error: string } {
  const message = err instanceof Error ? err.message : String(err);

  if (/Cannot find module|ERR_REQUIRE_ESM|Failed to load external module/i.test(message)) {
    return { status: 503, error: `Session backend error: ${message}` };
  }
  if (/credential|private[_ ]key|DECODER|PEM|Invalid JWT Signature/i.test(message)) {
    return {
      status: 503,
      error:
        "Firebase Admin credentials look invalid. Re-paste FIREBASE_SERVICE_ACCOUNT_JSON (full JSON) in Vercel and redeploy.",
    };
  }
  if (/incorrect "aud"|audience|incorrect "iss"|issuer/i.test(message)) {
    const adminProject = parseFirebaseServiceAccount()?.projectId ?? "(unknown)";
    const clientProject = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "(missing)";
    return {
      status: 401,
      error: `Firebase project mismatch: web client is "${clientProject}" but service account is "${adminProject}". They must be the same project.`,
    };
  }
  if (/no "kid"|ArgumentError|Decoding Firebase ID token failed/i.test(message)) {
    return {
      status: 401,
      error: "Invalid or incomplete ID token. Sign out, refresh the page, and sign in again.",
    };
  }
  if (/Firestore|undefined|ignoreUndefinedProperties/i.test(message)) {
    return {
      status: 500,
      error: `Profile save failed: ${message}`,
    };
  }

  console.error("Failed to create session:", err);
  return { status: 401, error: `Invalid token: ${message}` };
}

export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    const diag = diagnoseFirebaseAdminEnv();
    return NextResponse.json(
      {
        error: "Firebase Admin is not configured",
        hint:
          diag.parseIssue ??
          "Set FIREBASE_SERVICE_ACCOUNT_BASE64 (one-line base64 of the nyxpulse service-account JSON) on Vercel Production, then redeploy.",
        adminDiag: {
          jsonEnvPresent: diag.jsonEnvPresent,
          jsonEnvChars: diag.jsonEnvChars,
          base64EnvPresent: diag.base64EnvPresent,
          parseOk: diag.parseOk,
          splitVarsComplete: diag.splitVarsComplete,
        },
      },
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
    const auth = await getAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_MS,
    });

    const user = await auth.getUser(decoded.uid);
    const displayName =
      user.displayName?.trim() ||
      user.email?.split("@")[0] ||
      "NyxPulse Learner";
    const nameParts = displayName.split(/\s+/).filter(Boolean);
    await ensureUserProfile({
      userId: decoded.uid,
      email: user.email ?? "",
      displayName,
      firstName: nameParts[0] ?? null,
      lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : null,
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
    const { status, error } = explainTokenError(err);
    return NextResponse.json({ error }, { status });
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
