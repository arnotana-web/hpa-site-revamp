import { useState } from "react";
import { ArrowRight, MapPin, Tag } from "lucide-react";

const realisations = [
  {
    
    id: 1,
    title: "Club Med St Anne",
    category: "Hôtellerie",
    location: "Seychelles",
    desc: "Fourniture mobilier pour le village Club Med St Anne aux Seychelles — chambres, espaces communs et zones de restauration.",
    tags: ["Club Med", "Seychelles", "FF&E"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/02/st-anne-18.png",
    color: "border-accent",
  },
  {
    id: 2,
    title: "Maradiva Hotel",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Fourniture complète et fabrication sur mesure pour le Maradiva Villas Resort & Spa — shop drawings, prototype, production et installation clé en main.",
    tags: ["FF&E complet", "Fabrication sur mesure", "Villas & Spa"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/MARADIVA2.jpg",
    color: "border-primary",
  },
  {
    id: 3,
    title: "Axian Group — Bureaux",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Aménagement des bureaux du groupe Axian à Maurice — mobilier de bureau, espaces collaboratifs et zones de direction.",
    tags: ["Axian Group", "Corporate", "Open space"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Axian-University-30.jpg",
    color: "border-accent",
  },
  {
    id: 4,
    title: "Bank of Africa — Bureaux",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Fourniture mobilier pour les bureaux de Bank of Africa — espaces de travail fonctionnels et représentatifs.",
    tags: ["Secteur financier", "Contract", "BOA"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/BANK-OF-AFRICA4.jpg",
    color: "border-primary",
  },
  {
    id: 5,
    title: "Appartement Deco Pack",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Pack décoration complet pour appartement résidentiel — mobilier La Redoute Intérieur, livraison et installation incluses.",
    tags: ["Deco Pack", "La Redoute Intérieur", "Clé en main"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Appartement-avec-decopack-LRI20.jpeg",
    color: "border-accent",
  },
  {
    id: 6,
    title: "Penthouse Résidentiel",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier premium pour penthouse — sélection personnalisée, pièces sur mesure et coordination avec l'architecte.",
    tags: ["Penthouse", "Premium", "Sur mesure"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Penthouse-18.jpeg",
    color: "border-primary",
  },
  {
    id: 7,
    title: "Phoenix Office",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Aménagement complet des bureaux Phoenix — mobilier ergonomique, espaces de réunion et zones communes.",
    tags: ["Bureaux", "Ergonomie", "Contract"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/Phoenix-17.jpg",
    color: "border-accent",
  },
  {
    id: 8,
    title: "Togocel — Concept Bureaux",
    category: "Bureaux",
    location: "Togo",
    desc: "Conception et fourniture mobilier pour les bureaux de Togocel au Togo — extension de l'expertise HPA en Afrique de l'Ouest.",
    tags: ["Concept", "Afrique", "Télécoms"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/TOGOCEL2.jpg",
    color: "border-primary",
  },
  {
    id: 9,
    title: "Mvola — Concept Bureaux",
    category: "Bureaux",
    location: "Madagascar",
    desc: "Concept mobilier pour les bureaux de Mvola à Madagascar — open space moderne et espaces de collaboration.",
    tags: ["Concept", "Madagascar", "Fintech"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/MVOLA5.jpg",
    color: "border-accent",
  },
  {
    id: 10,
    title: "Jugaad — Espace Commercial",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Aménagement d'un espace commercial — mobilier contract adapté au flux client et à l'identité visuelle.",
    tags: ["Commercial", "Agencement", "Contract"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Jugaad-55-2.jpeg",
    color: "border-primary",
  },
  {
    id: 11,
    title: "Espace Piscine Résidentiel",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier outdoor et espace piscine pour résidence privée — sélection de pièces résistantes au climat tropical.",
    tags: ["Outdoor", "Piscine", "Résidentiel"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/IMG_9296.jpg",
    color: "border-accent",
  },
  {
    id: 12,
    title: "Pulse — Espace de travail",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Aménagement d'un espace de coworking et de travail collaboratif — mobilier modulable et zones de détente.",
    tags: ["Coworking", "Modulable", "Contract"],
    image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/PULSE-10.png",
    color: "border-primary",
  },
];

const categories = ["Tous", "Hôtellerie", "Résidentiel", "Bureaux"];

export default function RealisationsSection() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered =
    activeFilter === "Tous"
      ? realisations
      : realisations.filter((r) => r.category === activeFilter);

  return (
    <section id="realisations" className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Réalisations
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Projets livrés dans l'Océan Indien & Afrique
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            Une sélection de nos références — hôtellerie, résidentiel et bureaux — issues de notre portfolio 2025.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setSelected(null); }}
              className={`px-5 py-2 font-body text-[11px] font-bold tracking-[1.5px] uppercase transition-all border ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-primary border-border hover:border-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-hpa-cream-dark">
          {filtered.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelected(selected === r.id ? null : r.id)}
              className={`group bg-card cursor-pointer overflow-hidden transition-all duration-300 border-b-[3px] ${r.color} hover:-translate-y-1 hover:shadow-xl`}
            >
              <div
                className="h-52 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${r.image})` }}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-[10px] font-bold tracking-[2px] uppercase px-3 py-1">
                  {r.category}
                </span>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-1.5 text-muted-foreground font-body text-xs mb-3">
                  <MapPin size={12} /> {r.location}
                </div>
                <h3 className="font-heading text-lg text-primary mb-3">{r.title}</h3>
                <div className={`overflow-hidden transition-all duration-500 ${selected === r.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{r.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {r.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 font-body text-[10px] font-bold tracking-[1px] uppercase text-accent border border-accent px-2 py-1">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-bold text-primary tracking-[1px] uppercase border-b border-primary pb-0.5 group-hover:gap-3 transition-all">
                  {selected === r.id ? "Réduire" : "Voir le projet"} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="font-body text-sm text-muted-foreground mb-5">
            Vous avez un projet similaire ? Parlons-en.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-hpa-green-dark transition-colors"
          >
            Discuter de votre projet <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
