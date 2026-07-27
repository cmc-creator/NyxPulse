import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/server";
import { getChallengesForCourse } from "@/lib/challenges/catalog";
import { getCourseBySlug } from "@/lib/courses";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  getChallengeResults,
  getLearnerProgressTopics,
} from "@/lib/firebase/learner-data";
import { asStringArray } from "@/lib/user-metadata";
import CoursePlayerClient from "./CoursePlayerClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePlayerPage({ params }: Props) {
  const { slug } = await params;
  const session = await getSessionUser();
  if (!session) redirect("/sign-in");

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const { userId, profile } = session;
  const enrolledSlugs = profile.courses;
  if (!enrolledSlugs.includes(slug)) {
    redirect(`/courses/${slug}`);
  }

  const isCompleted = profile.completedCourses.includes(slug);
  const firebaseTopics = isFirebaseAdminConfigured()
    ? await getLearnerProgressTopics(userId, slug)
    : null;
  const initialCompletedTopics =
    firebaseTopics ?? asStringArray(profile.courseProgress?.[slug]);

  const challenges = getChallengesForCourse(slug);
  const challengeResults = isFirebaseAdminConfigured()
    ? await getChallengeResults(userId, slug)
    : (profile.challengeResults?.[slug] ?? null);

  return (
    <CoursePlayerClient
      course={course}
      initialCompletedTopics={initialCompletedTopics}
      isCompleted={isCompleted}
      challenges={challenges}
      initialChallengeResults={challengeResults?.results ?? {}}
    />
  );
}
