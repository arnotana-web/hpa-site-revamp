import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { servicesList, type ServiceContent } from "@/data/services";

interface Props {
  service: ServiceContent;
}

export default function ServiceDetailPage({ service }: Props) {
  const otherServices = servicesList.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative h-[60vh] min-h-[420px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-20 w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground font-body text-[12px] tracking-[2px] uppercase mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            {service.tagline}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-primary-foreground font-normal leading-tight max-w-3xl">
            {service.title}
          </h1>
          <p className="font-body text-primary-foreground/90 text-lg mt-6 max-w-2xl">
            {service.intro}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-6">
          {service.description.map((p, i) => (
            <p
              key={i}
              className="font-body text-[16px] text-foreground leading-relaxed mb-6 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
              Ce que cela inclut
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight">
              Notre approche en détail
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.highlights.map((h, i) => (
              <div key={i} className="bg-card p-7 flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-primary mb-2">{h.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
              Notre méthode
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight">
              Comment nous travaillons
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p) => (
              <div key={p.step} className="border-t-2 border-accent pt-6">
                <span className="font-accent italic text-accent text-2xl">{p.step}</span>
                <h3 className="font-heading text-lg text-primary mt-3 mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground font-normal leading-tight mb-4">
            {service.cta}
          </h2>
          <p className="font-body text-primary-foreground/80 text-base mb-8">
            Décrivez-nous votre projet — nous revenons vers vous sous 48h avec une première
            estimation et nos recommandations.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 font-body text-sm font-bold uppercase tracking-[2px] hover:bg-accent/90 transition-colors"
          >
            Demander un devis <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Other services */}
      <section className="section-padding bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
              Continuer la visite
            </p>
            <h2 className="font-heading text-3xl text-primary font-normal">
              Découvrir nos autres services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="bg-card overflow-hidden group block transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className="p-6">
                  <h3 className="font-heading text-lg text-primary mb-2">{s.shortTitle}</h3>
                  <span className="inline-flex items-center gap-1.5 mt-2 font-body text-xs font-bold text-primary tracking-[1px] uppercase border-b border-primary pb-0.5 group-hover:gap-3 transition-all">
                    Découvrir <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
