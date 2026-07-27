/**
 * Env-only Firebase Admin detection — safe to import from any route.
 * Does not load the firebase-admin SDK.
 *
 * Accepts several Vercel-friendly shapes because pasting the raw JSON
 * service-account file often breaks (literal newlines, double-encoding).
 */
export type FirebaseServiceAccountEnv = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

export type FirebaseAdminEnvDiagnosis = {
  jsonEnvPresent: boolean;
  jsonEnvChars: number;
  base64EnvPresent: boolean;
  parseOk: boolean;
  /** Safe reason only — never includes secret material. */
  parseIssue: string | null;
  hasProjectId: boolean;
  hasClientEmail: boolean;
  hasPrivateKey: boolean;
  splitVarsComplete: boolean;
  configured: boolean;
  adminProjectId: string | null;
  source: "json" | "base64" | "split" | "repaired-json" | null;
};

function normalizePrivateKey(key: string): string {
  return key
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/^\uFEFF/, "")
    .trim();
}

function fromFields(input: {
  projectId?: unknown;
  clientEmail?: unknown;
  privateKey?: unknown;
}): FirebaseServiceAccountEnv | null {
  if (
    typeof input.projectId !== "string" ||
    !input.projectId.trim() ||
    typeof input.clientEmail !== "string" ||
    !input.clientEmail.trim() ||
    typeof input.privateKey !== "string" ||
    !input.privateKey.trim()
  ) {
    return null;
  }
  const privateKey = normalizePrivateKey(input.privateKey);
  if (!privateKey.includes("BEGIN") || !privateKey.includes("PRIVATE KEY")) {
    return null;
  }
  return {
    projectId: input.projectId.trim(),
    clientEmail: input.clientEmail.trim(),
    privateKey,
  };
}

function fromParsedObject(parsed: Record<string, unknown>): FirebaseServiceAccountEnv | null {
  return fromFields({
    projectId: parsed.project_id ?? parsed.projectId,
    clientEmail: parsed.client_email ?? parsed.clientEmail,
    privateKey: parsed.private_key ?? parsed.privateKey,
  });
}

function tryParseJsonObject(raw: string): Record<string, unknown> | null {
  try {
    let parsed: unknown = JSON.parse(raw);
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // ignore
  }
  return null;
}

/** Recover fields when Vercel/UI mangled JSON (literal newlines in private_key). */
function extractFromBrokenServiceAccountText(raw: string): FirebaseServiceAccountEnv | null {
  const projectId =
    raw.match(/"project_id"\s*:\s*"([^"]+)"/)?.[1] ??
    raw.match(/"projectId"\s*:\s*"([^"]+)"/)?.[1];
  const clientEmail =
    raw.match(/"client_email"\s*:\s*"([^"]+)"/)?.[1] ??
    raw.match(/"clientEmail"\s*:\s*"([^"]+)"/)?.[1];
  const pkMatch =
    raw.match(/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/) ??
    null;
  if (!projectId || !clientEmail || !pkMatch) return null;
  return fromFields({
    projectId,
    clientEmail,
    privateKey: pkMatch[0],
  });
}

function parseJsonEnv(rawInput: string): { account: FirebaseServiceAccountEnv | null; repaired: boolean } {
  const raw = rawInput.replace(/^\uFEFF/, "").trim();
  if (!raw) return { account: null, repaired: false };

  const obj = tryParseJsonObject(raw);
  if (obj) {
    const account = fromParsedObject(obj);
    if (account) return { account, repaired: false };
  }

  const repaired = extractFromBrokenServiceAccountText(raw);
  if (repaired) return { account: repaired, repaired: true };

  return { account: null, repaired: false };
}

function parseBase64Env(rawInput: string): FirebaseServiceAccountEnv | null {
  const raw = rawInput.replace(/^\uFEFF/, "").trim();
  if (!raw) return null;
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf8");
    return parseJsonEnv(decoded).account;
  } catch {
    return null;
  }
}

