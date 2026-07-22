import type { Course } from "@/lib/courses";

export type CourseProgressMap = Record<string, string[]>;

export function getTopicKey(moduleIdx: number, topicIdx: number) {
  return `${moduleIdx}-${topicIdx}`;
}

export function getAllTopicKeys(course: Course): string[] {
  return course.modules.flatMap((module, moduleIdx) =>
    module.topics.map((_, topicIdx) => getTopicKey(moduleIdx, topicIdx))
  );
}

export function isCourseProgressComplete(course: Course, completedTopics: string[]): boolean {
  const required = getAllTopicKeys(course);
  if (required.length === 0) return false;
  const completed = new Set(completedTopics);
  return required.every((key) => completed.has(key));
}

export function normalizeTopicKeys(course: Course, topicKeys: string[]): string[] {
  const allowed = new Set(getAllTopicKeys(course));
  return Array.from(new Set(topicKeys.filter((key) => allowed.has(key))));
}
