const markets = [
  { flag: "🇲🇺", name: "Île Maurice" },
  { flag: "🇲🇬", name: "Madagascar" },
  { flag: "🇸🇨", name: "Seychelles" },
  { flag: "🇹🇿", name: "Zanzibar" },
  { flag: "🌍", name: "Afrique" },
];

export default function MarketsSection() {
  return (
    <section className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Nos marchés
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Présents dans 5 marchés, un réseau en expansion
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA Concept opère au cœur de l'Océan Indien et en Afrique subsaharienne, avec une maîtrise des particularités logistiques et culturelles de chaque territoire.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {markets.map((m) => (
            <div
              key={m.name}
              className="bg-secondary p-8 text-center border-b-[3px] border-transparent hover:border-accent hover:bg-hpa-cream-dark transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{m.flag}</div>
              <div className="font-body text-sm font-bold text-primary tracking-[1px] uppercase">{m.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
