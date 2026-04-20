import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import hpaLogo from "@/assets/hpa-logo.png";

type NavChild = { label: string; href: string; sectionId?: string };
type NavLink = {
  label: string;
  href: string;
  sectionId?: string;
  children?: NavChild[];
};

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/", sectionId: "hero" },
  {
    label: "Services",
    href: "/#services",
    sectionId: "services",
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
    href: "/#expertise",
    sectionId: "expertise",
    children: [
      { label: "Hôtellerie & Resorts", href: "/#expertise-hotel" },
      { label: "Résidentiel", href: "/#expertise-residentiel" },
      { label: "Bureaux & Espaces commerciaux", href: "/#expertise-bureaux" },
    ],
  },
  { label: "Marques", href: "/#marques", sectionId: "marques" },
  { label: "Réalisations", href: "/#realisations", sectionId: "realisations" },
  { label: "À propos", href: "/#about", sectionId: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  const isHome = location.pathname === "/";
  // Transparent only when at top of the home page (over hero)
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: detect which section is currently in view (home only)
  useEffect(() => {
    if (!isHome) return;
    const ids = navLinks
      .map((l) => l.sectionId)
      .filter((v): v is string => Boolean(v));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  const handleEnter = (label: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isLinkActive = (link: NavLink) => {
    // Route-based active detection
    if (link.label === "Accueil") {
      return isHome && (activeSection === "hero" || !activeSection);
    }
    // Service detail pages
    if (link.label === "Services" && location.pathname.startsWith("/services/")) {
      return true;
    }
    // Scroll-spy on home
    if (isHome && link.sectionId && activeSection === link.sectionId) {
      return true;
    }
    return false;
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-card/95 backdrop-blur-md border-b border-[color:var(--hpa-tabac)]/40 shadow-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <a href="/" className="py-2 flex items-center" data-navbar-logo>
          <img
            src={hpaLogo}
            alt="HPA — Sourceur d'idées"
            className={`h-20 w-20 md:h-24 md:w-24 object-contain transition-[filter] duration-500 ${
              transparent ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : ""
            }`}
          />
        </a>

        {/* Desktop links */}
        <ul
          className={`hidden lg:flex items-center gap-0 font-body text-[13px] font-semibold tracking-wide uppercase ${
            transparent ? "text-[color:var(--hpa-creme)]" : "text-foreground"
          }`}
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && handleEnter(link.label)}
                onMouseLeave={() => link.children && handleLeave()}
              >
                <a
                  href={link.href}
                  className={`group relative flex items-center gap-1 px-4 py-6 transition-colors ${
                    transparent
                      ? "hover:text-[color:var(--hpa-creme)]"
                      : "hover:text-primary"
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    {/* Animated gold underline */}
                    <span
                      className={`pointer-events-none absolute left-0 -bottom-1 h-px bg-[color:var(--hpa-tabac)] transition-transform duration-500 ease-out origin-left ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      style={{ width: "100%" }}
                    />
                  </span>
                  {link.children && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  )}
                  {/* Active dot indicator */}
                  {active && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-2 w-1 h-1 rounded-full bg-[color:var(--hpa-tabac)]" />
                  )}
                </a>
                {link.children && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 bg-card border border-border border-t-2 border-t-[color:var(--hpa-tabac)] min-w-[260px] shadow-2xl z-50 animate-fade-in"
                    onMouseEnter={() => handleEnter(link.label)}
                    onMouseLeave={handleLeave}
                  >
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
            );
          })}

          {/* FR / EN selector (visual only) */}
          <li className="ml-3 flex items-center gap-1 text-[11px] tracking-[0.15em]">
            <span
              className={`px-1.5 py-0.5 border-b border-[color:var(--hpa-tabac)] ${
                transparent ? "text-[color:var(--hpa-creme)]" : "text-foreground"
              }`}
              aria-current="true"
            >
              FR
            </span>
            <span className={transparent ? "text-[color:var(--hpa-creme)]/50" : "text-muted-foreground/60"}>
              /
            </span>
            <span
              className={`px-1.5 py-0.5 cursor-not-allowed ${
                transparent ? "text-[color:var(--hpa-creme)]/50" : "text-muted-foreground/60"
              }`}
              title="English version coming soon"
            >
              EN
            </span>
          </li>

          <li>
            <a
              href="/#contact"
              className={`ml-4 inline-block px-5 py-2.5 rounded-sm transition-all duration-300 ${
                transparent
                  ? "bg-[color:var(--hpa-creme)] text-[color:var(--hpa-indigo)] hover:bg-[color:var(--hpa-tabac)] hover:text-[color:var(--hpa-creme)]"
                  : "bg-primary text-primary-foreground hover:bg-[color:var(--hpa-indigo-deep)]"
              }`}
            >
              Demander un devis
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 ${transparent ? "text-[color:var(--hpa-creme)]" : "text-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
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
          <div className="flex items-center gap-2 mt-3 text-xs tracking-[0.15em] text-muted-foreground">
            <span className="px-1.5 py-0.5 border-b border-[color:var(--hpa-tabac)] text-foreground">FR</span>
            <span>/</span>
            <span className="opacity-60">EN</span>
          </div>
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
  );
}
