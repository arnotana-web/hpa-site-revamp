import { useState } from "react";
import { ArrowRight, MapPin, Tag } from "lucide-react";

const realisations = [
  { id: 1, title: "Prince Maurice – Villa Princière", category: "Hôtellerie", location: "Île Maurice", desc: "Collaboration avec JUGAAD pour la conception d'un espace de vie unique dans cette villa à Anahita.", tags: ["Constance", "Villa", "Sur mesure"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/IMG-20251112-WA0023.jpg", color: "border-accent" },
  { id: 2, title: "Prince Maurice – Archipel Restaurant", category: "Hôtellerie", location: "Île Maurice", desc: "Mobilier et aménagement du restaurant gastronomique Archipel au sein du Constance Prince Maurice.", tags: ["Restaurant", "F&B", "Constance"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/HPA-PRINCE-MAURICE-46.jpeg", color: "border-primary" },
  { id: 3, title: "Prince Maurice – Le Spa", category: "Hôtellerie", location: "Île Maurice", desc: "Fourniture mobilier pour le spa du Constance Prince Maurice — espaces de soins et zones de relaxation.", tags: ["Spa", "Wellness", "Constance"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/IMG-20251112-WA0008.jpg", color: "border-accent" },
  { id: 4, title: "Pullman Dakar", category: "Hôtellerie", location: "Dakar, Sénégal", desc: "Lot mobilier pour le Pullman Dakar — chambres et espaces communs pour ce resort opéré par Kasada.", tags: ["Pullman", "Kasada", "Afrique de l'Ouest"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/IMG-20251112-WA0004.jpg", color: "border-primary" },
  { id: 5, title: "Maradiva Hotel", category: "Hôtellerie", location: "Île Maurice", desc: "Fourniture complète et fabrication sur mesure — shop drawings, prototype, production et installation.", tags: ["FF&E complet", "Sur mesure", "Villas"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/MARADIVA2.jpg", color: "border-accent" },
  { id: 6, title: "Club Med St Anne", category: "Hôtellerie", location: "Seychelles", desc: "Mobilier pour le village Club Med St Anne aux Seychelles — chambres et espaces de restauration.", tags: ["Club Med", "Seychelles", "Resort"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/02/st-anne-18.png", color: "border-primary" },
  { id: 7, title: "Eden Beach", category: "Hôtellerie", location: "Île Maurice", desc: "Fourniture mobilier pour l'Eden Beach Hotel à Maurice — espaces communs et chambres.", tags: ["Beach Hotel", "Maurice", "FF&E"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/EDENBEACH1.jpg", color: "border-accent" },
  { id: 8, title: "Veranda Palmar", category: "Hôtellerie", location: "Île Maurice", desc: "Mobilier pour le Veranda Palmar Beach Hotel — chambres et espaces extérieurs.", tags: ["Veranda", "Beach", "Maurice"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/PALMAR1.jpg", color: "border-primary" },
  { id: 9, title: "Anjajav Le Lodge", category: "Hôtellerie", location: "Madagascar", desc: "Mobilier pour ce lodge boutique à Madagascar — sélection adaptée au climat tropical.", tags: ["Lodge", "Madagascar", "Boutique"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/ANJAJAV1.jpg", color: "border-accent" },
  { id: 10, title: "Le Louvre Hotel & Spa", category: "Hôtellerie", location: "Madagascar", desc: "FF&E complet pour Le Louvre Hotel & Spa — chambres, espaces communs et spa.", tags: ["Madagascar", "Hotel & Spa", "FF&E"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/LOUVRE1.jpg", color: "border-primary" },
  { id: 11, title: "O Petit Parc – Penthouse", category: "Résidentiel", location: "Île Maurice", desc: "Mobilier premium pour penthouse résidentiel — sélection personnalisée et coordination architecte.", tags: ["Penthouse", "Premium", "O Petit Parc"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/IMG-20251112-WA0049.jpg", color: "border-accent" },
  { id: 12, title: "O Petit Parc – Espace piscine", category: "Résidentiel", location: "Île Maurice", desc: "Mobilier outdoor pour l'espace piscine — pièces résistantes au climat tropical.", tags: ["Outdoor", "Piscine", "Résidentiel"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/DSCF9046-copy.jpg", color: "border-primary" },
  { id: 13, title: "Appartement Razia", category: "Résidentiel", location: "Île Maurice", desc: "Aménagement complet d'un appartement résidentiel — mobilier sélectionné et installé clé en main.", tags: ["Appartement", "Clé en main", "Résidentiel"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/DSCF8451.jpg", color: "border-accent" },
  { id: 14, title: "Pack Deco O Petit Parc", category: "Résidentiel", location: "Île Maurice", desc: "Pack décoration complet pour la résidence O Petit Parc — mobilier La Redoute Intérieur.", tags: ["Deco Pack", "La Redoute Intérieur", "O Petit Parc"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/DSC08721enfused.jpg", color: "border-primary" },
  { id: 15, title: "Penthouse Legend Hill", category: "Résidentiel", location: "Île Maurice", desc: "Mobilier haut de gamme pour penthouse Legend Hill — curation complète et suivi personnalisé.", tags: ["Penthouse", "Legend Hill", "Prestige"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/IMG-20251112-WA0008.jpg", color: "border-accent" },
  { id: 16, title: "Shoba", category: "Résidentiel", location: "Île Maurice", desc: "Fourniture mobilier pour le programme résidentiel Shoba par MJ Développement.", tags: ["MJ Développement", "Résidentiel", "Programme"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Appartement-avec-decopack-LRI20.jpeg", color: "border-primary" },
  { id: 17, title: "Villas Anahita", category: "Résidentiel", location: "Île Maurice", desc: "Deux villas meublées clé en main dans le domaine Anahita — mobilier intérieur et extérieur.", tags: ["Anahita", "Villas", "Clé en main"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Penthouse-18.jpeg", color: "border-accent" },
  { id: 18, title: "Ki Residence – Deco Pack", category: "Résidentiel", location: "Île Maurice", desc: "Packs décoration pour les appartements Ki Residence avec 2Futures.", tags: ["2Futures", "Ki Residence", "Deco Pack"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/IMG_9296.jpg", color: "border-primary" },
  { id: 19, title: "Axian Group – Maurice", category: "Bureaux", location: "Île Maurice", desc: "Aménagement des bureaux Axian à Maurice — open space, espaces collaboratifs et direction.", tags: ["Axian Group", "Corporate", "Open space"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Axian-University-30.jpg", color: "border-accent" },
  { id: 20, title: "Bureaux Axian – Abidjan", category: "Bureaux", location: "Abidjan, Côte d'Ivoire", desc: "Extension de l'expertise HPA en Afrique de l'Ouest avec les bureaux Axian à Abidjan.", tags: ["Axian", "Abidjan", "Afrique"], image: "https://www.hpa-concept.com/wp-content/uploads/2025/11/DSCF9931-copy.jpg", color: "border-primary" },
  { id: 21, title: "Bank of Africa", category: "Bureaux", location: "Île Maurice", desc: "Mobilier contract pour les bureaux de Bank of Africa — espaces fonctionnels et représentatifs.", tags: ["BOA", "Bancaire", "Contract"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/BANK-OF-AFRICA4.jpg", color: "border-accent" },
  { id: 22, title: "BVS Office", category: "Bureaux", location: "Île Maurice", desc: "Aménagement des bureaux BVS — mobilier ergonomique et espaces de travail optimisés.", tags: ["BVS", "Bureaux", "Ergonomie"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/BVS1.jpg", color: "border-primary" },
  { id: 23, title: "Odity Office", category: "Bureaux", location: "Île Maurice", desc: "Fourniture mobilier pour les bureaux Odity — design contemporain et fonctionnel.", tags: ["Odity", "Design", "Bureaux"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/ODITY1.jpg", color: "border-accent" },
  { id: 24, title: "Phoenix Office", category: "Bureaux", location: "Île Maurice", desc: "Aménagement complet Phoenix — mobilier de bureau, salles de réunion et zones communes.", tags: ["Phoenix", "Contract", "Bureaux"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/Phoenix-17.jpg", color: "border-primary" },
  { id: 25, title: "Socota Group", category: "Bureaux", location: "Île Maurice", desc: "Mobilier pour les bureaux du groupe Socota — espace de travail professionnel.", tags: ["Socota", "Corporate", "Maurice"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/SOCOTA1.jpg", color: "border-accent" },
  { id: 26, title: "Ecole 42", category: "Bureaux", location: "Île Maurice", desc: "Aménagement de l'Ecole 42 Mauritius — mobilier pédagogique et espaces collaboratifs.", tags: ["Ecole 42", "Education", "Coworking"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/PULSE-10.png", color: "border-primary" },
  { id: 27, title: "Mvola – Concept Bureaux", category: "Bureaux", location: "Madagascar", desc: "Concept mobilier pour les bureaux Mvola à Madagascar — open space moderne.", tags: ["Mvola", "Madagascar", "Fintech"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/MVOLA5.jpg", color: "border-accent" },
  { id: 28, title: "Togocel – Concept Bureaux", category: "Bureaux", location: "Togo", desc: "Conception et fourniture mobilier pour Togocel au Togo.", tags: ["Togocel", "Togo", "Télécoms"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/TOGOCEL2.jpg", color: "border-primary" },
  { id: 29, title: "Jugaad", category: "Bureaux", location: "Île Maurice", desc: "Aménagement d'un espace commercial Jugaad — mobilier adapté au flux client.", tags: ["Jugaad", "Commercial", "Agencement"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/09/Jugaad-55-2.jpeg", color: "border-accent" },
  { id: 30, title: "Barnes Office", category: "Bureaux", location: "Île Maurice", desc: "Fourniture mobilier pour les bureaux Barnes Mauritius — immobilier de prestige.", tags: ["Barnes", "Immobilier", "Prestige"], image: "https://www.hpa-concept.com/wp-content/uploads/2022/01/BARNES1.jpg", color: "border-primary" },
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
