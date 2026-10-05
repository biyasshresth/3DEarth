import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 };
      gsap.fromTo('.footer-char', { yPercent: 110, rotateX: -35 }, { yPercent: 0, rotateX: 0, stagger: 0.08, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.footer-tagline', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: st });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden px-6 pb-8 pt-24 md:px-12">
      <div className="mx-auto max-w-350">
        <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] text-white/40">
          <span className="footer-tagline">Cinematic · Minimal · Futuristic</span>
          <span>© {new Date().getFullYear()} RPRE Tech Studio</span>
        </div>
        <div className="mt-6 flex select-none font-display text-[clamp(6rem,23vw,24rem)] font-bold leading-[0.85] tracking-tightest perspective-midrange" aria-label="RPRE">
          {'RPRE'.split('').map((c, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.05em]">
              <span className="footer-char inline-block bg-linear-to-b from-white to-white/10 bg-clip-text text-transparent">{c}</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
