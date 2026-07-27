/**
 * Env-only Firebase Admin detection — safe to import from any route.
 * Does not load the firebase-admin SDK.
 */
export type FirebaseServiceAccountEnv = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export type FirebaseAdminEnvDiagnosis = {
  jsonEnvPresent: boolean;
  jsonEnvChars: number;
  parseOk: boolean;
  /** Safe reason only — never includes secret material. */
  parseIssue: string | null;
  hasProjectId: boolean;
  hasClientEmail: boolean;
  hasPrivateKey: boolean;
  splitVarsComplete: boolean;
  configured: boolean;
  adminProjectId: string | null;
};

function normalizePrivateKey(key: string): string {
  return key.replace(/\\n/g, "\n");
}

function fromParsedObject(parsed: {
  project_id?: unknown;
  client_email?: unknown;
  private_key?: unknown;
}): FirebaseServiceAccountEnv | null {
  if (
    typeof parsed.project_id !== "string" ||
    !parsed.project_id ||
    typeof parsed.client_email !== "string" ||
    !parsed.client_email ||
    typeof parsed.private_key !== "string" ||
    !parsed.private_key
  ) {
    return null;
  }
  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: normalizePrivateKey(parsed.private_key),
  };
}

/**
 * Parse service account JSON from env. Tolerates:
 * - leading BOM / whitespace
 * - double-encoded JSON (JSON string containing JSON)
 */
export function parseFirebaseServiceAccount(): FirebaseServiceAccountEnv | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.replace(/^\uFEFF/, "").trim();
  if (raw) {
    try {
      let parsed: unknown = JSON.parse(raw);
      // Some dashboards store the value as a JSON-encoded string.
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (parsed && typeof parsed === "object") {
        const account = fromParsedObject(parsed as Record<string, unknown>);
        if (account) return account;
      }
    } catch {
      // fall through to split vars
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();
  if (projectId && clientEmail && privateKey) {
    return {
      projectId,
      clientEmail,
      privateKey: normalizePrivateKey(privateKey),
    };
  }

  return null;
}

export function isFirebaseAdminConfigured(): boolean {
  return parseFirebaseServiceAccount() !== null;
}

/** Non-secret diagnostics for /api/health when Admin env fails to load. */
export function diagnoseFirebaseAdminEnv(): FirebaseAdminEnvDiagnosis {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.replace(/^\uFEFF/, "").trim() ?? "";
  const jsonEnvPresent = raw.length > 0;
  let parseOk = false;
  let parseIssue: string | null = null;
  let hasProjectId = false;
  let hasClientEmail = false;
  let hasPrivateKey = false;
  let adminProjectId: string | null = null;

  if (!jsonEnvPresent) {
    parseIssue = "FIREBASE_SERVICE_ACCOUNT_JSON is missing or empty in this deployment";
  } else {
    try {
      let parsed: unknown = JSON.parse(raw);
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }
      if (!parsed || typeof parsed !== "object") {
        parseIssue = "JSON parsed but was not an object";
      } else {
        parseOk = true;
        const obj = parsed as Record<string, unknown>;
        hasProjectId = typeof obj.project_id === "string" && obj.project_id.length > 0;
        hasClientEmail = typeof obj.client_email === "string" && obj.client_email.length > 0;
        hasPrivateKey = typeof obj.private_key === "string" && obj.private_key.length > 0;
        if (hasProjectId) adminProjectId = obj.project_id as string;
        if (!hasProjectId || !hasClientEmail || !hasPrivateKey) {
          parseIssue =
            "JSON is missing required fields (need project_id, client_email, private_key)";
        }
      }
    } catch {
      parseIssue =
        "FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON (common if private_key newlines were altered when pasting into Vercel)";
    }
  }

  const splitVarsComplete = Boolean(
    process.env.FIREBASE_PROJECT_ID?.trim() &&
      process.env.FIREBASE_CLIENT_EMAIL?.trim() &&
      process.env.FIREBASE_PRIVATE_KEY?.trim()
  );

  const account = parseFirebaseServiceAccount();

  return {
    jsonEnvPresent,
    jsonEnvChars: raw.length,
    parseOk,
    parseIssue,
    hasProjectId,
    hasClientEmail,
    hasPrivateKey,
    splitVarsComplete,
    configured: account !== null,
    adminProjectId: account?.projectId ?? adminProjectId,
  };
}
