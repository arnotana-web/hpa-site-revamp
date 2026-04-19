import hpaLogo from "@/assets/hpa-logo.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-hpa-indigo-deep">
      {/* Decorative giant HPA monogram in background */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-end pr-[5%] pointer-events-none select-none"
      >
        <span
          className="font-heading font-black text-[28vw] leading-none tracking-[-0.05em] text-primary-foreground/[0.04]"
          style={{ fontStretch: "condensed" }}
        >
          HPA
        </span>
      </div>

      {/* Decorative circular stamp (logo, very faded, on the right) */}
      <img
        src={hpaLogo}
        alt=""
        aria-hidden
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[60vw] max-w-[800px] opacity-[0.08] pointer-events-none select-none"
      />

      {/* Top label */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-10">
        <span className="font-body text-[11px] tracking-[4px] uppercase text-hpa-creme/70">
          HPA — Sourceur d'idées
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[88vh] max-w-[1400px] mx-auto px-6 md:px-16 pt-24 pb-20">
        <div className="max-w-4xl animate-fade-up">
          <h1 className="font-heading font-black text-hpa-creme leading-[0.95] tracking-[-0.04em] text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw]">
            Furniture, lighting,
            <br />
            <span className="font-accent font-normal italic text-accent tracking-normal">
              accessories.
            </span>
          </h1>

          <p className="mt-10 max-w-xl font-accent italic text-hpa-creme/80 text-lg md:text-xl leading-relaxed">
            Sourceur de mobilier pour l'hôtellerie, les résidences et les
            espaces de travail — Maurice, océan Indien, Afrique.
          </p>
        </div>

        {/* Bottom row: contact + CTA */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="font-body text-[11px] tracking-[3px] uppercase text-hpa-creme/60 leading-[2.2]">
            <div>Tamarin · Mauritius</div>
            <a href="mailto:contact@hpa.mu" className="hover:text-accent transition-colors">
              contact@hpa.mu
            </a>
          </div>

          <a
            href="#realisations"
            className="group inline-flex items-center gap-3 font-accent italic text-accent text-xl md:text-2xl hover:gap-5 transition-all"
          >
            Voir nos projets
            <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
