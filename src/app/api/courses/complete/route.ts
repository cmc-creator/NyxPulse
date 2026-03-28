import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCourseBySlug } from "@/lib/courses";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let courseSlug: string;
  try {
    const body = await req.json();
    courseSlug = body?.courseSlug;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!courseSlug || typeof courseSlug !== "string") {
    return Response.json({ error: "Missing courseSlug" }, { status: 400 });
  }

  // Validate the course exists
  if (!getCourseBySlug(courseSlug)) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const enrolledSlugs = (user.publicMetadata?.courses as string[]) ?? [];

    // Must be enrolled first
    if (!enrolledSlugs.includes(courseSlug)) {
      return Response.json({ error: "Not enrolled in this course" }, { status: 403 });
    }

    const completedSlugs = (user.publicMetadata?.completedCourses as string[]) ?? [];

    if (!completedSlugs.includes(courseSlug)) {
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          completedCourses: [...completedSlugs, courseSlug],
        },
      });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Failed to mark course complete:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
