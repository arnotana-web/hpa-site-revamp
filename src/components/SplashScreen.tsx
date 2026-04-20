import { useEffect, useState } from "react";
import logoBadge from "@/assets/hpa-logo-badge.svg";

const SESSION_KEY = "hpa_splash_seen";
const REVEAL_DURATION = 550;         // wipe + apparition du logo (court)
const TRANSITION_DURATION = 1200;    // glissement vers la navbar
const FADE_DURATION = 300;
const TOTAL_DURATION = REVEAL_DURATION + TRANSITION_DURATION + FADE_DURATION;
// Le fond se retire AU DÉBUT de la transition (pas à la fin), pour qu'on voie
// le logo voler par-dessus le site jusqu'à sa position dans la navbar.
const BACKDROP_FADE_DELAY = 200;     // léger retard après le début du glissement

function shouldShowInitially() {
  if (typeof window === "undefined") return true;
  const force = new URLSearchParams(window.location.search).get("splash") === "force";
  if (force) return true;
  return !sessionStorage.getItem(SESSION_KEY);
}

export default function SplashScreen() {
  const [mounted, setMounted] = useState<boolean>(() => shouldShowInitially());
  const [phase, setPhase] = useState<"reveal" | "glide" | "fade">("reveal");
  const [backdropVisible, setBackdropVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.dataset.splashActive = "1";

    const glideTimer = window.setTimeout(() => {
      setPhase("glide");
      // Le logo de la navbar peut apparaître presque tout de suite (atterrissage doux)
      document.documentElement.dataset.splashActive = "0";
      // Le fond indigo se retire peu après le début du glissement
      window.setTimeout(() => setBackdropVisible(false), BACKDROP_FADE_DELAY);
    }, REVEAL_DURATION);

    const fadeTimer = window.setTimeout(() => {
      setPhase("fade");
    }, REVEAL_DURATION + TRANSITION_DURATION);

    const removeTimer = window.setTimeout(() => {
      setMounted(false);
      delete document.documentElement.dataset.splashActive;
    }, TOTAL_DURATION);

    return () => {
      window.clearTimeout(glideTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      delete document.documentElement.dataset.splashActive;
    };
  }, [mounted]);

  if (!mounted) return null;

  const isReveal = phase === "reveal";
  const isFading = phase === "fade";

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] overflow-hidden pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      } transition-opacity duration-[300ms] ease-out`}
    >
      {/* Fond indigo plein — fade out au début du glissement */}
      <div
        className={`absolute inset-0 bg-hpa-indigo-deep transition-opacity duration-[700ms] ease-out ${
          backdropVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {isReveal && (
        <>
          <div
            className="pointer-events-none absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 origin-left animate-[splashGoldLine_0.55s_cubic-bezier(.7,0,.2,1)_0s_both]"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, oklch(from var(--accent) calc(l + 0.1) c h) 50%, transparent 100%)",
              boxShadow:
                "0 0 24px oklch(from var(--accent) l c h / 0.6), 0 0 60px oklch(from var(--accent) l c h / 0.3)",
            }}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 animate-[splashHaloIn_1.2s_ease-out_0.2s_forwards]">
            <div
              className="h-[70vmin] w-[70vmin] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(from var(--accent) l c h / 0.12) 0%, transparent 60%)",
              }}
            />
          </div>
        </>
      )}

      {/* Logo : centre puis glisse vers la navbar (visible par-dessus le site révélé) */}
      <div
        className={`absolute splash-logo ${
          isReveal ? "splash-logo--center" : "splash-logo--landed"
        }`}
      >
        <img
          src={logoBadge}
          alt="HPA Concept"
          className={`h-full w-full object-contain ${
            isReveal ? "animate-[splashWipeReveal_0.5s_cubic-bezier(.7,0,.2,1)_0.05s_both]" : ""
          }`}
        />
      </div>
    </div>
  );
}
