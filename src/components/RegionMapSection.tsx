import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

// NOTE: stylised map removed — only the geographic projection is kept.

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

function CountStat({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setStart(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStart(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  const v = useCountUp(target, start);
  return (
    <div ref={ref}>
      <div className="font-heading text-3xl text-accent tabular-nums">
        {v}
        {suffix}
      </div>
      <div className="font-body text-[10px] tracking-[2px] uppercase text-primary-foreground/60 mt-1">
        {label}
      </div>
    </div>
  );
}

type Country = {
  id: string;
  name: string;
  coords: [number, number];
  projects: number;
  highlight: string;
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "end" | "middle";
};

const countries: Country[] = [
  { id: "mu", name: "Île Maurice", coords: [57.55, -20.35], projects: 95, highlight: "Hub historique — siège HPA, hôtels & villas" },
  { id: "mg", name: "Madagascar", coords: [46.87, -18.77], projects: 18, highlight: "Hôtellerie & corporate — Antananarivo, Anjajavy" },
  { id: "sc", name: "Seychelles", coords: [55.49, -4.68], projects: 2, highlight: "Resorts premium — Mahé, Praslin" },
  { id: "tz", name: "Tanzanie", coords: [34.89, -6.37], projects: 2, highlight: "Boutique-hôtels & lodges balnéaires — Zanzibar" },
  {
    id: "ci",
    name: "Côte d'Ivoire",
    coords: [-5.55, 7.54],
    projects: 1,
    highlight: "Bureaux corporate — Abidjan",
    labelDx: -12,
    labelDy: 4,
    labelAnchor: "end",
  },
  {
    id: "tg",
    name: "Togo",
    coords: [0.82, 8.62],
    projects: 2,
    highlight: "Sièges bancaires & corporate",
    labelDx: 12,
    labelDy: -8,
    labelAnchor: "start",
  },
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function RegionMapSection() {
  const [hovered, setHovered] = useState<Country | null>(null);

  return (
    <section id="region" className="bg-primary text-primary-foreground section-padding overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Empreinte régionale
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-normal leading-tight mb-4">
            Présents là où vos projets prennent vie
          </h2>
          <p className="font-body text-[15px] text-primary-foreground/70">
            De Dakar à Zanzibar, en passant par Maurice et Madagascar — une logistique éprouvée pour livrer en territoires insulaires et continentaux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div className="relative aspect-[1000/800] w-full">
            <ComposableMap
              projection="geoEquirectangular"
              projectionConfig={{ scale: 540, center: [28, -6] }}
              width={1000}
              height={800}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="currentColor"
                      fillOpacity={0.08}
                      stroke="currentColor"
                      strokeOpacity={0.25}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fillOpacity: 0.12 },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {countries
                .filter((c) => c.id !== "mu")
                .map((c) => (
                  <Line
                    key={`gline-${c.id}`}
                    from={countries[0].coords}
                    to={c.coords}
                    stroke="#7A5A2C"
                    strokeOpacity={hovered?.id === c.id ? 0.7 : 0.2}
                    strokeWidth={hovered?.id === c.id ? 1.2 : 0.7}
                    strokeDasharray="4 4"
                  />
                ))}

              {countries.map((c) => {
                const isHover = hovered?.id === c.id;
                const isHub = c.id === "mu";
                return (
                  <Marker
                    key={c.id}
                    coordinates={c.coords}
                    onMouseEnter={() => setHovered(c)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: {} }}
                  >
                    <circle
                      r={isHub ? 10 : 7}
                      fill="none"
                      stroke="#7A5A2C"
                      strokeOpacity={isHover ? 1 : 0.7}
                      strokeWidth={1.5}
                    />
                    <circle r={isHover ? 5 : isHub ? 5 : 3.5} fill="#7A5A2C" />
                    <text
                      x={c.labelDx ?? 12}
                      y={c.labelDy ?? 4}
                      textAnchor={c.labelAnchor ?? "start"}
                      fill="#F6EFD9"
                      fillOpacity={isHover || isHub ? 1 : 0.7}
                      fontSize={isHub ? 12 : 10}
                      fontFamily="Inter, sans-serif"
                      fontWeight={isHub ? 700 : 500}
                      letterSpacing="0.5"
                      className="pointer-events-none select-none uppercase"
                    >
                      {c.name}
                    </text>
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>

          {/* Detail panel */}
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm p-7 min-h-[260px] flex flex-col justify-center">
            {hovered ? (
              <div key={hovered.id} className="animate-fade-in">
                <div className="flex items-center gap-2 text-accent font-body text-[10px] font-bold tracking-[2px] uppercase mb-4">
                  <MapPin size={12} /> {hovered.name}
                </div>
                <div className="font-heading text-5xl text-primary-foreground mb-2 leading-none">
                  {hovered.projects}
                </div>
                <div className="font-body text-[11px] tracking-[2px] uppercase text-primary-foreground/60 mb-5">
                  Projets livrés
                </div>
                <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">
                  {hovered.highlight}
                </p>
              </div>
            ) : (
              <div className="text-primary-foreground/60">
                <p className="font-accent italic text-xl mb-3">Survolez un point</p>
                <p className="font-body text-sm leading-relaxed">
                  Découvrez nos références par pays — hôtellerie, résidentiel et corporate dans l'ensemble de la zone.
                </p>
                <div className="mt-6 pt-6 border-t border-primary-foreground/10 grid grid-cols-2 gap-4 text-center">
                  <CountStat target={countries.reduce((s, c) => s + c.projects, 0)} suffix="+" label="Projets total" />
                  <CountStat target={countries.length} label="Territoires" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
