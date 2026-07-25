export type DrillRole =
  | "incident-commander"
  | "operations"
  | "communications"
  | "clinical-lead"
  | "security"
  | "scribe"
  | "runner";

export type DrillTemplate = {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  summary: string;
  objectives: string[];
  roles: { id: DrillRole; label: string; mission: string }[];
  injects: { atSecond: number; title: string; detail: string }[];
  afterActionPrompts: string[];
};

export type DrillStatus = "active" | "completed" | "aborted";

export type DrillRecord = {
  id: string;
  templateId: string;
  title: string;
  organizerUserId: string;
  organizerName: string;
  facilityName: string;
  startedAt: string;
  endedAt?: string;
  status: DrillStatus;
  participants: { name: string; roleId: DrillRole }[];
  timeline: { at: string; note: string }[];
  afterAction?: {
    whatWentWell: string;
    gaps: string;
    actions: string;
    score: number;
    completedAt: string;
  };
};
