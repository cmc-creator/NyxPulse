export type ChallengeKind = "scenario" | "mastery-quiz";

export type ChallengeChoice = {
  id: string;
  label: string;
  /** Short coaching note shown after the learner picks this option. */
  feedback: string;
  correct?: boolean;
  /** Scenario only: where this choice leads next. Omit to end the scenario. */
  nextNodeId?: string | null;
};

export type ScenarioNode = {
  id: string;
  prompt: string;
  context?: string;
  choices: ChallengeChoice[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: ChallengeChoice[];
  explanation: string;
};

export type CourseChallenge = {
  id: string;
  title: string;
  kind: ChallengeKind;
  /** Why this challenge exists — shown above the interaction. */
  brief: string;
  passScore: number;
  scenario?: {
    startNodeId: string;
    nodes: ScenarioNode[];
  };
  questions?: QuizQuestion[];
};

export type ChallengeAttemptResult = {
  challengeId: string;
  score: number;
  passed: boolean;
  completedAt: string;
  attempts: number;
};

export type CourseChallengeResults = {
  courseSlug: string;
  results: Record<string, ChallengeAttemptResult>;
  updatedAt: string;
};
