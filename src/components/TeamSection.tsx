const team = [
  { name: "Arnaud Bourgeois", role: "Co-Fondateur & CEO", image: "https://hpa-concept.com/wp-content/uploads/2021/11/HPA-Staff-Arnaud-Bourgeois.jpg" },
  { name: "Pia Bourgeois", role: "Co-Fondatrice", image: "https://hpa-concept.com/wp-content/uploads/2021/11/HPA-Staff-Pia-Bourgeois.jpg" },
  { name: "Lainie Gowry", role: "Designer d'intérieur", image: "https://hpa-concept.com/wp-content/uploads/2024/09/Lainie-scaled.jpg" },
  { name: "Vanessa Verte", role: "Commercial & Marketing", image: "https://hpa-concept.com/wp-content/uploads/2026/02/Vverte-1-1.png" },
  { name: "Elodie Riche", role: "Responsable Showroom", image: "https://hpa-concept.com/wp-content/uploads/2026/03/image001-1-3.png" },
  { name: "Kersley Pompeia", role: "Admin & Logistique", image: "https://hpa-concept.com/wp-content/uploads/2026/02/image001-1-2-1.jpg" },
  { name: "Roelene Nelle", role: "Sales & BD — Zanzibar", image: "https://hpa-concept.com/wp-content/uploads/2026/02/R.nelle_.jpg" },
];

export default function TeamSection() {
  return (
    <section id="equipe" className="section-padding bg-card">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-body font-bold tracking-[3px] uppercase text-accent mb-4">
            Notre équipe
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-normal leading-tight mb-4">
            Une équipe dédiée à l'embellissement de vos espaces
          </h2>
          <p className="text-muted-foreground font-body text-[15px]">
            HPA Concept s'appuie sur une équipe expérimentée et passionnée, présente à Maurice et à Zanzibar.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.name} className="text-center group">
              <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-5 border-[3px] border-hpa-cream-dark group-hover:border-accent transition-colors">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h4 className="font-heading text-base text-primary">{m.name}</h4>
              <p className="font-body text-[11px] text-accent font-bold tracking-[1px] uppercase mt-1">
                {m.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
