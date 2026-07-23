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
]);

const clerkAuthMiddleware = clerkMiddleware(async (auth, request) => {
  if (!isProtectedRoute(request)) {
    return;
  }

  const { userId } = await auth();
  if (userId) {
    return;
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("redirect_url", request.url);
  return NextResponse.redirect(signInUrl);
});

function passthroughMiddleware() {
  return NextResponse.next();
}

/**
 * If Clerk env vars are missing (common after recreating a Vercel project),
 * do not crash every request — serve the public site and skip auth gates.
 */
export default isClerkConfigured ? clerkAuthMiddleware : passthroughMiddleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
