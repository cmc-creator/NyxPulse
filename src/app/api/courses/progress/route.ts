import { getSessionUser, getSessionUserId } from "@/lib/auth/server";
import { updateUserProfile } from "@/lib/auth/profile";
import { getCourseBySlug } from "@/lib/courses";
import { normalizeTopicKeys, type CourseProgressMap } from "@/lib/course-progress";
import {
  getLearnerProgressTopics,
  saveLearnerProgressTopics,
} from "@/lib/firebase/learner-data";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-env";
import { asStringArray } from "@/lib/user-metadata";

export async function POST(req: Request) {
  const session = await getSessionUser();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, profile } = session;

  let courseSlug: string;
  let completedTopics: string[];
  try {
    const body = await req.json();
    courseSlug = body?.courseSlug;
    completedTopics = Array.isArray(body?.completedTopics) ? body.completedTopics : [];
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!courseSlug || typeof courseSlug !== "string") {
    return Response.json({ error: "Missing courseSlug" }, { status: 400 });
  }

  if (!completedTopics.every((topic) => typeof topic === "string")) {
    return Response.json({ error: "completedTopics must be string keys" }, { status: 400 });
  }

  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    const enrolledSlugs = asStringArray(profile.courses);

    if (!enrolledSlugs.includes(courseSlug)) {
      return Response.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    const normalized = normalizeTopicKeys(course, completedTopics);

    if (isFirebaseAdminConfigured()) {
      await saveLearnerProgressTopics(userId, courseSlug, normalized);
    } else {
      const nextProgress: CourseProgressMap = {
        ...(profile.courseProgress ?? {}),
        [courseSlug]: normalized,
      };
      await updateUserProfile(userId, { courseProgress: nextProgress });
    }

    return Response.json({ success: true, completedTopics: normalized });
  } catch (err) {
    console.error("Failed to update course progress:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const courseSlug = new URL(req.url).searchParams.get("courseSlug");
  if (!courseSlug) {
    return Response.json({ error: "Missing courseSlug" }, { status: 400 });
  }

  try {
    if (isFirebaseAdminConfigured()) {
      const topics = await getLearnerProgressTopics(userId, courseSlug);
      return Response.json({ completedTopics: topics ?? [] });
    }

    const session = await getSessionUser();
    return Response.json({
      completedTopics: asStringArray(session?.profile.courseProgress?.[courseSlug]),
    });
  } catch (err) {
    console.error("Failed to load course progress:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
