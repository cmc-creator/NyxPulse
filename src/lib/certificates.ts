export type IssuedCertificate = {
  id: string;
  courseSlug: string;
  issuedAt: string;
  recipientName: string;
};

function slugCode(slug: string) {
  return slug
    .split("-")
    .map((part) => part.slice(0, 3))
    .join("")
    .toUpperCase()
    .slice(0, 9);
}

export function createCertificateId(courseSlug: string) {
  const stamp = Date.now().toString(36).toUpperCase();
  const noise = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NP-${slugCode(courseSlug)}-${stamp}-${noise}`;
}

export function formatCertificateDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
