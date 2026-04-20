import { useEffect, useRef, useState } from "react";

const team = [
  { name: "Arnaud Bourgeois", role: "Co-Fondateur & CEO", image: "https://hpa-concept.com/wp-content/uploads/2021/11/HPA-Staff-Arnaud-Bourgeois.jpg" },
  { name: "Pia Bourgeois", role: "Co-Fondatrice", image: "https://hpa-concept.com/wp-content/uploads/2021/11/HPA-Staff-Pia-Bourgeois.jpg" },
  { name: "Lainie Gowry", role: "Designer d'intérieur", image: "https://hpa-concept.com/wp-content/uploads/2024/09/Lainie-scaled.jpg" },
  { name: "Vanessa Verte", role: "Commercial & Marketing", image: "https://hpa-concept.com/wp-content/uploads/2026/02/Vverte-1-1.png" },
  { name: "Elodie Riche", role: "Responsable Showroom", image: "https://hpa-concept.com/wp-content/uploads/2026/03/image001-1-3.png" },
  { name: "Kersley Pompeia", role: "Admin & Logistique", image: "https://hpa-concept.com/wp-content/uploads/2026/02/image001-1-2-1.jpg" },
  { name: "Roelene Nelle", role: "Sales & BD — Zanzibar", image: "https://hpa-concept.com/wp-content/uploads/2026/02/R.nelle_.jpg" },
];

export default function TeamSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  // Sequential reveal on scroll
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(
      gridRef.current.querySelectorAll<HTMLElement>("[data-team-card]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setRevealedCount((c) => Math.max(c, idx + 1));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="equipe" className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto">
        {/* Header — éditorial, aligné à gauche */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-[color:var(--hpa-tabac)] mb-4">
              — Notre équipe
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary font-normal leading-[1.05] tracking-[-0.01em]">
              Les visages
              <br />
              <span className="italic font-light text-[color:var(--hpa-tabac)]">
                derrière chaque projet.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <div className="h-px w-16 bg-[color:var(--hpa-tabac)] mb-6" />
            <p className="text-muted-foreground font-body text-[15px] leading-[1.8] max-w-md">
              Une maison portée par sept personnes — designers, commerciaux,
              logisticiens — réparties entre Maurice et Zanzibar. Chacune
              apporte son exigence à la sélection, la fabrication et
              l'installation de vos espaces.
            </p>
          </div>
        </div>

        {/* Grille éditoriale 3:4 */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16"
        >
          {team.map((m, i) => {
            const revealed = i < revealedCount;
            return (
              <figure
                key={m.name}
                data-team-card
                data-index={i}
                className="group"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 700ms ease-out ${i * 80}ms, transform 700ms ease-out ${i * 80}ms`,
                }}
              >
                {/* Portrait — ratio 3:4, N&B → couleur au hover */}
                <div className="relative overflow-hidden bg-[color:var(--hpa-pierre)]/40 aspect-[3/4]">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-[1.05] brightness-[0.97] transition-all duration-[900ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.04] group-hover:brightness-100"
                  />
                  {/* Voile indigo subtil qui disparaît au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--hpa-indigo)]/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700" />
                  {/* Hairline doré en bas qui se déploie au hover */}
                  <span className="pointer-events-none absolute bottom-0 left-0 h-px bg-[color:var(--hpa-tabac)] w-0 group-hover:w-full transition-[width] duration-700 ease-out" />
                </div>

                {/* Caption — aligné à gauche, typo éditoriale */}
                <figcaption className="mt-5">
                  <h4 className="font-heading text-[17px] md:text-[19px] text-primary leading-tight tracking-[-0.01em]">
                    {m.name}
                  </h4>
                  <p className="font-body text-[10px] text-[color:var(--hpa-tabac)] font-semibold tracking-[2px] uppercase mt-1.5">
                    {m.role}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Hairline doré décoratif en bas de section */}
        <div className="mt-20 md:mt-24 flex items-center gap-6">
          <div className="h-px flex-1 bg-[color:var(--hpa-tabac)]/30" />
          <span className="font-body text-[10px] tracking-[3px] uppercase text-[color:var(--hpa-tabac)]">
            Maurice · Zanzibar
          </span>
          <div className="h-px flex-1 bg-[color:var(--hpa-tabac)]/30" />
        </div>
      </div>
    </section>
  );
}
