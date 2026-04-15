import { useState } from "react";
import { ArrowRight, MapPin, Tag } from "lucide-react";

const realisations = [
  // HÔTELLERIE & RESTAURANTS
  {
    id: 1,
    title: "Maradiva Hotel",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Fourniture complète du lot mobilier et fabrication sur mesure pour le Maradiva Villas Resort & Spa. Shop drawings, prototype, production en usine et installation sur site.",
    tags: ["FF&E complet", "Fabrication sur mesure", "Villas & Spa"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 2,
    title: "Constance Prince Maurice",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Mobilier pour les suites, le spa, l'Archipel Restaurant et la Villa Princière du resort 5 étoiles Constance Prince Maurice.",
    tags: ["Suites & Villas", "Restaurant", "Spa"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    color: "border-primary",
  },
  {
    id: 3,
    title: "Royal Palm Beachcomber",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Sélection et fourniture de mobilier pour le Royal Palm Beachcomber Luxury — l'un des hôtels les plus emblématiques de l'Île Maurice.",
    tags: ["Luxury", "FF&E", "Beachcomber"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 4,
    title: "Club Med Albion & St Anne",
    category: "Hôtellerie",
    location: "Maurice & Seychelles",
    desc: "Fourniture mobilier pour deux villages Club Med : Club Med Albion à Maurice et Club Med St Anne aux Seychelles.",
    tags: ["Club Med", "Maurice", "Seychelles"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    color: "border-primary",
  },
  {
    id: 5,
    title: "Le Louvre Hotel & Spa",
    category: "Hôtellerie",
    location: "Madagascar",
    desc: "FF&E complet pour le Louvre Hotel & Spa à Madagascar — chambres, espaces communs et spa.",
    tags: ["Madagascar", "Hotel & Spa", "FF&E"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 6,
    title: "Anjajav Le Lodge & Park Life",
    category: "Hôtellerie",
    location: "Madagascar",
    desc: "Mobilier pour deux établissements boutique à Madagascar : Anjajav Le Lodge et Park Life Restaurant.",
    tags: ["Boutique Lodge", "Madagascar", "Restaurant"],
    image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=800&q=80",
    color: "border-primary",
  },
  {
    id: 7,
    title: "Paradise Cove & Veranda Palmar",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Fourniture mobilier pour Paradise Cove Boutique Hotel et Veranda Palmar Beach Hotel à Maurice.",
    tags: ["Boutique Hotel", "Beach Resort", "Maurice"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 8,
    title: "Pullman Dakar",
    category: "Hôtellerie",
    location: "Dakar, Sénégal",
    desc: "Participation au lot mobilier du Pullman Dakar pour le compte du développeur Kasada — extension de notre expertise en Afrique de l'Ouest.",
    tags: ["Afrique de l'Ouest", "Pullman", "Kasada"],
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80",
    color: "border-primary",
  },
  // RÉSIDENTIEL
  {
    id: 9,
    title: "Villas Anahita",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Deux villas meublées clé en main dans le domaine Anahita — mobilier intérieur et extérieur, sélection personnalisée pour chaque villa.",
    tags: ["Villas privées", "Anahita", "Clé en main"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 10,
    title: "Deco Packs — Ki Residence & Ki Resort",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Packs décoration complets pour les appartements et villas de Ki Residence et Ki Resort, développés avec 2Futures.",
    tags: ["Deco Pack", "2Futures", "Appartements & Villas"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    color: "border-primary",
  },
  {
    id: 11,
    title: "O Petit Parc",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Fourniture mobilier pour plusieurs unités et espaces communs de la résidence O Petit Parc — appartements, penthouse et espace piscine.",
    tags: ["Résidence", "Penthouse", "Espace piscine"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 12,
    title: "Quinta de Faro & Legend Hill",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier résidentiel premium pour Quinta de Faro (MJ Développement) et Legend Hill — deux programmes haut de gamme à Maurice.",
    tags: ["Premium", "MJ Développement", "Villas"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    color: "border-primary",
  },
  // BUREAUX
  {
    id: 13,
    title: "Axian Group — Maurice & Abidjan",
    category: "Bureaux",
    location: "Maurice & Côte d'Ivoire",
    desc: "Aménagement des bureaux du groupe Axian à Île Maurice et à Abidjan — mobilier de bureau, espaces collaboratifs et zones de direction.",
    tags: ["Axian Group", "Bureaux", "Multi-pays"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 14,
    title: "BOA, BVS & Barnes",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Fourniture mobilier pour les bureaux de Bank of Africa (BOA), BVS et Barnes Mauritius — espaces de travail fonctionnels et représentatifs.",
    tags: ["Secteur financier", "Immobilier", "Contract"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    color: "border-primary",
  },
  {
    id: 15,
    title: "Ecole 42 & Socota Group",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Aménagement de l'Ecole 42 Mauritius et des bureaux du groupe Socota — deux projets aux usages très différents, gérés avec la même rigueur.",
    tags: ["Éducation", "Corporate", "Agencement"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    color: "border-accent",
  },
  {
    id: 16,
    title: "Concepts — Mvola & Togocel",
    category: "Bureaux",
    location: "Madagascar & Togo",
    desc: "Conception et proposition de concepts mobilier pour les bureaux de Mvola (Madagascar) et Togocel (Togo) — deux projets d'envergure en Afrique.",
    tags: ["Concept", "Afrique", "Télécoms"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
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

        {/* Filters */}
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

        {/* Grid */}
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
