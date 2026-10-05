import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = createContext<Lenis | null>(null);

 export function useLenis(enabled: boolean): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const instance = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
    instance.on('scroll', () => ScrollTrigger.update());
    const update = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => { gsap.ticker.remove(update); instance.destroy(); setLenis(null); };
  }, [enabled]);
  return lenis;
}

 export function useSmoothScroll() {
  const lenis = useContext(LenisContext);
  return (hash: string) => {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.8, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
}
