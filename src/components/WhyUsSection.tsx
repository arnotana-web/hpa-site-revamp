const reasons = [
  {
    num: "01",
    title: "Un interlocuteur unique",
    desc: "Du brief à la livraison, une équipe dédiée gère l'ensemble de votre projet FF&E — sans fragmentation, sans perte d'information.",
  },
  {
    num: "02",
    title: "Expertise insulaire & africaine",
    desc: "Maurice, Zanzibar, Seychelles, Madagascar — nous maîtrisons les contraintes logistiques, douanières et réglementaires de chaque marché.",
  },
  {
    num: "03",
    title: "Marques pour tous les budgets",
    desc: "Notre portefeuille couvre toutes les gammes de prix — du mobilier contract accessible au mobilier outdoor premium.",
  },
  {
    num: "04",
    title: "Contrôle qualité rigoureux",
    desc: "Prototype validé, inspection en usine avant expédition, et suivi jusqu'à l'installation finale — zéro mauvaise surprise.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding bg-primary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Pourquoi HPA Concept
          </p>
          <h2 className="font-heading text-3xl md:text-[34px] text-primary-foreground font-normal leading-tight">
            Ce qui fait notre différence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((r) => (
            <div key={r.num}>
              <div className="text-6xl font-bold text-primary-foreground/10 leading-none mb-[-12px]">
                {r.num}
              </div>
              <div className="w-8 h-0.5 bg-accent mb-4" />
              <h3 className="font-heading text-lg text-hpa-gold-light mb-3">{r.title}</h3>
              <p className="font-body text-sm text-primary-foreground/75 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
