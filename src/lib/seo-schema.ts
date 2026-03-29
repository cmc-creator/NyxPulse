/**
 * SEO Schema Markup Utilities
 * 
 * Generates structured data for search engines to better understand content
 * Supports: Organization, LocalBusiness, Product, Course, Event, FAQPage
 */

export interface SchemaType {
  "@context": string;
  "@type": string | string[];
  [key: string]: any;
}

/**
 * Organization Schema
 * Helps search engines understand company identity and contact info
 */
export function generateOrganizationSchema(): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NyxPulse",
    url: "https://nyxpulse.com",
    logo: "https://nyxpulse.com/black%20shiny%20np.png",
    description: "Luxury-grade emergency and safety training software for healthcare organizations",
    sameAs: [
      "https://twitter.com/nyxpulse",
      "https://linkedin.com/company/nyxpulse",
      "https://instagram.com/nyxpulse",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+1-623-806-4918",
      email: "support@nyxpulse.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

/**
 * LocalBusiness Schema
 * Helps with location-based search visibility
 */
export function generateLocalBusinessSchema(): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "NyxPulse",
    image: "https://nyxpulse.com/black%20shiny%20np.png",
    description: "Emergency and safety training platform",
    url: "https://nyxpulse.com",
    telephone: "+1-623-806-4918",
    email: "support@nyxpulse.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

/**
 * Product Schema for Pricing Page
 */
export function generateProductSchema(
  name: string,
  price: number,
  description: string,
  courseUrl: string
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: courseUrl,
    image: "https://nyxpulse.com/black%20shiny%20np.png",
    offers: {
      "@type": "Offer",
      url: courseUrl,
      priceCurrency: "USD",
      price: price.toString(),
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "NyxPulse",
    },
  };
}

/**
 * Course Schema
 * Helps search engines understand educational content
 */
export function generateCourseSchema(
  name: string,
  description: string,
  provider: string,
  duration: string,
  level: string,
  courseUrl: string,
  price: number
): SchemaType {
  const durationMap: Record<string, string> = {
    "4 hours": "PT4H",
    "6 hours": "PT6H",
    "8 hours": "PT8H",
    "16 hours (2 days)": "PT16H",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://nyxpulse.com",
    },
    duration: durationMap[duration] || "PT8H",
    educationLevel: level,
    url: courseUrl,
    courseCode: name.replace(/\s+/g, "-").toLowerCase(),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: price.toString(),
      url: courseUrl,
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * BreadcrumbList Schema
 * Helps with navigation in search results
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Event Schema for Live Sessions
 */
export function generateEventSchema(
  name: string,
  description: string,
  startDate: string,
  startTime: string,
  duration: number,
  location: string,
  url: string
): SchemaType {
  const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
  const endDate = new Date(
    new Date(startDateTime).getTime() + duration * 60000
  ).toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate: startDateTime,
    endDate: endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: location,
    },
    url,
    organizer: {
      "@type": "Organization",
      name: "NyxPulse",
      url: "https://nyxpulse.com",
    },
  };
}

/**
 * AggregateRating Schema
 * For displaying overall ratings and reviews
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5,
  worstRating: number = 1
): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue,
    bestRating,
    worstRating,
    reviewCount,
  };
}

/**
 * SoftwareApplication Schema
 * For the NyxPulse platform itself
 */
export function generateSoftwareApplicationSchema(): SchemaType {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NyxPulse",
    url: "https://nyxpulse.com",
    description:
      "Luxury-grade emergency and safety training software for healthcare organizations",
    image: "https://nyxpulse.com/black%20shiny%20np.png",
    applicationCategory: "EducationApplication",
    operatingSystem: "iOS, Android, Web",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "49",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 42,
    },
  };
}

/**
 * JSON-LD Helper
 * Creates a script tag for embedding schema
 */
export function createJsonLdScript(schema: SchemaType): string {
  return JSON.stringify(schema);
}
