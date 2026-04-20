import { useEffect, useState } from "react";
import logoBadge from "@/assets/hpa-logo-badge.svg";

const SESSION_KEY = "hpa_splash_seen";
const TOTAL_DURATION = 3500; // ms

function shouldShowInitially() {
  if (typeof window === "undefined") return true;
  const force = new URLSearchParams(window.location.search).get("splash") === "force";
  if (force) return true;
  return !sessionStorage.getItem(SESSION_KEY);
}

export default function SplashScreen() {
  const [mounted, setMounted] = useState<boolean>(() => shouldShowInitially());
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    const hideTimer = window.setTimeout(() => setHiding(true), TOTAL_DURATION - 600);
    const removeTimer = window.setTimeout(() => setMounted(false), TOTAL_DURATION);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-hpa-indigo-deep overflow-hidden transition-opacity duration-[600ms] ease-out ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo : révélé par le wipe via clip-path animé */}
      <div className="relative h-[48vmin] w-[48vmin] max-h-[520px] max-w-[520px] min-h-[280px] min-w-[280px]">
        <img
          src={logoBadge}
          alt="HPA Concept"
          className="absolute inset-0 h-full w-full object-contain animate-[splashWipeReveal_2s_cubic-bezier(.7,0,.2,1)_0.3s_both]"
        />
      </div>

      {/* Ligne d'or horizontale qui balaye l'écran */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 origin-left animate-[splashGoldLine_2.4s_cubic-bezier(.7,0,.2,1)_0.1s_both]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, oklch(from var(--accent) calc(l + 0.1) c h) 50%, transparent 100%)",
          boxShadow: "0 0 24px oklch(from var(--accent) l c h / 0.6), 0 0 60px oklch(from var(--accent) l c h / 0.3)",
        }}
      />

      {/* Léger halo central */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 animate-[splashHaloIn_2.8s_ease-out_0.6s_forwards]"
      >
        <div
          className="h-[70vmin] w-[70vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(from var(--accent) l c h / 0.12) 0%, transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}
