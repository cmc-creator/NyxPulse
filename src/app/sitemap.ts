import type { MetadataRoute } from "next";
import { courses, learningPaths } from "@/lib/courses";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/courses",
    "/learning-paths",
    "/instructors",
    "/instructors/jeremy",
    "/certifications/american-red-cross",
    "/about",
    "/contact",
    "/faq",
    "/affiliates",
    "/lms-integrations",
    "/privacy",
    "/terms",
    "/hipaa",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${BASE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...courses.map((course) => ({
      url: `${BASE_URL}/courses/${course.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...learningPaths.map((path) => ({
      url: `${BASE_URL}/learning-paths/${path.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
