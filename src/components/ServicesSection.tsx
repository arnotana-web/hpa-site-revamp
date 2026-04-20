import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "FF&E & Mobilier de projet",
    desc: "Sélection, approvisionnement et coordination complète de votre lot mobilier — pour l'hôtellerie, le résidentiel et les espaces commerciaux.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
  },
  {
    title: "Fabrication sur mesure",
    desc: "Shop drawings, validation prototype, production en usine partenaire en Asie, contrôle qualité rigoureux avant expédition.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
  },
  {
    title: "Conseil & Conception",
    desc: "Moodboards, spécifications techniques, sélection de matériaux — nous vous accompagnons dans la définition de votre identité intérieure.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  },
  {
    title: "Gestion de projet",
    desc: "Coordination fournisseurs, suivi des commandes, logistique internationale — un interlocuteur unique pour l'ensemble de votre lot mobilier.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    title: "Livraison & Installation",
    desc: "Gestion des contraintes insulaires et africaines, dédouanement, livraison sur site et installation par des équipes spécialisées.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "Distribution de marques",
    desc: "HPA représente et distribue un portefeuille de marques sélectionnées — La Redoute Intérieur, AM.PM, Woven, Otazen, Skyline Design.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Ce que nous faisons
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Nos services — du conseil à la livraison
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA Concept assure l'ensemble de la chaîne de valeur mobilier pour votre projet, quel que soit son envergure ou sa localisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <a
              key={i}
              href="#contact"
              className="bg-card overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl block"
            >
              <div
                className="h-56 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${s.image})` }}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
              <div className="p-7">
                <h3 className="font-heading text-lg text-primary mb-3">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-body text-xs font-bold text-primary tracking-[1px] uppercase border-b border-primary pb-0.5 group-hover:gap-3 transition-all">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
