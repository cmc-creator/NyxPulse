import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCourseBySlug } from "@/lib/courses";
import { normalizeTopicKeys, type CourseProgressMap } from "@/lib/course-progress";
import {
  getLearnerProgressTopics,
  saveLearnerProgressTopics,
} from "@/lib/firebase/learner-data";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { asStringArray, type PrivateUserMetadata, type PublicUserMetadata } from "@/lib/user-metadata";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
    const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
    const enrolledSlugs = asStringArray(publicMetadata.courses);

    if (!enrolledSlugs.includes(courseSlug)) {
      return Response.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    const normalized = normalizeTopicKeys(course, completedTopics);

    if (isFirebaseAdminConfigured()) {
      await saveLearnerProgressTopics(userId, courseSlug, normalized);
    } else {
      const nextProgress: CourseProgressMap = {
        ...(privateMetadata.courseProgress ?? {}),
        [courseSlug]: normalized,
      };

      await clerk.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...privateMetadata,
          courseProgress: nextProgress,
        },
      });
    }

    return Response.json({ success: true, completedTopics: normalized });
  } catch (err) {
    console.error("Failed to update course progress:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { userId } = await auth();
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

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
    return Response.json({
      completedTopics: asStringArray(privateMetadata.courseProgress?.[courseSlug]),
    });
  } catch (err) {
    console.error("Failed to load course progress:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
