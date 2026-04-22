import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

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
  x: number;
  y: number;
  coords: [number, number];
  projects: number;
  highlight: string;
};

const countries: Country[] = [
  { id: "mu", name: "Île Maurice", x: 790, y: 505, coords: [57.55, -20.35], projects: 95, highlight: "Hub historique — siège HPA, hôtels & villas" },
  { id: "mg", name: "Madagascar", x: 720, y: 470, coords: [46.87, -18.77], projects: 18, highlight: "Hôtellerie & corporate — Antananarivo, Anjajavy" },
  { id: "sc", name: "Seychelles", x: 800, y: 390, coords: [55.49, -4.68], projects: 2, highlight: "Resorts premium — Mahé, Praslin" },
  { id: "tz", name: "Tanzanie", x: 605, y: 430, coords: [34.89, -6.37], projects: 2, highlight: "Boutique-hôtels & lodges balnéaires — Zanzibar" },
  { id: "ci", name: "Côte d'Ivoire", x: 285, y: 380, coords: [-5.55, 7.54], projects: 1, highlight: "Bureaux corporate — Abidjan" },
  { id: "tg", name: "Togo", x: 335, y: 385, coords: [0.82, 8.62], projects: 2, highlight: "Sièges bancaires & corporate" },
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function RegionMapSection() {
  const [hovered, setHovered] = useState<Country | null>(null);
  const [mode, setMode] = useState<"stylised" | "geographic">("stylised");

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-center">
          {/* Stylised map */}
          <div className="relative aspect-[1000/700] w-full">
            <svg
              viewBox="0 0 1000 700"
              className="w-full h-full"
              role="img"
              aria-label="Carte des projets HPA en Afrique et Océan Indien"
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7A5A2C" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7A5A2C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1000" height="700" fill="url(#grid)" />

              {/* Africa silhouette — accurate stylised outline */}
              <path
                d="M 250 145 L 360 130 L 470 135 L 560 150 L 600 175 L 605 220 L 590 250 L 600 285 L 615 320 L 625 360 L 640 400 L 635 440 L 615 475 L 590 505 L 555 535 L 515 555 L 480 555 L 455 530 L 430 495 L 405 470 L 380 445 L 355 410 L 330 370 L 305 325 L 280 280 L 260 230 L 248 185 Z"
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="1.2"
              />

              {/* Madagascar — east of Mozambique */}
              <path
                d="M 705 425 Q 720 445 728 475 L 720 505 L 708 510 L 700 485 L 698 450 Z"
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="1.2"
              />

              {/* Connection lines from Maurice (hub) to others */}
              {countries
                .filter((c) => c.id !== "mu")
                .map((c) => {
                  const mu = countries[0];
                  return (
                    <line
                      key={`line-${c.id}`}
                      x1={mu.x}
                      y1={mu.y}
                      x2={c.x}
                      y2={c.y}
                      stroke="#7A5A2C"
                      strokeOpacity={hovered?.id === c.id ? 0.7 : 0.15}
                      strokeWidth={hovered?.id === c.id ? 1.2 : 0.6}
                      strokeDasharray="4 4"
                      className="transition-all duration-300"
                    />
                  );
                })}

              {/* Country points */}
              {countries.map((c) => {
                const isHover = hovered?.id === c.id;
                const isHub = c.id === "mu";
                return (
                  <g
                    key={c.id}
                    transform={`translate(${c.x} ${c.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHovered(c)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse halo */}
                    <circle r={isHub ? 32 : 22} fill="url(#pulse)" opacity={isHover || isHub ? 1 : 0.5} />
                    {/* Outer ring */}
                    <circle
                      r={isHub ? 12 : 8}
                      fill="none"
                      stroke="#7A5A2C"
                      strokeOpacity={isHover ? 1 : 0.7}
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />
                    {/* Core */}
                    <circle
                      r={isHover ? 6 : isHub ? 6 : 4}
                      fill="#7A5A2C"
                      className="transition-all duration-300"
                    />
                    {/* Label */}
                    <text
                      x={14}
                      y={5}
                      fill="#F6EFD9"
                      fillOpacity={isHover || isHub ? 1 : 0.55}
                      fontSize={isHub ? 14 : 12}
                      fontFamily="Inter, sans-serif"
                      fontWeight={isHub ? 700 : 500}
                      letterSpacing="0.5"
                      className="transition-all duration-300 pointer-events-none select-none uppercase"
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </svg>
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