function parseSplitEnv(): FirebaseServiceAccountEnv | null {
  return fromFields({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  });
}

let cached: { account: FirebaseServiceAccountEnv | null; source: FirebaseAdminEnvDiagnosis["source"] } | null =
  null;

function resolveAccount(): {
  account: FirebaseServiceAccountEnv | null;
  source: FirebaseAdminEnvDiagnosis["source"];
} {
  if (cached) return cached;

  const jsonRaw =
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ??
    process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON ??
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonRaw?.trim()) {
    const { account, repaired } = parseJsonEnv(jsonRaw);
    if (account) {
      cached = { account, source: repaired ? "repaired-json" : "json" };
      return cached;
    }
  }

  const b64 =
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 ??
    process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64;
  if (b64?.trim()) {
    const account = parseBase64Env(b64);
    if (account) {
      cached = { account, source: "base64" };
      return cached;
    }
  }

  const split = parseSplitEnv();
  if (split) {
    cached = { account: split, source: "split" };
    return cached;
  }

  cached = { account: null, source: null };
  return cached;
}

export function parseFirebaseServiceAccount(): FirebaseServiceAccountEnv | null {
  return resolveAccount().account;
}

export function isFirebaseAdminConfigured(): boolean {
  return parseFirebaseServiceAccount() !== null;
}

/** Non-secret diagnostics for /api/health when Admin env fails to load. */
export function diagnoseFirebaseAdminEnv(): FirebaseAdminEnvDiagnosis {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.replace(/^\uFEFF/, "").trim() ?? "";
  const jsonEnvPresent = raw.length > 0;
  const base64EnvPresent = Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.trim());
  let parseOk = false;
  let parseIssue: string | null = null;
  let hasProjectId = false;
  let hasClientEmail = false;
  let hasPrivateKey = false;

  if (jsonEnvPresent) {
    const obj = tryParseJsonObject(raw);
    if (obj) {
      parseOk = true;
      hasProjectId = typeof (obj.project_id ?? obj.projectId) === "string";
      hasClientEmail = typeof (obj.client_email ?? obj.clientEmail) === "string";
      hasPrivateKey = typeof (obj.private_key ?? obj.privateKey) === "string";
      if (!hasProjectId || !hasClientEmail || !hasPrivateKey) {
        parseIssue = "JSON missing project_id / client_email / private_key";
      }
    } else if (extractFromBrokenServiceAccountText(raw)) {
      parseOk = true;
      hasProjectId = true;
      hasClientEmail = true;
      hasPrivateKey = true;
      parseIssue = null;
    } else {
      parseIssue =
        "FIREBASE_SERVICE_ACCOUNT_JSON present but unreadable — use FIREBASE_SERVICE_ACCOUNT_BASE64 or split FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY";
    }
  } else if (!base64EnvPresent) {
    parseIssue = "No FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_BASE64 in this deployment";
  }

  const splitVarsComplete = Boolean(
    process.env.FIREBASE_PROJECT_ID?.trim() &&
      process.env.FIREBASE_CLIENT_EMAIL?.trim() &&
      process.env.FIREBASE_PRIVATE_KEY?.trim()
  );

  const { account, source } = resolveAccount();

  if (!account && base64EnvPresent && !jsonEnvPresent) {
    parseIssue = "FIREBASE_SERVICE_ACCOUNT_BASE64 present but could not decode to a service account";
  }

  return {
    jsonEnvPresent,
    jsonEnvChars: raw.length,
    base64EnvPresent,
    parseOk,
    parseIssue: account ? null : parseIssue,
    hasProjectId: account ? true : hasProjectId,
    hasClientEmail: account ? true : hasClientEmail,
    hasPrivateKey: account ? true : hasPrivateKey,
    splitVarsComplete,
    configured: account !== null,
    adminProjectId: account?.projectId ?? null,
    source,
  };
}
