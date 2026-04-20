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

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progressed = Math.min(Math.max(-rect.top / total, 0), 1);
      const idx = Math.min(steps.length - 1, Math.floor(progressed * steps.length));
      setActive(idx);
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

      {/* Sticky storytelling */}
      <div ref={containerRef} className="relative" style={{ height: `${steps.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — text steps */}
            <div className="relative">
              <div className="space-y-12">
                {steps.map((s, i) => (
                  <div
                    key={s.num}
                    className={`transition-all duration-500 ${
                      i === active ? "opacity-100 translate-x-0" : "opacity-25 translate-x-2"
                    }`}
                  >
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-heading text-5xl text-accent/40">{s.num}</span>
                      <span className="font-body text-[11px] font-bold tracking-[3px] uppercase text-accent">
                        {s.kicker}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl text-primary font-normal mb-3">
                      {s.title}
                    </h3>
                    <p className="font-body text-[15px] text-muted-foreground leading-relaxed max-w-md">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Step indicator */}
              <div className="hidden lg:flex flex-col gap-2 absolute -left-10 top-1/2 -translate-y-1/2">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`block w-px transition-all duration-500 ${
                      i === active ? "h-12 bg-accent" : "h-6 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right — sticky image */}
            <div className="relative aspect-[4/5] lg:aspect-[4/5] overflow-hidden bg-primary/10 shadow-xl order-first lg:order-last">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url(${s.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
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
