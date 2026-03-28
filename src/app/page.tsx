import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CoursesPreview from "@/components/CoursesPreview";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="section-divider" />
        <Features />
        <div className="section-divider" />
        <CoursesPreview />
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
