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

        {/* Editorial visual — citation, sans répéter les services */}
        <div className="relative bg-primary text-primary-foreground p-12 md:p-16">
          <div className="absolute top-6 left-8 font-heading text-accent text-7xl leading-none select-none">
            “
          </div>
          <blockquote className="font-heading text-2xl md:text-[28px] leading-snug text-primary-foreground mt-8">
            Nous croyons qu'un projet réussi naît d'une rencontre — entre un lieu, une intention, et des mains qui savent y répondre.
          </blockquote>
          <div className="mt-10 pt-6 border-t border-primary-foreground/20 flex items-center justify-between">
            <div>
              <div className="font-heading text-primary-foreground text-base">
                Arnaud & Pia
              </div>
              <div className="font-body text-[11px] tracking-[2px] uppercase text-primary-foreground/60 mt-1">
                Cofondateurs · HPA Concept
              </div>
            </div>
            <div className="font-heading text-accent text-xl tracking-wider">HPA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
