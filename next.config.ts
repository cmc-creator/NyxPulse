import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep firebase-admin out of the Turbopack server bundle — native/gRPC bits
  // crash Vercel serverless functions when bundled into route graphs.
  serverExternalPackages: [
    "firebase-admin",
    "@google-cloud/firestore",
    "@google-cloud/storage",
    "google-gax",
    "nodemailer",
  ],
};

export default nextConfig;
