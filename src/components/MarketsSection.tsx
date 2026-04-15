import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const expertises = [
  {
    id: "hotel",
    anchor: "expertise-hotel",
    label: "Hôtellerie & Resorts",
    tag: "Hospitality",
    headline: "Le FF&E hôtelier, de A à Z",
    intro:
      "HPA Concept est le partenaire mobilier des opérateurs hôteliers et des développeurs de resort dans l'Océan Indien et en Afrique. Nous couvrons l'intégralité de la chaîne — de la spécification technique jusqu'à l'installation sur site — pour chaque catégorie d'espace : chambres, suites, villas, lobbies, restaurants, spas et espaces extérieurs.",
    process: [
      { step: "01", title: "Brief & spécifications", desc: "Analyse du programme, des standards de la marque hôtelière et des contraintes budgétaires. Élaboration des spécifications FF&E par catégorie d'espace." },
      { step: "02", title: "Sélection & sourcing", desc: "Sélection dans notre portefeuille de marques contract ou fabrication sur mesure via nos usines partenaires en Asie. Shop drawings et validation des finitions." },
      { step: "03", title: "Prototype & validation", desc: "Production d'un prototype pour validation avant lancement de la série. Contrôle qualité rigoureux en usine avant expédition." },
      { step: "04", title: "Logistique & installation", desc: "Gestion du fret international, dédouanement, livraison sur site et installation par nos équipes. Un interlocuteur unique jusqu'à la réception des travaux." },
    ],
    points: [
      "Mobilier contract certifié pour usage intensif",
      "Fabrication sur mesure avec validation prototype",
      "Références : Maurice, Seychelles, Zanzibar, Madagascar",
      "Gestion des contraintes insulaires et logistiques",
      "Respect des délais d'ouverture hôtelière",
    ],
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80",
    cta: "Discuter de votre projet hôtelier",
  },
  {
    id: "residentiel",
    anchor: "expertise-residentiel",
    label: "Résidentiel",
    tag: "Résidentiel",
    headline: "Des packs mobilier pour chaque niveau de projet",
    intro:
      "HPA Concept accompagne les promoteurs immobiliers, les architectes d'intérieur et les investisseurs dans la fourniture complète de leur lot mobilier résidentiel. Nous proposons trois niveaux de pack — Essential, Premium et Prestige — adaptés à chaque positionnement de projet et à chaque budget.",
    packs: [
      { name: "Essential", desc: "Mobilier fonctionnel et soigné pour des appartements à fort rendement locatif. Sélection de marques accessibles, livraison clé en main.", color: "bg-secondary" },
      { name: "Premium", desc: "Alliance de marques sélectionnées et de pièces sur mesure pour des résidences haut de gamme. Conseil en décoration inclus.", color: "bg-primary/10" },
      { name: "Prestige", desc: "Curation complète, mobilier custom, matériaux nobles — pour villas d'exception et résidences de luxe. Suivi personnalisé de A à Z.", color: "bg-accent/10" },
    ],
    points: [
      "Packs mobilier complets : salon, chambre, salle à manger, terrasse",
      "Marques : La Redoute Intérieur, AM.PM, Woven, Otazen, Gervasoni",
      "Fabrication sur mesure pour les pièces spécifiques",
      "Coordination avec architectes et décorateurs",
      "Livraison et installation par nos équipes sur site",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    cta: "Demander une étude résidentielle",
  },
  {
    id: "bureaux",
    anchor: "expertise-bureaux",
    label: "Bureaux & Espaces commerciaux",
    tag: "Commercial",
    headline: "Des environnements pensés pour la performance",
    intro:
      "Showrooms, espaces de coworking, bureaux d'entreprise, points de vente, restaurants — HPA Concept fournit des solutions mobilier adaptées aux contraintes du commercial : robustesse, image de marque, ergonomie et praticité. Nous gérons l'intégralité du lot mobilier, de la conception à la pose.",
    points: [
      "Mobilier contract adapté à chaque usage et trafic",
      "Conseil en agencement et disposition des espaces",
      "Intégration de l'identité visuelle de l'enseigne",
      "Gestion des délais serrés propres aux ouvertures",
      "Références à Maurice, Madagascar et Zanzibar",
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    cta: "Demander une étude commerciale",
  },
];

export default function MarketsSection() {
  const [active, setActive] = useState(0);
  const ex = expertises[active];

  return (
    <section id="expertise" className="section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">Expertise</p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Trois secteurs, une expertise commune
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA Concept adapte son approche à chaque type de projet avec la même rigueur et le même engagement.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {expertises.map((e, i) => (
            <button
              key={e.id}
              id={e.anchor}
              onClick={() => setActive(i)}
              className={`px-6 py-3 font-body text-[12px] font-bold tracking-[1.5px] uppercase transition-all border ${
                active === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-primary border-border hover:border-primary"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>

        {/* Hero image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card overflow-hidden shadow-lg mb-8" key={ex.id}>
          <div
            className="h-72 lg:h-auto bg-cover bg-center relative"
            style={{ backgroundImage: `url(${ex.image})` }}
          >
            <div className="absolute inset-0 bg-primary/30" />
            <span className="absolute top-6 left-6 bg-accent text-primary-foreground font-body text-[10px] font-bold tracking-[2px] uppercase px-3 py-1">
              {ex.tag}
            </span>
          </div>
          <div className="p-10 lg:p-14 flex flex-col justify-center">
            <h3 className="font-heading text-2xl md:text-3xl text-primary font-normal mb-5">{ex.headline}</h3>
            <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-8">{ex.intro}</p>
            <ul className="space-y-3 mb-10">
              {ex.points.map((p) => (
                <li key={p} className="flex items-start gap-3 font-body text-sm text-foreground">
                  <Check size={16} className="text-accent mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-primary/90 transition-colors self-start"
            >
              {ex.cta} <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Process steps — Hôtellerie only */}
        {"process" in ex && ex.process && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-border mb-8">
            {ex.process.map((p) => (
              <div key={p.step} className="bg-card p-8">
                <div className="text-3xl font-heading text-accent/40 font-bold mb-3">{p.step}</div>
                <h4 className="font-body text-sm font-bold text-primary uppercase tracking-[1px] mb-2">{p.title}</h4>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Packs — Résidentiel only */}
        {"packs" in ex && ex.packs && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-border">
            {ex.packs.map((pack) => (
              <div key={pack.name} className={`${pack.color} p-8`}>
                <h4 className="font-heading text-xl text-primary mb-3">{pack.name}</h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{pack.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
