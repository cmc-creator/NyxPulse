/**
 * Env-only Firebase Admin detection — safe to import from any route.
 * Does not load the firebase-admin SDK (which currently crashes some
 * Vercel serverless functions when pulled into the module graph).
 */
export type FirebaseServiceAccountEnv = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export function parseFirebaseServiceAccount(): FirebaseServiceAccountEnv | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as {
        project_id?: string;
        client_email?: string;
        private_key?: string;
      };
      if (!parsed.project_id || !parsed.client_email || typeof parsed.private_key !== "string") {
        return null;
      }
      return {
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key.replace(/\\n/g, "\n"),
      };
    } catch {
      return null;
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (projectId && clientEmail && privateKey) {
    return {
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    };
  }

  return null;
}

export function isFirebaseAdminConfigured(): boolean {
  return parseFirebaseServiceAccount() !== null;
}
