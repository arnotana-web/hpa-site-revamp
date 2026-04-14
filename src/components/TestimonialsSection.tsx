const testimonials = [
  {
    text: "HPA Concept a géré l'intégralité du lot mobilier de notre resort à Maurice. De la sélection produits au suivi logistique, tout a été parfaitement coordonné. Un interlocuteur unique, ça change tout.",
    initials: "SD",
    name: "Sarah D.",
    role: "Directrice de projet — Resort 5 étoiles, Île Maurice",
  },
  {
    text: "Nous avons fait appel à HPA pour meubler 48 villas dans notre programme PDS. Leur connaissance du marché local et leur réseau de fournisseurs asiatiques nous ont permis de tenir les délais et le budget.",
    initials: "ML",
    name: "Marc L.",
    role: "Promoteur immobilier — Programme Smart City, Maurice",
  },
  {
    text: "Arnaud et son équipe ont su proposer des pièces qui correspondaient exactement à l'identité de notre lodge à Zanzibar — du mobilier outdoor robuste, esthétique, et adapté au climat tropical.",
    initials: "JA",
    name: "James A.",
    role: "General Manager — Boutique Lodge, Zanzibar",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Ils nous font confiance
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card p-9 border-t-[3px] border-accent">
              <div className="font-heading text-6xl text-hpa-cream-dark leading-none mb-4">"</div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed italic mb-6">
                {t.text}
              </p>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground font-body shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-primary">{t.name}</div>
                  <div className="font-body text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
