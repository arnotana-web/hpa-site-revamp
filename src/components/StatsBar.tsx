import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 8, label: "Années d'expertise" },
  { value: 120, label: "Projets livrés" },
  { value: 5, label: "Pays desservis" },
  { value: 22, label: "Marques distribuées" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) {
      setVal(0);
      return;
    }

    const steps = 40;
    const stepDuration = Math.max(24, Math.floor(duration / steps));
    let currentStep = 0;

    const timer = window.setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));

      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, stepDuration);

    return () => window.clearInterval(timer);
  }, [target, start, duration]);

  return val;
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const v = useCountUp(stat.value, start);
  return (
    <div className="flex-1 min-w-[140px] text-center px-4 py-2">
      <div className="font-heading text-4xl md:text-5xl text-accent font-normal leading-none mb-2">
        {v}
        {stat.suffix ?? ""}
      </div>
      <div className="font-body text-[11px] font-bold tracking-[2px] uppercase text-primary-foreground/70">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") {
      setStart(true);
      return;
    }

    let started = false;
    let intervalId = 0;

    const trigger = () => {
      if (started) return;
      started = true;
      setStart(true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkVisibility);
      window.clearInterval(intervalId);
    };

    const checkVisibility = () => {
      if (started) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const visibilityRatio = Math.max(0, visibleHeight) / Math.max(rect.height, 1);

      if (visibilityRatio >= 0.25) {
        trigger();
      }
    };

    const onScroll = () => {
      checkVisibility();
    };

    window.setTimeout(checkVisibility, 900);
    intervalId = window.setInterval(checkVisibility, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  return (
    <div ref={ref} className="bg-primary border-y border-primary-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="flex flex-wrap justify-around items-center gap-y-6 divide-x divide-primary-foreground/15">
          {stats.map((s, i) => (
            <StatItem key={i} stat={s} start={start} />
          ))}
        </div>
      </div>
    </div>
  );
}
