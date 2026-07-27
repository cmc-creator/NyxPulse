import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isClerkServerConfigured } from "@/lib/clerk-config";

const isClerkConfigured = isClerkServerConfigured();

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/stripe/portal(.*)",
  "/api/stripe/checkout(.*)",
  "/api/stripe/session-status(.*)",
  "/api/courses/complete(.*)",
  "/api/courses/progress(.*)",
  "/api/courses/challenges(.*)",
  "/api/passport(.*)",
  "/api/drills(.*)",
  "/api/skills(.*)",
  "/api/roles(.*)",
  "/api/org(.*)",
]);

export default function proxy(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Cookie presence gate only — full verification happens in Node route handlers /
  // server components via Firebase Admin verifySessionCookie.
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (session) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("redirect_url", request.url);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
