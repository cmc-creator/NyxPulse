/** True when Clerk publishable key is present (inlined for client bundles at build time). */
export function isClerkPublishableConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

/** True when both Clerk publishable + secret keys are present (server only). */
export function isClerkServerConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );
}
