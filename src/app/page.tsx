import HeroSection from "@/components/sections/HeroSection";
import AgencyCtaSection from "@/components/sections/AgencyCtaSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import HorizontalReel from "@/components/sections/HorizontalReel";
import MediaGrid from "@/components/sections/MediaGrid";
import ServicesSection from "@/components/sections/ServicesSection";
import CinematicSection from "@/components/sections/CinematicSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AgencyCtaSection />
      <MarqueeSection />
      <HorizontalReel />
      <MediaGrid />
      <ServicesSection />
      <CinematicSection />
      <ProcessSection />
      <CapabilitiesSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
