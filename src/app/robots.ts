import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://nyxpulse.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/accept-invite", "/success", "/ready/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
