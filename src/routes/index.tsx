import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import MarketsSection from "@/components/MarketsSection";
import RegionMapSection from "@/components/RegionMapSection";

import ProcessStorySection from "@/components/ProcessStorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RealisationsSection from "@/components/RealisationsSection";
import CtaBanner from "@/components/CtaBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

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
      <SplashScreen />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <Reveal><AboutSection /></Reveal>
      <Reveal><TeamSection /></Reveal>
      <div className="hpa-divider" />
      <Reveal><ServicesSection /></Reveal>
      <Reveal><WhyUsSection /></Reveal>
      <Reveal><MarketsSection /></Reveal>
      <Reveal><RegionMapSection /></Reveal>
      
      <ProcessStorySection />
      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><RealisationsSection /></Reveal>
      <Reveal><CtaBanner /></Reveal>
      <Reveal><ContactSection /></Reveal>
      <Footer />
    </div>
  );
}
