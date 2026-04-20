const brands = [
  { name: "La Redoute Intérieur", url: "https://www.laredoute.fr/interieur/" },
  { name: "AM.PM", url: "https://www.ampm.fr" },
  { name: "Woven", url: "https://wovenplus.com" },
  { name: "Otazen", url: "https://www.otazen.com" },
  { name: "Gervasoni", url: "https://www.gervasoni1882.it" },
  { name: "Rols Carpet", url: "https://www.rolscarpets.com/en/" },
  { name: "Ezpeleta", url: "https://www.ezpeleta.com" },
  { name: "Skyline Design", url: "https://www.skylinedesign.com" },
  { name: "Joenfa", url: "https://www.joenfa.com" },
  { name: "Artie", url: "https://www.artie.fr" },
  { name: "Yellowkorner", url: "https://www.yellowkorner.com" },
  { name: "Bover", url: "https://bover.es" },
  { name: "Marset", url: "https://www.marset.com" },
  { name: "GDR Asia", url: "https://www.gdrasia.com" },
  { name: "Joquer", url: "https://www.joquer.com" },
  { name: "Inclass", url: "https://www.inclass.es" },
  { name: "LZF Lamps", url: "https://lzf-lamps.com" },
  { name: "Papadatos", url: "https://www.papadatos.gr" },
  { name: "Stua", url: "https://www.stua.com" },
  { name: "Versalink", url: "https://www.versalink.com.my" },
  { name: "Viccarbe", url: "https://www.viccarbe.com" },
  { name: "Expormim", url: "https://www.expormim.com" },
];

// On duplique la liste pour permettre une boucle infinie sans saut visuel
const loop = [...brands, ...brands];

export default function BrandsSection() {
  return (
    <section id="marques" className="section-padding bg-secondary border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Notre portefeuille
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Marques représentées et distribuées
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA sélectionne et représente des marques pour leur cohérence avec les projets de nos clients — qualité, durabilité, esthétique et rapport qualité/prix.
          </p>
        </div>

        {/* Marquee — 2 rangées qui défilent en sens opposés */}
        <div className="space-y-4 marquee-mask">
          <div className="flex gap-4 animate-marquee w-max" style={{ animationDuration: "55s" }}>
            {loop.map((b, i) => (
              <a
                key={`row1-${i}`}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-block bg-card border border-border px-7 py-3.5 font-body text-[13px] font-bold text-primary tracking-[1px] uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                {b.name}
              </a>
            ))}
          </div>
          <div
            className="flex gap-4 animate-marquee w-max"
            style={{ animationDuration: "65s", animationDirection: "reverse" }}
          >
            {loop.map((b, i) => (
              <a
                key={`row2-${i}`}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-block bg-card border border-border px-7 py-3.5 font-body text-[13px] font-bold text-primary tracking-[1px] uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
