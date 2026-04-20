import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, MapPin, Tag, X, ZoomIn, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Realisation = {
  id: number;
  title: string;
  category: string;
  location: string;
  desc: string;
  tags: string[];
  image: string;
  color: string;
};

type ManualRealisation = Omit<Realisation, "id" | "color">;

const MANUAL_REALISATIONS: ManualRealisation[] = [
  {
    title: "Ki Residence",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier haut de gamme et aménagement complet pour Ki Residence — sélection personnalisée.",
    tags: ["Ki Residence", "Sur mesure", "Résidentiel"],
    image: "/images/ki-residence.jpg",
  },
  {
    title: "Casa Alegria Loft",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier haut de gamme et aménagement complet pour Casa Alegria Loft — sélection personnalisée.",
    tags: ["Villa", "Sur mesure", "Résidentiel"],
    image: "/images/casa-alegria-loft.jpg",
  },
  {
    title: "Casa Alegria 1",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier haut de gamme et aménagement complet pour Casa Alegria 1 — sélection personnalisée.",
    tags: ["Villa", "Sur mesure", "Résidentiel"],
    image: "/images/casa-alegria-1.jpg",
  },
  {
    title: "Casa Alegria 2",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier haut de gamme et aménagement complet pour Casa Alegria 2 — sélection personnalisée.",
    tags: ["Villa", "Sur mesure", "Résidentiel"],
    image: "/images/casa-alegria-2.jpg",
  },
  {
    title: "Sugar Beach",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Fourniture et aménagement mobilier pour Sugar Beach — espaces hôteliers et zones communes.",
    tags: ["Resort", "FF&E", "Hôtellerie"],
    image: "/images/sugar-beach.jpg",
  },
  {
    title: "Veranda Palmar",
    category: "Hôtellerie",
    location: "Île Maurice",
    desc: "Fourniture et aménagement mobilier pour Veranda Palmar — chambres, espaces communs et zones extérieures.",
    tags: ["Resort", "FF&E", "Hôtellerie"],
    image: "/images/veranda-palmar.jpg",
  },
  {
    title: "Necker",
    category: "Bureaux",
    location: "Île Maurice",
    desc: "Aménagement mobilier pour les espaces professionnels de Necker.",
    tags: ["Contract", "Corporate", "Bureaux"],
    image: "/images/necker.jpg",
  },
  {
    title: "O Petit Parc 1",
    category: "Résidentiel",
    location: "Île Maurice",
    desc: "Mobilier haut de gamme et aménagement complet pour O Petit Parc 1 — sélection personnalisée.",
    tags: ["Villa", "Sur mesure", "Résidentiel"],
    image: "/images/o-petit-parc-1.jpg",
  },
];

const API_URL =
  "https://hpa-concept.com/wp-json/wp/v2/elemenfolio?per_page=100&_embed=wp:featuredmedia&_fields=title,slug,_embedded,_links";

