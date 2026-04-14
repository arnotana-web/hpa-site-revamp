const steps = [
  { num: "01", title: "Brief & Spécifications", desc: "Analyse de vos besoins, contraintes de site, budget et calendrier. Élaboration du cahier des charges FF&E." },
  { num: "02", title: "Sélection & Conception", desc: "Proposition produits catalogue ou sur mesure, moodboards, shop drawings, validation du prototype." },
  { num: "03", title: "Production & Contrôle qualité", desc: "Suivi de production en usine, inspection qualité avant expédition, coordination logistique internationale." },
  { num: "04", title: "Livraison & Installation", desc: "Dédouanement, livraison sur site, installation par nos équipes et SAV post-livraison." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Notre méthode
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight">
            De la conception à la livraison — 4 étapes clés
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((s) => (
            <div key={s.num} className="text-center relative z-10">
              <div className="w-[72px] h-[72px] rounded-full border border-primary bg-card flex items-center justify-center mx-auto mb-6 relative">
                <span className="font-heading text-base text-primary">{s.num}</span>
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[10px] font-body font-bold text-accent-foreground">
                  {parseInt(s.num)}
                </div>
              </div>
              <h4 className="font-heading text-base text-primary mb-2">{s.title}</h4>
              <p className="font-body text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
