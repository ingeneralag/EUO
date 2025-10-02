import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { OurWorkSection } from "@/components/sections/our-work";
import { LastWorkSection } from "@/components/sections/last-work";
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
      {/* Sticky Header */}
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <OurWorkSection />
        <LastWorkSection />
        <WhyChooseUsSection />
        <ClientFeedbackSection />
        <OurLocationsSection />
        <BlogSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}


