import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { OurWorkSection } from "@/components/sections/our-work";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { ClientFeedbackSection } from "@/components/sections/client-feedback";
import { OurLocationsSection } from "@/components/sections/our-locations";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      {/* Sticky Header */}
      <Header />
      <main>
        <div className="scroll-section">
          <HeroSection />
        </div>
        <div className="scroll-section">
          <ServicesSection />
        </div>
        <div className="scroll-section">
          <OurWorkSection />
        </div>
        <div className="scroll-section">
          <WhyChooseUsSection />
        </div>
        <div className="scroll-section">
          <ClientFeedbackSection />
        </div>
        <div className="scroll-section">
          <OurLocationsSection />
        </div>
        <div className="scroll-section">
          <BlogSection />
        </div>
        <div className="scroll-section">
          <ContactSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}


