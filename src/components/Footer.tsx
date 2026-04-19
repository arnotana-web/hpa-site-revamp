import { Mail, Phone, MapPin, Globe } from "lucide-react";
import hpaLogo from "@/assets/hpa-logo.png";

export default function Footer() {
  return (
    <footer className="bg-hpa-indigo-deep text-primary-foreground/75">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-primary-foreground/10">
          {/* Brand */}
          <div>
            <img src={hpaLogo} alt="HPA" className="h-20 w-20 object-contain mb-4" />
            <h3 className="font-heading text-2xl font-black text-primary-foreground tracking-[-0.02em]">
              HPA
            </h3>
            <p className="text-[12px] text-accent font-accent italic tracking-wide mt-1">
              sourceur d'idées
            </p>
            <p className="mt-5 text-sm leading-7 text-primary-foreground/60">
              Maison de sourcing — mobilier, luminaires et accessoires pour l'hôtellerie, les résidences et les espaces de travail à Maurice et dans l'océan Indien.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-5">Navigation</h4>
            <ul className="space-y-2.5">
              {["Accueil", "À propos", "Services", "Marques", "Réalisations", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary-foreground/65 hover:text-accent transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-5">Services</h4>
            <ul className="space-y-2.5">
              {[
                "FF&E & Mobilier de projet",
                "Fabrication sur mesure",
                "Conseil & Conception",
                "Gestion de projet",
                "Livraison & Installation",
              ].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-primary-foreground/65 hover:text-accent transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-5">Contact</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3 items-start">
                <Mail size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-primary-foreground/65">info@hpa-concept.com</span>
              </div>
              <div className="flex gap-3 items-start">
                <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-primary-foreground/65">+230 5230 0000</span>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-primary-foreground/65">Port Louis, Île Maurice</span>
              </div>
              <div className="flex gap-3 items-start">
                <Globe size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-primary-foreground/65">Maurice · Madagascar · Seychelles · Zanzibar · Afrique</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-primary-foreground/40 gap-4">
          <span>© 2025 HPA Concept. Tous droits réservés.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
