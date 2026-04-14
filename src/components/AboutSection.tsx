import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 120, suffix: "+", label: "Projets livrés" },
  { value: 85, suffix: "+", label: "Clients satisfaits" },
  { value: 10, suffix: "+", label: "Années d'expérience" },
  { value: 7, suffix: "", label: "Marques représentées" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const step = target / (duration / 16);
          let cur = 0;
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            setCount(Math.floor(cur));
            if (cur >= target) clearInterval(t);
          }, 16);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl font-bold text-accent leading-none">
      {count}{suffix}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Qui sommes-nous
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-6">
            Meubler un espace, c'est créer un environnement où l'on aime vivre
          </h2>
          <div className="space-y-4 text-muted-foreground font-body text-[15px] leading-relaxed">
            <p>
              Chez HPA Concept, la fourniture de mobilier va bien au-delà du simple produit. C'est accompagner chaque client dans la création d'espaces où il fait bon vivre, travailler et recevoir.
            </p>
            <p>
              Notre approche allie une sélection rigoureuse de marques à une capacité de fabrication sur mesure pilotée depuis l'Asie. Nous gérons l'intégralité du processus — du brief initial jusqu'à l'installation sur site.
            </p>
            <p>
              Avec HPA Concept, vous ne choisissez pas seulement du mobilier. Vous choisissez un partenaire engagé sur la durée.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-block bg-primary text-primary-foreground px-7 py-3 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-hpa-green-dark transition-colors">
              Nous contacter
            </a>
            <a href="#services" className="inline-block border border-primary text-primary px-7 py-3 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-primary hover:text-primary-foreground transition-colors">
              Nos services
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-[2px] bg-hpa-cream-dark">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${i % 2 === 0 ? "bg-primary" : "bg-hpa-green-dark"} p-10 text-center`}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <div className="mt-3 font-body text-[11px] text-primary-foreground/70 tracking-[1.5px] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
