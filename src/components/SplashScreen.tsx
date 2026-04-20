import { useEffect, useState } from "react";
import logoBadge from "@/assets/hpa-logo-badge.svg";

const SESSION_KEY = "hpa_splash_seen";
const TOTAL_DURATION = 2600; // ms

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const force = new URLSearchParams(window.location.search).get("splash") === "force";
    if (!force && sessionStorage.getItem(SESSION_KEY)) return;

    setMounted(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    const hideTimer = window.setTimeout(() => setHiding(true), TOTAL_DURATION - 600);
    const removeTimer = window.setTimeout(() => setMounted(false), TOTAL_DURATION);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-hpa-indigo-deep transition-opacity duration-[600ms] ease-out ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Halo doré subtil */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-[60vmin] w-[60vmin] rounded-full opacity-0 animate-[splashHalo_2.6s_ease-out_forwards]"
          style={{
            background:
              "radial-gradient(circle, oklch(from var(--accent) l c h / 0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Logo : reveal en wipe circulaire (conic mask qui dévoile en rotation) */}
      <div className="relative h-[42vmin] w-[42vmin] max-h-[460px] max-w-[460px] min-h-[260px] min-w-[260px]">
        {/* Logo principal — fade-in après le tracé */}
        <img
          src={logoBadge}
          alt="HPA Concept"
          className="absolute inset-0 h-full w-full object-contain opacity-0 animate-[splashLogoIn_1.4s_cubic-bezier(.2,.7,.2,1)_0.9s_forwards]"
        />

        {/* Anneau qui se trace */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="oklch(from var(--accent) l c h / 0.85)"
            strokeWidth="0.6"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            className="animate-[splashRingDraw_1.6s_cubic-bezier(.6,.1,.2,1)_0.1s_forwards]"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="oklch(from var(--accent) l c h / 0.4)"
            strokeWidth="0.2"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            className="animate-[splashRingDraw_1.8s_cubic-bezier(.6,.1,.2,1)_0.2s_forwards]"
          />
        </svg>
      </div>
    </div>
  );
}
