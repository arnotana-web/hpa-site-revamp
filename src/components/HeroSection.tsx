import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroHotel from "@/assets/hero-hotel.jpg";
import heroCustom from "@/assets/hero-custom.jpg";
import heroResidential from "@/assets/hero-residential.jpg";

const slides = [
  {
    image: heroHotel,
    badge: "FF&E Clé en main",
    title: "Solutions mobilier complètes pour l'hôtellerie et l'immobilier",
    subtitle: "De la sélection des produits à la livraison sur site — HPA Concept pilote chaque étape de votre projet FF&E, de Maurice à l'Afrique.",
    cta: "Discuter de votre projet",
    ctaOutline: "Nos services",
  },
  {
    image: heroCustom,
    badge: "Fabrication sur mesure",
    title: "Mobilier conçu et fabriqué selon vos spécifications exactes",
    subtitle: "Shop drawings, validation prototype, production en masse et contrôle qualité — tout est géré par notre équipe, de A à Z.",
    cta: "Lancer un projet",
    ctaOutline: "Notre processus",
  },
  {
    image: heroResidential,
    badge: "Marques sélectionnées",
    title: "Un catalogue de marques soigneusement sélectionnées pour chaque projet",
    subtitle: "La Redoute Intérieur, Gervasoni, Woven, Rols Carpet et plus — des marques adaptées à chaque budget et ambiance.",
    cta: "Découvrir les marques",
    ctaOutline: "Nous contacter",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-hpa-green-dark">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: i === current ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-hpa-green-dark/90 via-hpa-green-dark/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-end h-full max-w-[1400px] mx-auto px-6 md:px-16 pb-16 md:pb-20">
        <div className="max-w-2xl animate-fade-up" key={current}>
          <span className="inline-block bg-accent text-accent-foreground text-[11px] font-body font-bold tracking-[2px] uppercase px-4 py-1.5 mb-6">
            {slide.badge}
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] text-primary-foreground font-normal leading-[1.2] mb-5">
            {slide.title}
          </h1>
          <p className="text-primary-foreground/85 text-base md:text-lg font-body font-light leading-relaxed mb-8 max-w-xl">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-block bg-accent text-accent-foreground px-8 py-3.5 font-body text-[13px] font-bold tracking-[1.5px] uppercase hover:bg-primary-foreground hover:text-hpa-green-dark transition-colors"
            >
              {slide.cta}
            </a>
            <a
              href="#services"
              className="inline-block border border-primary-foreground/50 text-primary-foreground px-8 py-3.5 font-body text-[13px] font-semibold tracking-[1px] uppercase hover:bg-primary-foreground/10 hover:border-primary-foreground transition-colors"
            >
              {slide.ctaOutline}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          onClick={prev}
          className="w-11 h-11 border border-primary-foreground/40 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="w-11 h-11 border border-primary-foreground/40 flex items-center justify-center text-primary-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-6 md:right-16 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[3px] transition-all duration-300 ${
              i === current ? "w-12 bg-accent" : "w-7 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
