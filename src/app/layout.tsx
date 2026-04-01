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
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const shouldRemove = (el) => {
    if (!(el instanceof HTMLElement)) return false;
    const style = window.getComputedStyle(el);
    if (style.position !== "fixed") return false;

    const rect = el.getBoundingClientRect();
    if (rect.width < 12 || rect.height < 12 || rect.width > 120 || rect.height > 120) {
      return false;
    }

    const nearBottom = Math.abs(window.innerHeight - rect.bottom) < 120;
    const nearCenter = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2) < 220;
    if (!nearBottom || !nearCenter) return false;

    const label = ((el.getAttribute("aria-label") || "") + " " + (el.getAttribute("title") || "")).toLowerCase();
    const hasVisualChild = !!el.querySelector("svg, img, canvas");

    return hasVisualChild || label.includes("clerk") || label.includes("development");
  };

  const removeArtifacts = () => {
    for (const el of document.querySelectorAll("body *")) {
      if (shouldRemove(el)) {
        el.remove();
      }
    }
  };

  window.addEventListener("load", removeArtifacts);
  const observer = new MutationObserver(removeArtifacts);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 30000);
})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <ClerkProvider
          afterSignOutUrl="/"
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
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
