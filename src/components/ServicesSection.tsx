import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { servicesList } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Ce que nous faisons
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Nos services — du conseil à la livraison
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA Concept assure l'ensemble de la chaîne de valeur mobilier pour votre projet, quel que soit son envergure ou sa localisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="bg-card overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl block"
            >
              <div
                className="h-56 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${s.image})` }}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
              <div className="p-7">
                <h3 className="font-heading text-lg text-primary mb-3">{s.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.intro}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-body text-xs font-bold text-primary tracking-[1px] uppercase border-b border-primary pb-0.5 group-hover:gap-3 transition-all">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
