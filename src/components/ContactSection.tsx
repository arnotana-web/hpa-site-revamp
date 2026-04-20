import { Mail, Phone, MapPin, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
        {/* Info */}
        <div>
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Parlons de votre projet
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Nous sommes prêts à vous accompagner
          </h2>
          <p className="text-muted-foreground font-body text-[15px] mb-8">
            Que vous soyez promoteur, hôtelier, architecte ou investisseur — contactez-nous pour discuter de vos besoins en mobilier et FF&E.
          </p>

          <div className="space-y-7">
            {[
              { icon: Mail, label: "Email", value: "info@hpa-concept.com" },
              { icon: Phone, label: "Téléphone", value: "+230 5230 0000" },
              { icon: MapPin, label: "Siège social", value: "Port Louis, Île Maurice" },
              { icon: Globe, label: "Marchés couverts", value: "Maurice · Madagascar · Seychelles · Zanzibar · Afrique" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-primary flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-[11px] font-body font-bold tracking-[2px] uppercase text-accent mb-1">
                    {item.label}
                  </div>
                  <div className="font-body text-[15px] text-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-secondary p-8 md:p-10 border-t-[3px] border-primary">
          <p className="text-[11px] font-body font-bold tracking-[2px] uppercase text-accent mb-6">
            Formulaire de contact
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[11px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-2">Nom *</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border border-border bg-secondary font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-[11px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-2">Entreprise</label>
                <input
                  type="text"
                  placeholder="Nom de votre société"
                  className="w-full px-4 py-3 border border-border bg-secondary font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[11px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-border bg-secondary font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-[11px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-2">Téléphone</label>
                <input
                  type="tel"
                  placeholder="+230 ..."
                  className="w-full px-4 py-3 border border-border bg-secondary font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-[11px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-2">Type de projet</label>
              <Select defaultValue="placeholder">
                <SelectTrigger className="h-auto w-full rounded-none border-border bg-secondary px-4 py-3 font-body text-sm text-foreground shadow-none ring-offset-0 focus:ring-0 data-[placeholder]:text-muted-foreground">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border bg-card text-foreground">
                  <SelectItem value="placeholder">Sélectionner...</SelectItem>
                  <SelectItem value="hotel-resort">Hôtel / Resort</SelectItem>
                  <SelectItem value="residentiel">Programme résidentiel</SelectItem>
                  <SelectItem value="villa">Villa privée</SelectItem>
                  <SelectItem value="bureau">Espace commercial / Bureau</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block font-body text-[11px] font-bold tracking-[1.5px] uppercase text-muted-foreground mb-2">Votre message *</label>
              <textarea
                placeholder="Décrivez votre projet — localisation, type d'espace, délai souhaité..."
                rows={5}
                className="w-full px-4 py-3 border border-border bg-secondary font-body text-sm text-foreground focus:border-primary focus:bg-card outline-none transition-colors resize-vertical"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-body text-[13px] font-bold tracking-[1.5px] uppercase hover:bg-hpa-green-dark transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