function cleanTitle(raw: string): string {
  return raw
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function getCategory(slug: string, title: string): string {
  const s = (slug + " " + title).toLowerCase();
  if (
    /(hotel|resort|lodge|palm|club[\s-]?med|maradiva|pullman|constance|spa|restaurant|archipel|bar|lounge|eden[\s-]?beach)/.test(s)
  )
    return "Hôtellerie";
  if (
    /(villa|penthouse|appartement|residence|ki-|quinta|anahita|shoba|pack|deco|petit[\s-]?parc|legend[\s-]?hill|razia)/.test(s)
  )
    return "Résidentiel";
  return "Bureaux";
}

function getLocation(slug: string, title: string): string {
  const s = (slug + " " + title).toLowerCase();
  if (s.includes("madagascar")) return "Madagascar";
  if (s.includes("dakar")) return "Dakar, Sénégal";
  if (s.includes("tanzania") || s.includes("tanzanie")) return "Tanzanie";
  if (s.includes("togo")) return "Togo";
  if (s.includes("abidjan")) return "Abidjan, Côte d'Ivoire";
  if (s.includes("seychelles")) return "Seychelles";
  return "Île Maurice";
}

function generateDesc(title: string, category: string): string {
  switch (category) {
    case "Hôtellerie":
      return `Fourniture et aménagement mobilier pour ${title} — espaces hôteliers et zones communes.`;
    case "Résidentiel":
      return `Mobilier haut de gamme et aménagement complet pour ${title} — sélection personnalisée.`;
    default:
      return `Aménagement mobilier pour les espaces professionnels de ${title}.`;
  }
}

function generateTags(title: string, category: string, slug: string): string[] {
  const tags: string[] = [];
  const s = (slug + " " + title).toLowerCase();

  if (category === "Hôtellerie") {
    if (s.includes("constance") || s.includes("prince")) tags.push("Constance");
    if (s.includes("club") && s.includes("med")) tags.push("Club Med");
    if (s.includes("maradiva")) tags.push("Maradiva");
    if (s.includes("pullman")) tags.push("Pullman");
    if (s.includes("spa")) tags.push("Spa");
    if (s.includes("restaurant") || s.includes("archipel")) tags.push("F&B");
    if (s.includes("resort")) tags.push("Resort");
    tags.push("FF&E");
    if (s.includes("villa")) tags.push("Villas");
    tags.push("Hôtellerie");
  } else if (category === "Résidentiel") {
    if (s.includes("penthouse")) tags.push("Penthouse");
    if (s.includes("villa")) tags.push("Villa");
    if (s.includes("appartement")) tags.push("Appartement");
    if (s.includes("pack") || s.includes("deco")) tags.push("Deco Pack");
    if (s.includes("ki")) tags.push("Ki Residence");
    tags.push("Sur mesure");
    tags.push("Résidentiel");
  } else {
    if (s.includes("axian")) tags.push("Axian Group");
    if (s.includes("bank") || s.includes("boa")) tags.push("Bancaire");
    if (s.includes("mvola")) tags.push("Fintech");
    tags.push("Contract");
    tags.push("Corporate");
    tags.push("Bureaux");
  }

  return [...new Set(tags)].slice(0, 3);
}

// Titles to exclude entirely
const EXCLUDED_TITLES = new Set([
  "private penthouse",
  "penthouse",
  "private appartement",
  "private appartment",
  "arokaria",
  "boa",
  "diamond trust bank",
  "togocel",
  "mvola",
  "i&m",
  "odity",
  "bureaux axian abidjan",
  "apartment with decopack lri",
  "phoenix",
  "bfv sg",
  "barnes",
]);

function shouldExclude(title: string): boolean {
  const t = title.toLowerCase();
  return [...EXCLUDED_TITLES].some((ex) => t === ex || t.includes(ex));
}

// Location overrides by partial title match
const LOCATION_OVERRIDES: [RegExp, string][] = [
  [/park\s*life/i, "Madagascar"],
  [/ecole\s*42/i, "Madagascar"],
  [/axian\s*university/i, "Madagascar"],
  [/bank\s*of\s*africa/i, "Madagascar"],
  [/anjajavy/i, "Madagascar"],
  [/le\s*louvre/i, "Madagascar"],
  [/nexta/i, "Madagascar"],
  [/connecteo/i, "Madagascar"],
  [/jovenna/i, "Madagascar"],
  [/park\s*alarobia/i, "Madagascar"],
  [/club\s*med\s*st\s*anne/i, "Seychelles"],
  [/pulse/i, "Madagascar"],
  [/palm\s*beach/i, "Madagascar"],
  [/quinta\s*de\s*faro/i, "Portugal"],
];

// Title renames
// Category overrides by title
const CATEGORY_OVERRIDES: [RegExp, string][] = [
  [/park\s*life\s*espace\s*sportif/i, "Hôtellerie"],
  [/eden\s*beach/i, "Hôtellerie"],
  [/prince\s*maurice.*villa\s*princi[eè]re/i, "Hôtellerie"],
];

function getOverriddenCategory(title: string, defaultCat: string): string {
  for (const [re, cat] of CATEGORY_OVERRIDES) {
    if (re.test(title)) return cat;
  }
  return defaultCat;
}

function renameTitle(title: string): string {
  if (/axian\s*abidjan\s*offices/i.test(title)) return "Axian Abidjan";
  if (/h[oô]tel\s*carlton\s*madagascar/i.test(title)) return "Hôtel Carlton";
  if (/park\s*alarobia\s*villa/i.test(title)) return "Park Alarobia";
  if (/appartement\s*razia/i.test(title)) return "Appartement R";
  if (/pack\s*deco\s*o\s*petit\s*parc/i.test(title)) return "O Petit Parc";
  if (/prince\s*maurice\s*archipel\s*restaurant/i.test(title)) return "Prince Maurice Archipel";
  if (/constance\s*prince\s*maurice/i.test(title)) return "Prince Maurice le Barachois";
  if (/prince\s*maurice\s*le\s*spa/i.test(title)) return "Prince Maurice Le Spa";
  return title;
}

function getOverriddenLocation(title: string, defaultLoc: string): string {
  for (const [re, loc] of LOCATION_OVERRIDES) {
    if (re.test(title)) return loc;
  }
  return defaultLoc;
}

const categories = ["Tous", "Hôtellerie", "Résidentiel", "Bureaux"];

function getManualRealisations(startIndex = 0): Realisation[] {
  return MANUAL_REALISATIONS.map((item, index) => ({
    id: startIndex + index + 1,
    ...item,
    color:
      (startIndex + index) % 2 === 0 ? "border-accent" : "border-primary",
  }));
}

export default function RealisationsSection() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [selected, setSelected] = useState<number | null>(null);
  const [realisations, setRealisations] = useState<Realisation[]>(() =>
    getManualRealisations(),
  );
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  const openLightbox = useCallback((e: React.MouseEvent, image: string, title: string) => {
    e.stopPropagation();
    setLightbox({ image, title });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const manualItems = getManualRealisations();

    // Build a set of manual titles to avoid duplicates from API
    const manualTitles = new Set(manualItems.map((m) => m.title.toLowerCase()));

    fetch(API_URL)
      .then((res) => res.json())
      .then((data: any[]) => {
        const seen = new Set<string>();
        const items: Realisation[] = [];
        let idx = MANUAL_REALISATIONS.length;

        for (const item of data) {
          let title = cleanTitle(item.title?.rendered || "");
          if (!title || seen.has(title)) continue;
          if (shouldExclude(title)) continue;
          seen.add(title);

          title = renameTitle(title);

          // Skip if this title matches a manual entry (case-insensitive)
          if (manualTitles.has(title.toLowerCase())) continue;

          const slug = item.slug || "";
          const media = item._embedded?.["wp:featuredmedia"]?.[0];
          const image = media?.source_url;
          if (!image) continue;

          const category = getOverriddenCategory(title, getCategory(slug, title));
          const location = getOverriddenLocation(title, getLocation(slug, title));

          items.push({
            id: idx + 1,
            title,
            category,
            location,
            desc: generateDesc(title, category),
            tags: generateTags(title, category, slug),
            image,
            color: idx % 2 === 0 ? "border-accent" : "border-primary",
          });
          idx++;
        }

        setRealisations([...manualItems, ...items]);
      })
      .catch((err) => {
        console.error("Failed to fetch realisations:", err);
        setRealisations(manualItems);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "Tous"
      ? realisations
      : realisations.filter((r) => r.category === activeFilter);

  // Showcase carrousel : 6 premiers projets
  const showcase = useMemo(() => realisations.slice(0, 6), [realisations]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || showcase.length === 0) return;
    const t = setInterval(() => {
      setSlideIdx((i) => (i + 1) % showcase.length);
    }, 5000);
    return () => clearInterval(t);
  }, [isPaused, showcase.length]);

  const goPrev = useCallback(() => {
    setSlideIdx((i) => (i - 1 + showcase.length) % showcase.length);
  }, [showcase.length]);
  const goNext = useCallback(() => {
    setSlideIdx((i) => (i + 1) % showcase.length);
  }, [showcase.length]);

  return (
    <>
    <section id="realisations" className="bg-card">
      {/* Showcase carrousel plein écran */}
      {showcase.length > 0 && (
        <div
          className="relative h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden bg-primary"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {showcase.map((r, i) => (
            <div
              key={r.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === slideIdx ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                backgroundImage: `url(${r.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            </div>
          ))}

          {/* Contenu slide actif */}
          <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
            <div className="max-w-2xl text-primary-foreground">
              <span className="inline-block bg-accent text-primary-foreground font-body text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 mb-4">
                {showcase[slideIdx]?.category}
              </span>
              <h3 className="font-heading text-3xl md:text-5xl font-normal mb-3 leading-tight">
                {showcase[slideIdx]?.title}
              </h3>
              <div className="flex items-center gap-2 font-body text-sm opacity-80 mb-4">
                <MapPin size={14} /> {showcase[slideIdx]?.location}
              </div>
              <p className="font-body text-[15px] leading-relaxed opacity-90 max-w-xl">
                {showcase[slideIdx]?.desc}
              </p>
            </div>
          </div>

          {/* Contrôles */}
          <button
            onClick={goPrev}
            aria-label="Slide précédent"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-primary-foreground/10 hover:bg-primary-foreground/25 backdrop-blur-sm text-primary-foreground p-3 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            aria-label="Slide suivant"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-primary-foreground/10 hover:bg-primary-foreground/25 backdrop-blur-sm text-primary-foreground p-3 transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Pagination dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {showcase.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                aria-label={`Aller au slide ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  i === slideIdx
                    ? "w-10 bg-primary-foreground"
                    : "w-5 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="section-padding">
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

        {loading && realisations.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card p-0">
                <Skeleton className="h-52 w-full rounded-none" />
                <div className="p-7 space-y-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  <button
                    onClick={(e) => openLightbox(e, r.image, r.title)}
                    className="absolute bottom-3 right-3 bg-primary/80 hover:bg-primary text-primary-foreground p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    aria-label={`Agrandir ${r.title}`}
                  >
                    <ZoomIn size={16} />
                  </button>
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
        )}

        <div className="text-center mt-14">
          <p className="font-body text-sm text-muted-foreground mb-5">
            Vous avez un projet similaire ? Parlons-en — ou découvrez notre portfolio complet.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-hpa-green-dark transition-colors"
            >
              Discuter de votre projet <ArrowRight size={14} />
            </a>
            <a
              href="/portfolio-hpa-2025.pdf"
              download
              className="inline-flex items-center gap-2 bg-transparent text-primary border border-primary px-8 py-4 font-body text-xs font-bold tracking-[1.5px] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Download size={14} /> Télécharger le portfolio (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Lightbox */}
    {lightbox && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
        onClick={closeLightbox}
      >
        <button
          onClick={closeLightbox}
          className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>
        <p className="absolute top-6 left-6 text-white/70 font-heading text-lg">{lightbox.title}</p>
        <img
          src={lightbox.image}
          alt={lightbox.title}
          className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )}
    </>
  );
}
