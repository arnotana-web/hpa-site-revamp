import { useEffect, useState } from "react";
import logoBadge from "@/assets/hpa-logo-badge.svg";

const SESSION_KEY = "hpa_splash_seen";
// Phases : reveal (wipe doré + logo), pause, transition vers navbar, fade-out
const REVEAL_DURATION = 2200;       // splash centré
const TRANSITION_DURATION = 900;    // glissement vers la navbar
const TOTAL_DURATION = REVEAL_DURATION + TRANSITION_DURATION + 200;

function shouldShowInitially() {
  if (typeof window === "undefined") return true;
  const force = new URLSearchParams(window.location.search).get("splash") === "force";
  if (force) return true;
  return !sessionStorage.getItem(SESSION_KEY);
}

export default function SplashScreen() {
  const [mounted, setMounted] = useState<boolean>(() => shouldShowInitially());
  const [phase, setPhase] = useState<"reveal" | "transition" | "done">("reveal");

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.dataset.splashActive = "1";

    const transitionTimer = window.setTimeout(() => {
      setPhase("transition");
      // Au moment où le logo arrive à destination, on révèle la navbar
      window.setTimeout(() => {
        document.documentElement.dataset.splashActive = "0";
      }, TRANSITION_DURATION - 150);
    }, REVEAL_DURATION);

    const removeTimer = window.setTimeout(() => {
      setPhase("done");
      setMounted(false);
      delete document.documentElement.dataset.splashActive;
    }, TOTAL_DURATION);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(removeTimer);
      delete document.documentElement.dataset.splashActive;
    };
  }, [mounted]);

  if (!mounted) return null;

  const isTransitioning = phase === "transition";

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] overflow-hidden pointer-events-none transition-[background-color] duration-[700ms] ease-out ${
        isTransitioning ? "bg-transparent" : "bg-hpa-indigo-deep"
      }`}
    >
      {/* Backdrop fade-out indépendant pour ne pas affecter le logo */}
      <div
        className={`absolute inset-0 bg-hpa-indigo-deep transition-opacity duration-[700ms] ease-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Ligne d'or horizontale qui balaye l'écran */}
      {!isTransitioning && (
        <div
          className="pointer-events-none absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 origin-left animate-[splashGoldLine_2.2s_cubic-bezier(.7,0,.2,1)_0.1s_both]"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, oklch(from var(--accent) calc(l + 0.1) c h) 50%, transparent 100%)",
            boxShadow:
              "0 0 24px oklch(from var(--accent) l c h / 0.6), 0 0 60px oklch(from var(--accent) l c h / 0.3)",
          }}
        />
      )}

      {/* Halo central */}
      {!isTransitioning && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 animate-[splashHaloIn_2.4s_ease-out_0.6s_forwards]">
          <div
            className="h-[70vmin] w-[70vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(from var(--accent) l c h / 0.12) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      {/* Logo : centre puis transition vers navbar */}
      <div
        className={`absolute splash-logo ${
          isTransitioning ? "splash-logo--landed" : "splash-logo--center"
        }`}
        style={{
          transition: isTransitioning
            ? `top ${TRANSITION_DURATION}ms cubic-bezier(.7,0,.2,1), left ${TRANSITION_DURATION}ms cubic-bezier(.7,0,.2,1), width ${TRANSITION_DURATION}ms cubic-bezier(.7,0,.2,1), height ${TRANSITION_DURATION}ms cubic-bezier(.7,0,.2,1), transform ${TRANSITION_DURATION}ms cubic-bezier(.7,0,.2,1)`
            : undefined,
        }}
      >
        <img
          src={logoBadge}
          alt="HPA Concept"
          className={`h-full w-full object-contain ${
            !isTransitioning
              ? "animate-[splashWipeReveal_2s_cubic-bezier(.7,0,.2,1)_0.3s_both]"
              : ""
          }`}
        />
      </div>
    </div>
  );
}
