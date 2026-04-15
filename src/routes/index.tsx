import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import MarketsSection from "@/components/MarketsSection";
import BrandsSection from "@/components/BrandsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RealisationsSection from "@/components/RealisationsSection";
import CtaBanner from "@/components/CtaBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HPA Concept — Mobilier & FF&E | Île Maurice, Afrique, Océan Indien" },
      { name: "description", content: "Solutions mobilier complètes pour l'hôtellerie, le résidentiel et les espaces commerciaux. De la sélection à l'installation — Maurice, Madagascar, Seychelles, Zanzibar." },
      { property: "og:title", content: "HPA Concept — Mobilier & FF&E" },
      { property: "og:description", content: "Votre partenaire clé en main pour la fourniture et la gestion de mobilier FF&E dans l'Océan Indien et en Afrique." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <div className="hpa-divider" />
      <ServicesSection />
      <WhyUsSection />
      <MarketsSection />
      <BrandsSection />
      <ProcessSection />
      <TestimonialsSection />
      <RealisationsSection />
      <CtaBanner />
      <ContactSection />
      <Footer />
    </div>
  );
}
