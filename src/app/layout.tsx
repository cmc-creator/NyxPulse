import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { generateOrganizationSchema, generateSoftwareApplicationSchema } from "@/lib/seo-schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://nyxpulse.com"),
  title: "NyxPulse | Next-Generation Emergency & Safety Training",
  description:
    "NyxPulse delivers world-class CPR, BLS, De-escalation, Emergency Management, ICS/HICS, and OSHA training — live and virtual — for healthcare professionals and organizations.",
  keywords: [
    "CPR training",
    "BLS certification",
    "de-escalation training",
    "emergency management",
    "ICS HICS training",
    "OSHA safety",
    "healthcare training",
    "virtual training",
    "NyxPulse",
    "NyxCollective",
  ],
  openGraph: {
    title: "NyxPulse | Next-Generation Emergency & Safety Training",
    description: "Train smarter. Respond faster. Save lives.",
    type: "website",
    images: ["/nyxpulse-logo.png"],
  },
  icons: {
    icon: "/nyxpulse-logo.png",
    shortcut: "/nyxpulse-logo.png",
    apple: "/nyxpulse-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSoftwareApplicationSchema()),
          }}
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
