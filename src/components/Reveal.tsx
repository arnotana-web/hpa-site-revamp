import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Reveal — fades & slides children up when they enter the viewport.
 * Wrap any section to add a subtle scroll-in animation.
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-init ${visible ? "reveal-show" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
