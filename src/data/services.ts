import ffeImg from "@/assets/services/ffe.jpg";
import fabricationImg from "@/assets/services/fabrication.jpg";
import conseilImg from "@/assets/services/conseil.jpg";
import gestionImg from "@/assets/services/gestion-projet.jpg";
import livraisonImg from "@/assets/services/livraison.jpg";
import distributionImg from "@/assets/services/distribution.jpg";

export type ServiceSlug =
  | "ffe"
  | "fabrication"
  | "conseil"
  | "gestion-projet"
  | "livraison"
  | "distribution";

export interface ServiceContent {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  intro: string;
  image: string;
  description: string[];
  highlights: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  cta: string;
}

export const services: Record<ServiceSlug, ServiceContent> = {
  ffe: {
    slug: "ffe",
    title: "FF&E & Mobilier de projet",
    shortTitle: "FF&E & Mobilier",
    tagline: "Furniture, Fixtures & Equipment",
    intro:
      "Sélection, approvisionnement et coordination complète de votre lot mobilier — pour l'hôtellerie, le résidentiel et les espaces commerciaux.",
    image: ffeImg,
    description: [
      "Le lot FF&E (Furniture, Fixtures & Equipment) représente l'âme de tout projet hôtelier ou résidentiel haut de gamme. Il définit l'expérience client, l'identité de marque et la durabilité de votre investissement.",
      "HPA Concept prend en charge l'intégralité de ce lot — de la lecture des moodboards architectes jusqu'à la mise en place finale dans les chambres et espaces communs. Notre maîtrise des chaînes d'approvisionnement asiatiques et notre présence locale dans l'Océan Indien garantissent un résultat conforme, dans les délais, au juste prix.",
    ],
    highlights: [
      { title: "Sourcing global", desc: "Réseau d'usines partenaires en Asie validées sur leurs standards qualité et leurs capacités de production." },
      { title: "Cohérence design", desc: "Lecture fine des spécifications architecte pour garantir l'alignement esthétique et technique." },
      { title: "Budget maîtrisé", desc: "Optimisation continue du coût total — fabrication, logistique, douane, installation." },
      { title: "Lot complet", desc: "Mobilier fixe et mobile, luminaires, textiles, accessoires décoratifs et équipements." },
    ],
    process: [
      { step: "01", title: "Lecture du projet", desc: "Analyse du dossier architecte, des moodboards et du budget." },
      { step: "02", title: "Specification & sourcing", desc: "Élaboration du FF&E book, sélection des fournisseurs." },
      { step: "03", title: "Production & QC", desc: "Suivi de fabrication et contrôle qualité usine." },
      { step: "04", title: "Livraison & install", desc: "Logistique internationale et mise en place sur site." },
    ],
    cta: "Parlez-nous de votre projet FF&E",
  },
  fabrication: {
    slug: "fabrication",
    title: "Fabrication sur mesure",
    shortTitle: "Fabrication sur mesure",
    tagline: "Custom manufacturing",
    intro:
      "Shop drawings, validation prototype, production en usine partenaire en Asie, contrôle qualité rigoureux avant expédition.",
    image: fabricationImg,
    description: [
      "Quand le mobilier standard ne répond pas à votre vision, nous orchestrons une fabrication 100% sur mesure. Chaque pièce est conçue, prototypée et produite selon vos plans et vos spécifications matériaux.",
      "Notre équipe technique transforme vos intentions design en shop drawings précis, valide les prototypes avec vous, puis pilote la production dans nos usines partenaires — bois massifs, métal, rotin, tissus haut de gamme.",
    ],
    highlights: [
      { title: "Shop drawings", desc: "Plans techniques détaillés pour chaque pièce avant lancement production." },
      { title: "Prototypes validés", desc: "Aucune pièce ne part en production de série sans votre validation physique." },
      { title: "Matériaux nobles", desc: "Bois massifs, marbres, laitons, cuirs et tissus sourcés pour leur durabilité." },
      { title: "Contrôle qualité usine", desc: "Inspections systématiques en cours de production et avant expédition." },
    ],
    process: [
      { step: "01", title: "Brief & faisabilité", desc: "Étude technique de vos pièces sur mesure." },
      { step: "02", title: "Shop drawings", desc: "Plans détaillés validés conjointement." },
      { step: "03", title: "Prototype", desc: "Fabrication d'une pièce témoin pour validation." },
      { step: "04", title: "Production de série", desc: "Lancement avec contrôle qualité continu." },
    ],
    cta: "Discutons de votre fabrication sur mesure",
  },
  conseil: {
    slug: "conseil",
    title: "Conseil & Conception",
    shortTitle: "Conseil & Conception",
    tagline: "Design consulting",
    intro:
      "Moodboards, spécifications techniques, sélection de matériaux — nous vous accompagnons dans la définition de votre identité intérieure.",
    image: conseilImg,
    description: [
      "Avant la fabrication, il y a la vision. HPA Concept vous accompagne dans la définition d'une identité intérieure cohérente, désirable et adaptée à votre marché — qu'il s'agisse d'un boutique-hôtel, d'une villa privée ou d'un espace commercial.",
      "Nos conseillers travaillent main dans la main avec vos architectes, designers et opérateurs pour construire des moodboards inspirants, sélectionner les bons matériaux et valider les choix techniques avant tout engagement de production.",
    ],
    highlights: [
      { title: "Moodboards sur mesure", desc: "Univers visuels construits à partir de votre marque et de votre cible." },
      { title: "Matériauthèque", desc: "Bibliothèque physique d'échantillons : bois, tissus, finitions, métaux." },
      { title: "Spécifications techniques", desc: "Documents de référence pour fournisseurs et équipes chantier." },
      { title: "Veille tendances", desc: "Connaissance fine du marché hospitality international." },
    ],
    process: [
      { step: "01", title: "Découverte", desc: "Brief créatif et stratégique." },
      { step: "02", title: "Direction artistique", desc: "Moodboards, palettes, références." },
      { step: "03", title: "Spécifications", desc: "Sélection matériaux et finitions." },
      { step: "04", title: "Validation", desc: "Échantillons physiques et arbitrages." },
    ],
    cta: "Construisons votre identité intérieure",
  },
  "gestion-projet": {
    slug: "gestion-projet",
    title: "Gestion de projet",
    shortTitle: "Gestion de projet",
    tagline: "Project management",
    intro:
      "Coordination fournisseurs, suivi des commandes, logistique internationale — un interlocuteur unique pour l'ensemble de votre lot mobilier.",
    image: gestionImg,
    description: [
      "Un projet hôtelier mobilise des dizaines de fournisseurs, des centaines de références et plusieurs continents. Sans pilotage rigoureux, les retards et surcoûts s'accumulent.",
      "HPA Concept devient votre interlocuteur unique : un chef de projet dédié coordonne fournisseurs, transitaires, douanes et équipes chantier pour livrer votre lot mobilier complet, dans les délais, conforme aux spécifications.",
    ],
    highlights: [
      { title: "Chef de projet dédié", desc: "Un seul point de contact pour toute la durée du projet." },
      { title: "Planning détaillé", desc: "Rétroplanning aligné sur la date d'ouverture commerciale." },
      { title: "Reporting transparent", desc: "Tableaux de bord hebdomadaires sur l'avancement." },
      { title: "Gestion des aléas", desc: "Anticipation et résolution proactive des imprévus." },
    ],
    process: [
      { step: "01", title: "Cadrage", desc: "Planning, jalons, livrables, gouvernance." },
      { step: "02", title: "Pilotage production", desc: "Suivi quotidien des fournisseurs." },
      { step: "03", title: "Logistique", desc: "Coordination transport et dédouanement." },
      { step: "04", title: "Livraison & PV", desc: "Réception et procès-verbal de conformité." },
    ],
    cta: "Confiez-nous le pilotage de votre projet",
  },
  livraison: {
    slug: "livraison",
    title: "Livraison & Installation",
    shortTitle: "Livraison & Installation",
    tagline: "Delivery & installation",
    intro:
      "Gestion des contraintes insulaires et africaines, dédouanement, livraison sur site et installation par des équipes spécialisées.",
    image: livraisonImg,
    description: [
      "Livrer du mobilier à Maurice, Madagascar, aux Seychelles ou à Zanzibar n'a rien à voir avec une livraison européenne. Délais portuaires, formalités douanières, accès aux sites — chaque étape exige une expertise locale.",
      "HPA Concept maîtrise ces contraintes depuis plus d'une décennie. Nos équipes prennent en charge le transport international, le dédouanement et l'installation finale par des installateurs spécialisés mobilier hôtelier.",
    ],
    highlights: [
      { title: "Logistique internationale", desc: "Maritime et aérien depuis l'Asie vers l'Océan Indien et l'Afrique." },
      { title: "Dédouanement", desc: "Maîtrise des régimes douaniers locaux et des formalités d'importation." },
      { title: "Équipes locales", desc: "Installateurs qualifiés sur Maurice, Madagascar, Seychelles, Zanzibar." },
      { title: "Mise en service", desc: "Montage, calage, alignement, nettoyage — prêt à l'usage." },
    ],
    process: [
      { step: "01", title: "Pré-acheminement", desc: "Consolidation et empotage en Asie." },
      { step: "02", title: "Transport", desc: "Maritime ou aérien selon urgence." },
      { step: "03", title: "Douane", desc: "Dédouanement et acheminement local." },
      { step: "04", title: "Installation", desc: "Pose finale par équipes spécialisées." },
    ],
    cta: "Sécurisons la livraison de votre mobilier",
  },
  distribution: {
    slug: "distribution",
    title: "Distribution de marques",
    shortTitle: "Distribution de marques",
    tagline: "Brand distribution",
    intro:
      "HPA représente et distribue un portefeuille de marques sélectionnées — La Redoute Intérieur, AM.PM, Woven, Otazen, Skyline Design.",
    image: distributionImg,
    description: [
      "Au-delà du sur-mesure, HPA Concept distribue dans l'Océan Indien et en Afrique un portefeuille de marques internationales soigneusement sélectionnées pour leur qualité, leur design et leur pertinence sur nos marchés.",
      "Nous accompagnons hôteliers, architectes et particuliers dans la sélection des collections les plus adaptées à leurs projets, avec des conditions négociées et un service après-vente local.",
    ],
    highlights: [
      { title: "La Redoute Intérieur", desc: "Mobilier et décoration tendance accessible." },
      { title: "AM.PM", desc: "L'élégance contemporaine à la française." },
      { title: "Woven & Otazen", desc: "Outdoor et tressage haut de gamme." },
      { title: "Skyline Design", desc: "Mobilier outdoor design et durable." },
    ],
    process: [
      { step: "01", title: "Découverte", desc: "Présentation des collections disponibles." },
      { step: "02", title: "Sélection", desc: "Choix produits selon votre projet." },
      { step: "03", title: "Commande", desc: "Conditions négociées et délais confirmés." },
      { step: "04", title: "SAV local", desc: "Suivi et service après-vente régional." },
    ],
    cta: "Découvrez nos marques distribuées",
  },
};

export const servicesList = Object.values(services);
