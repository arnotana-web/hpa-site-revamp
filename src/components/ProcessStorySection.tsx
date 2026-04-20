import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    kicker: "Sélectionner",
    title: "Sourcer la juste pièce",
    desc: "Nous parcourons notre portefeuille de 22 marques internationales — Marset, Viccarbe, Gervasoni, Bover… — pour proposer le mobilier qui sert votre projet : esthétique, durabilité contract, budget maîtrisé.",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
  },
  {
    num: "02",
    kicker: "Fabriquer",
    title: "Concevoir sur mesure",
    desc: "Pour les pièces uniques, nos usines partenaires en Asie produisent selon vos shop drawings. Prototype validé avant lancement série, contrôle qualité rigoureux à chaque étape.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
  },
  {
    num: "03",
    kicker: "Installer",
    title: "Livrer & poser, clé en main",
    desc: "Fret international, dédouanement, livraison sur site et installation par nos équipes. Un interlocuteur unique jusqu'à la réception des travaux — Maurice, Madagascar, Seychelles, Afrique.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
];

export default function ProcessStorySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across the whole storytelling

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const progressed = Math.min(Math.max(-rect.top / total, 0), 1);
      const idx = Math.min(
        steps.length - 1,
        Math.floor(progressed * steps.length * 0.999)
      );
      setActive(idx);
      setProgress(progressed);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="process" className="bg-card">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Notre méthode
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight">
            Trois gestes pour transformer une idée en lieu vécu
          </h2>
        </div>
      </div>

      {/* Sticky storytelling — only ONE step visible at a time */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — single text panel that swaps */}
            <div className="relative min-h-[320px]">
              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-10">
                {steps.map((_, i) => {
                  const segStart = i / steps.length;
                  const segEnd = (i + 1) / steps.length;
                  const sub = Math.min(
                    1,
                    Math.max(0, (progress - segStart) / (segEnd - segStart))
                  );
                  return (
                    <div
                      key={i}
                      className="relative h-px flex-1 bg-border overflow-hidden"
                    >
                      <div
                        className="absolute inset-y-0 left-0 bg-accent"
                        style={{ width: `${sub * 100}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Step content — animated swap */}
              <div key={`content-${active}`} className="relative animate-fade-in">
                {/* Step number — large, ghosted, behind content */}
                <div
                  className="font-heading text-[140px] md:text-[200px] leading-none text-accent/10 absolute -top-16 md:-top-24 -left-3 pointer-events-none select-none"
                  aria-hidden
                >
                  {steps[active].num}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-10 bg-accent" />
                    <span className="font-body text-[11px] font-bold tracking-[3px] uppercase text-accent">
                      Étape {steps[active].num} — {steps[active].kicker}
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl md:text-5xl text-primary font-normal mb-5 leading-tight">
                    {steps[active].title}
                  </h3>
                  <p className="font-body text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-md">
                    {steps[active].desc}
                  </p>

                  <div className="mt-8 font-body text-[11px] tracking-[2px] uppercase text-muted-foreground/60">
                    {active + 1} / {steps.length} — {active < steps.length - 1 ? "Continuez à scroller" : "Fin du parcours"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — image that swaps */}
            <div className="relative aspect-[4/5] overflow-hidden bg-primary/10 shadow-xl order-first lg:order-last">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    i === active
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  style={{
                    backgroundImage: `url(${s.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                </div>
              ))}
              <div className="absolute bottom-6 left-6 text-primary-foreground">
                <span className="font-accent italic text-2xl md:text-3xl">
                  {steps[active].kicker}.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-hpa-green-dark transition-colors"
        >
          Démarrer un projet <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
