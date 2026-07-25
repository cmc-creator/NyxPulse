import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getChallengesForCourse } from "@/lib/challenges/catalog";
import { getCourseBySlug } from "@/lib/courses";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import {
  getChallengeResults,
  getLearnerProgressTopics,
} from "@/lib/firebase/learner-data";
import { asStringArray, type PrivateUserMetadata, type PublicUserMetadata } from "@/lib/user-metadata";
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

  const publicMetadata = (user.publicMetadata ?? {}) as PublicUserMetadata;
  const privateMetadata = (user.privateMetadata ?? {}) as PrivateUserMetadata;
  const enrolledSlugs = asStringArray(publicMetadata.courses);
  if (!enrolledSlugs.includes(slug)) {
    redirect(`/courses/${slug}`);
  }

  const completedSlugs = asStringArray(publicMetadata.completedCourses);
  const isCompleted = completedSlugs.includes(slug);
  const firebaseTopics = isFirebaseAdminConfigured()
    ? await getLearnerProgressTopics(user.id, slug)
    : null;
  const initialCompletedTopics =
    firebaseTopics ?? asStringArray(privateMetadata.courseProgress?.[slug]);

  const challenges = getChallengesForCourse(slug);
  const challengeResults = isFirebaseAdminConfigured()
    ? await getChallengeResults(user.id, slug)
    : (privateMetadata.challengeResults?.[slug] ?? null);

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
