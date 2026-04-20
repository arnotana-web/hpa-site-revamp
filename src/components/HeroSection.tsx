import { useEffect, useState } from "react";
import hpaLogo from "@/assets/hpa-logo.png";
import heroVideo from "@/assets/hero-cinematic.mp4.asset.json";

const words = ["Mobilier,", "luminaires,"];
const accentWord = "accessoires.";
const rotatingMarkets = ["l'hôtellerie", "les résidences", "les workspaces"];

const heroBrands = [
  "Marset", "Viccarbe", "Gervasoni", "Bover", "Expormim",
  "Skyline Design", "Stua", "AM.PM", "Papadatos", "LZF Lamps",
  "Inclass", "Joquer", "Rols Carpet", "Ezpeleta", "Artie",
];
const brandLoop = [...heroBrands, ...heroBrands];

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallaxe douce sur la vidéo (effet Ken Burns combiné au scroll)
  const parallax = Math.min(scrollY * 0.35, 200);

  return (
    <section className="relative min-h-screen overflow-hidden bg-hpa-indigo-deep">
      {/* Vidéo de fond cinématique */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `translate3d(0, ${parallax}px, 0)` }}
      >
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover scale-110 animate-[heroKenBurns_22s_ease-in-out_infinite_alternate]"
        />
        {/* Overlay sombre + gradient indigo pour lisibilité */}
        <div className="absolute inset-0 bg-hpa-indigo-deep/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-hpa-indigo-deep/40 via-hpa-indigo-deep/30 to-hpa-indigo-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-hpa-indigo-deep/70 via-transparent to-hpa-indigo-deep/40" />
      </div>

      {/* Logo fantôme décoratif */}
      <img
        src={hpaLogo}
        alt=""
        aria-hidden
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[60vw] max-w-[800px] opacity-[0.04] pointer-events-none select-none z-[1]"
      />

      {/* Top label */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-10">
        <span className="font-body text-[11px] tracking-[4px] uppercase text-hpa-creme/70">
          Maurice · Océan Indien · Afrique
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-[1400px] mx-auto px-6 md:px-16 pt-24 pb-40">
        <div className="max-w-4xl">
          <h1 className="font-heading font-black text-hpa-creme leading-[0.95] tracking-[-0.04em] text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw]">
            {words.map((w, i) => (
              <span
                key={w}
                className="inline-block mr-[0.25em] opacity-0 animate-[heroWordIn_0.9s_cubic-bezier(.2,.8,.2,1)_forwards]"
                style={{ animationDelay: `${0.15 + i * 0.18}s` }}
              >
                {w}
              </span>
            ))}
            <br />
            <span
              className="inline-block font-accent font-normal italic text-accent tracking-normal opacity-0 animate-[heroWordIn_1.1s_cubic-bezier(.2,.8,.2,1)_forwards]"
              style={{ animationDelay: `${0.15 + words.length * 0.18}s` }}
            >
              {accentWord}
            </span>
          </h1>

          <p
            className="mt-10 max-w-xl font-accent italic text-hpa-creme/85 text-lg md:text-xl leading-relaxed opacity-0 animate-[heroWordIn_0.9s_ease-out_forwards]"
            style={{ animationDelay: "0.9s" }}
          >
            Sourceur de mobilier pour l'hôtellerie, les résidences et les
            espaces de travail — Maurice, océan Indien, Afrique.
          </p>
        </div>

        {/* CTA */}
        <div
          className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8 opacity-0 animate-[heroWordIn_0.9s_ease-out_forwards]"
          style={{ animationDelay: "1.1s" }}
        >
          <a
            href="#realisations"
            className="group ml-auto inline-flex items-center gap-3 font-accent italic text-accent text-xl md:text-2xl hover:gap-5 transition-all"
          >
            Voir nos projets
            <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-0 animate-[heroWordIn_1s_ease-out_forwards]" style={{ animationDelay: "1.4s" }}>
          <span className="font-body text-[10px] tracking-[3px] uppercase text-hpa-creme/60">Découvrir</span>
          <div className="h-10 w-px bg-hpa-creme/40 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-3 bg-accent animate-[scrollHint_2.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Marquee marques en bas du hero */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-hpa-creme/15 bg-hpa-indigo-deep/60 backdrop-blur-sm py-5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-3 flex items-center justify-between">
          <span className="font-body text-[10px] tracking-[3px] uppercase text-hpa-creme/60">
            Marques représentées
          </span>
          <span className="font-accent italic text-hpa-creme/50 text-sm hidden md:inline">
            +20 maisons européennes & internationales
          </span>
        </div>
        <div className="marquee-mask">
          <div className="flex gap-10 animate-marquee w-max" style={{ animationDuration: "40s" }}>
            {brandLoop.map((b, i) => (
              <span
                key={i}
                className="shrink-0 font-heading text-hpa-creme/80 text-xl md:text-2xl tracking-tight"
              >
                {b}
                <span className="ml-10 text-accent/60">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
