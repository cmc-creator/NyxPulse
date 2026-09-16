import os from "node:os";
import path from "node:path";

function baseStorageDir() {
  return path.join(os.tmpdir(), "nyxpulse");
}

export function resolveStoragePath(envVarName: string, fileName: string) {
  const configured = process.env[envVarName];
  if (configured) return configured;
  return path.join(baseStorageDir(), fileName);
}
