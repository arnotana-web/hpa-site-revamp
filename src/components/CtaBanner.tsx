import { Phone } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="bg-hpa-green-dark section-padding">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-3">
            Vous avez un projet ?
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-primary-foreground font-normal leading-tight mb-3">
            Obtenez une consultation gratuite avec notre équipe
          </h2>
          <p className="text-primary-foreground/75 font-body text-[15px]">
            Que ce soit pour un hôtel, un programme résidentiel ou un espace commercial — parlons de votre projet FF&E.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 shrink-0">
          <a
            href="#contact"
            className="inline-block bg-accent text-accent-foreground px-8 py-4 font-body text-[13px] font-bold tracking-[1.5px] uppercase hover:bg-primary-foreground hover:text-hpa-green-dark transition-colors"
          >
            Demander un devis
          </a>
          <a
            href="tel:+23052300000"
            className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 font-body text-[13px] font-semibold tracking-[1px] uppercase hover:bg-primary-foreground/10 transition-colors"
          >
            <Phone size={16} /> Nous appeler
          </a>
        </div>
      </div>
    </section>
  );
}
