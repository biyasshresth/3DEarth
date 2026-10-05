import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isFinePointer, prefersReducedMotion } from "../lib/utils";

export function CustomCursor() {
  const [enabled] = useState(() => isFinePointer() && !prefersReducedMotion());
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current || !glow.current) return;
    document.documentElement.classList.add("has-custom-cursor");
    const q = (el: Element, dur: number) => ({
      x: gsap.quickTo(el, "x", { duration: dur, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: dur, ease: "power3" }),
    });
    const d = q(dot.current, 0.1),
      r = q(ring.current, 0.45),
      g = q(glow.current, 1.4);
    const move = (e: PointerEvent) => {
      d.x(e.clientX);
      d.y(e.clientY);
      r.x(e.clientX);
      r.y(e.clientY);
      g.x(e.clientX);
      g.y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const mode = t?.dataset.cursor;
      ring.current!.classList.toggle("is-active", !!mode && mode !== "hide");
      ring.current!.classList.toggle("is-hidden", mode === "hide");
      if (label.current)
        label.current.textContent = mode && mode !== "hide" ? mode : "";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
