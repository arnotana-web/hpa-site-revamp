import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const expertises = [
  {
    id: "hotel",
    anchor: "expertise-hotel",
    label: "Hôtellerie & Resorts",
    tag: "Hospitality",
    headline: "Des espaces qui racontent une histoire",
    intro: "HPA Concept accompagne les hôteliers dans la fourniture complète de leur lot mobilier — des chambres aux espaces communs, des restaurants aux villas privées. Nous maîtrisons les exigences du contract hôtelier : durabilité, esthétique, conformité aux normes et respect des délais.",
    points: ["Spécifications FF&E sur mesure par type d'espace","Fabrication sur commande avec validation prototype","Contrôle qualité avant expédition","Livraison et installation clé en main sur site","Expérience dans l'Océan Indien et en Afrique de l'Est"],
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80",
    cta: "Discuter de votre projet hôtelier",
  },
  {
    id: "residentiel",
    anchor: "expertise-residentiel",
    label: "Résidentiel",
    tag: "Résidentiel",
    headline: "Meubler chaque espace de vie avec précision",
    intro: "Des villas privées aux résidences premium, HPA Concept propose des solutions mobilier complètes pour les promoteurs immobiliers, les architectes d'intérieur et les particuliers exigeants.",
    points: ["Sélection de marques adaptées à chaque projet","Packs mobilier complets pour appartements et villas","Coordination avec architectes et décorateurs","Livraison et installation par nos équipes","Suivi personnalisé de A à Z"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    cta: "Parler à un conseiller",
  },
  {
    id: "bureaux",
    anchor: "expertise-bureaux",
    label: "Bureaux & Espaces commerciaux",
    tag: "Commercial",
    headline: "Des environnements de travail pensés pour la performance",
    intro: "Showrooms, coworking, bureaux d'entreprise, points de vente — HPA Concept fournit des solutions mobilier adaptées aux contraintes du commercial : robustesse, image de marque, ergonomie et praticité.",
    points: ["Mobilier contract adapté à chaque usage","Conseil en agencement et disposition des espaces","Intégration de l'identité visuelle","Gestion des délais serrés d'ouverture","Références à Maurice, Madagascar et Zanzibar"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    cta: "Demander un devis commercial",
  },
];

export default function MarketsSection() {
  const [active, setActive] = useState(0);
  const current = expertises[active];

  return (
    <section id="expertise" className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Nos expertises
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Des solutions adaptées à chaque secteur
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA Concept intervient sur trois grands marchés, avec une approche sur mesure pour chacun.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {expertises.map((exp, i) => (
            <button
              key={exp.id}
              id={exp.anchor}
              onClick={() => setActive(i)}
              className={`px-6 py-3 font-body text-[13px] font-semibold uppercase tracking-wide border-b-2 transition-all ${
                active === i
                  ? "border-accent text-primary bg-secondary"
                  : "border-transparent text-muted-foreground hover:text-primary hover:border-primary/30"
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center animate-fade-in" key={current.id}>
          {/* Text */}
          <div>
            <span className="inline-block text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-3">
              {current.tag}
            </span>
            <h3 className="font-heading text-2xl md:text-3xl text-primary font-normal leading-tight mb-4">
              {current.headline}
            </h3>
            <p className="text-muted-foreground font-body text-[15px] leading-relaxed mb-6">
              {current.intro}
            </p>
            <ul className="space-y-3 mb-8">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] font-body text-foreground">
                  <Check size={16} className="text-accent mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-body text-[13px] font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              {current.cta}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={current.image}
              alt={current.headline}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
