import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/server";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      courses: user.profile.courses,
      completedCourses: user.profile.completedCourses,
      plan: user.profile.plan,
      instructor: Boolean(user.profile.instructor),
    },
  });
}
