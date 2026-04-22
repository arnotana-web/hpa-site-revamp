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
    if (!start) return;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTs) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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

    const checkVisibility = () => {
      if (started) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top <= vh * 0.9 && rect.bottom >= vh * 0.1;

      if (isVisible) {
        started = true;
        setStart(true);
        window.removeEventListener("scroll", checkVisibility);
        window.removeEventListener("resize", checkVisibility);
      }
    };

    const rafId = window.requestAnimationFrame(checkVisibility);
    const delayedId = window.setTimeout(checkVisibility, 1200);

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(delayedId);
      window.removeEventListener("scroll", checkVisibility);
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
