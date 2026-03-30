import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import Hero from "@/components/Hero";
import LearnerExperienceShowcase from "@/components/LearnerExperienceShowcase";
import PlatformShowcase from "@/components/PlatformShowcase";
import Features from "@/components/Features";
import CoursesPreview from "@/components/CoursesPreview";
import LearningPaths from "@/components/LearningPaths";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <StarField />
      <Navbar />
      <main className="relative z-10 bg-black">
        <Hero />
        <div className="section-divider" />
        <PlatformShowcase />
        <div className="section-divider" />
        <LearnerExperienceShowcase />
        <div className="section-divider" />
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.015),transparent_50%)]" />
          <Features />
        </div>
        <div className="section-divider" />
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.008),transparent)]" />
          <CoursesPreview />
        </div>
        <div className="section-divider" />
        <LearningPaths />
        <div className="section-divider" />
        <Pricing />
        <div className="section-divider" />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
