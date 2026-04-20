import { useEffect, useState } from "react";
import logoBadge from "@/assets/hpa-logo-badge.svg";

const SESSION_KEY = "hpa_splash_seen";
const REVEAL_DURATION = 1800;
const TRANSITION_DURATION = 1500;
const FADE_DURATION = 450;
const TOTAL_DURATION = REVEAL_DURATION + TRANSITION_DURATION + FADE_DURATION;

function shouldShowInitially() {
  if (typeof window === "undefined") return true;
  const force = new URLSearchParams(window.location.search).get("splash") === "force";
  if (force) return true;
  return !sessionStorage.getItem(SESSION_KEY);
}

export default function SplashScreen() {
  const [mounted, setMounted] = useState<boolean>(() => shouldShowInitially());
  const [phase, setPhase] = useState<"reveal" | "glide" | "fade">("reveal");

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.dataset.splashActive = "1";

    const glideTimer = window.setTimeout(() => {
      setPhase("glide");
    }, REVEAL_DURATION);

    const fadeTimer = window.setTimeout(() => {
      setPhase("fade");
      document.documentElement.dataset.splashActive = "0";
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

  const isGliding = phase === "glide";
  const isFading = phase === "fade";

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] overflow-hidden pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      } transition-opacity duration-[450ms] ease-out`}
    >
      <div className="absolute inset-0 bg-hpa-indigo-deep" />

      {phase === "reveal" && (
        <>
          <div
            className="pointer-events-none absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 origin-left animate-[splashGoldLine_1.9s_cubic-bezier(.7,0,.2,1)_0.05s_both]"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, oklch(from var(--accent) calc(l + 0.1) c h) 50%, transparent 100%)",
              boxShadow:
                "0 0 24px oklch(from var(--accent) l c h / 0.6), 0 0 60px oklch(from var(--accent) l c h / 0.3)",
            }}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 animate-[splashHaloIn_2s_ease-out_0.35s_forwards]">
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

      <div
        className={`absolute splash-logo ${
          isGliding || isFading ? "splash-logo--landed" : "splash-logo--center"
        }`}
      >
        <img
          src={logoBadge}
          alt="HPA Concept"
          className={`h-full w-full object-contain ${phase === "reveal" ? "animate-[splashWipeReveal_1.7s_cubic-bezier(.7,0,.2,1)_0.2s_both]" : ""}`}
        />
      </div>
    </div>
  );
}
