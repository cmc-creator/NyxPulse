import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { generateOrganizationSchema, generateSoftwareApplicationSchema } from "@/lib/seo-schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nyxpulse.com"),
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
    images: ["/black shiny np.png"],
  },
  icons: {
    icon: "/black shiny np.png",
    shortcut: "/black shiny np.png",
    apple: "/black shiny np.png",
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
        <ClerkProvider
          afterSignOutUrl="/"
          appearance={{
            variables: {
              colorPrimary: "#7c3aed",
              colorBackground: "#04040a",
              colorText: "#f1f5f9",
              colorTextSecondary: "#94a3b8",
              colorInputBackground: "rgba(255,255,255,0.04)",
              colorInputText: "#f1f5f9",
              borderRadius: "12px",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
