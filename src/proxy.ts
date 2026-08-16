import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

const protectedPrefixes = [
  "/dashboard",
  "/api/stripe/portal",
  "/api/stripe/checkout",
  "/api/stripe/session-status",
  "/api/courses/complete",
  "/api/courses/progress",
  "/api/courses/challenges",
  "/api/passport",
  "/api/drills",
  "/api/skills",
  "/api/roles",
  "/api/org",
];

const isProtectedPath = (pathname: string) => protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

/**
 * Cookie presence gate only — full verification happens in Node route handlers /
 * server components via Firebase Admin verifySessionCookie.
 *
 * Matcher is limited to protected paths so public APIs (session, health, contact)
 * are not forced through the proxy pass-through path.
 */
export default function proxy(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) return NextResponse.next();

  // Route handlers and server components verify this Firebase session cookie with Admin SDK.
  if (request.cookies.get(SESSION_COOKIE_NAME)?.value) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("redirect_url", request.url);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/stripe/portal",
    "/api/stripe/checkout",
    "/api/stripe/session-status",
    "/api/courses/complete",
    "/api/courses/progress",
    "/api/courses/challenges/:path*",
    "/api/passport",
    "/api/passport/:path*",
    "/api/drills",
    "/api/drills/:path*",
    "/api/skills",
    "/api/roles",
    "/api/org",
    "/api/auth/me",
    "/api/refreshers",
  ],
};
