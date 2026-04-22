export default function AboutSection() {
  const pillars = [
    {
      k: "Sélection",
      v: "Un portefeuille de marques européennes et asiatiques choisies pour leur exigence.",
    },
    {
      k: "Sur-mesure",
      v: "Une capacité de fabrication pilotée depuis l'Asie, adaptée à chaque projet.",
    },
    {
      k: "Clé en main",
      v: "Du brief initial à l'installation sur site, un interlocuteur unique.",
    },
    {
      k: "Proximité",
      v: "Une équipe basée à Maurice, au plus près de vos chantiers dans l'Océan Indien.",
    },
  ];

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

        {/* Editorial pillars — sans chiffres pour éviter les doublons avec StatsBar */}
        <div className="grid grid-cols-1 gap-[1px] bg-border">
          {pillars.map((p, i) => (
            <div key={i} className="bg-card p-8 flex items-baseline gap-6">
              <span className="font-heading text-accent text-xl shrink-0 w-10">
                0{i + 1}
              </span>
              <div>
                <div className="font-heading text-primary text-xl mb-1">{p.k}</div>
                <p className="font-body text-[14px] text-muted-foreground leading-relaxed">
                  {p.v}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
