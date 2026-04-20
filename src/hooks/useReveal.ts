import { useEffect, useRef, useState } from "react";

/**
 * useReveal — fades & translates an element when it enters the viewport.
 * Returns { ref, visible }. Add classes accordingly:
 *   className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
 *
 * Robustness: at mount, if the element is already at or above the viewport
 * (e.g. user landed on the page with a hash anchor or restored scroll),
 * we mark it visible immediately to avoid leaving content hidden behind
 * the user's scroll position.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // If the element is already in or above the current viewport at mount,
    // reveal it immediately (handles hash anchors, scroll restoration, and
    // any case where the user lands past this section).
    const rect = node.getBoundingClientRect();
    const inOrAboveViewport = rect.top < window.innerHeight;
    if (inOrAboveViewport) {
      setVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}
