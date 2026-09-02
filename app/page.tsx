import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/noise-overlay";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceTimelineSection } from "@/components/sections/experience-timeline-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackMarqueeSection } from "@/components/sections/stack-marquee-section";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NoiseOverlay />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <StackMarqueeSection />
        <ProjectsSection />
        <ExperienceTimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
