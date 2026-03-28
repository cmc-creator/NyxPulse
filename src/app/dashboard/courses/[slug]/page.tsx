import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";
import CoursePlayerClient from "./CoursePlayerClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePlayerPage({ params }: Props) {
  const { slug } = await params;
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const enrolledSlugs = (user.publicMetadata?.courses as string[]) ?? [];
  if (!enrolledSlugs.includes(slug)) {
    redirect(`/courses/${slug}`);
  }

  const completedSlugs = (user.publicMetadata?.completedCourses as string[]) ?? [];
  const isCompleted = completedSlugs.includes(slug);

  return <CoursePlayerClient course={course} userId={user.id} isCompleted={isCompleted} />;
}
