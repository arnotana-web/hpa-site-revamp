import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import hpaLogo from "@/assets/hpa-logo.png";

const navLinks = [
  { label: "Accueil", href: "/" },
  {
    label: "Services",
    href: "/#services",
    children: [
      { label: "FF&E & Mobilier de projet", href: "/services/ffe" },
      { label: "Fabrication sur mesure", href: "/services/fabrication" },
      { label: "Conseil & Conception", href: "/services/conseil" },
      { label: "Gestion de projet", href: "/services/gestion-projet" },
      { label: "Livraison & Installation", href: "/services/livraison" },
      { label: "Distribution de marques", href: "/services/distribution" },
    ],
  },
  {
    label: "Expertise",
    href: "#expertise",
    children: [
      { label: "Hôtellerie & Resorts", href: "#expertise" },
      { label: "Résidentiel", href: "#expertise" },
      { label: "Bureaux & Espaces commerciaux", href: "#expertise" },
    ],
  },
  { label: "Marques", href: "/#marques" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "À propos", href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <a href="/" className="py-3 flex items-center gap-3">
            <img src={hpaLogo} alt="HPA — Sourceur d'idées" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
            <span className="hidden sm:block text-[11px] text-accent font-accent italic tracking-wide">
              sourceur d'idées
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0 font-body text-[13px] font-semibold tracking-wide uppercase">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-6 text-foreground hover:text-primary transition-colors border-b-2 border-transparent group-hover:border-primary"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </a>
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-card border border-border border-t-2 border-t-primary min-w-[240px] shadow-xl z-50 animate-fade-in">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-3 text-[12px] text-muted-foreground hover:text-primary hover:bg-secondary hover:pl-6 transition-all border-b border-border/50 last:border-0"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li>
              <a
                href="/#contact"
                className="ml-3 inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-sm hover:bg-hpa-green-dark transition-colors"
              >
                Demander un devis
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-4 animate-fade-in">
            {navLinks.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="block py-3 font-body text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary"
                  onClick={() => !link.children && setMobileOpen(false)}
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="pl-4 pb-2">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-xs text-muted-foreground hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="/#contact"
              className="block mt-4 bg-primary text-primary-foreground text-center py-3 rounded-sm font-body text-sm font-bold uppercase tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              Demander un devis
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
