import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props { progress: number; sceneReady: boolean; onReveal: () => void; onComplete: () => void }
const MIN_DURATION = 2200;

export function Preloader({ progress, sceneReady, onReveal, onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef({ v: 0 });
  const mounted = useRef(performance.now());
  const cbs = useRef({ onReveal, onComplete });
  cbs.current = { onReveal, onComplete };

  const renderCounter = () => {
    if (num.current) num.current.textContent = String(Math.round(counter.current.v)).padStart(3, '0');
    if (bar.current) bar.current.style.transform = `scaleX(${counter.current.v / 100})`;
  };

  useEffect(() => {
    gsap.to(counter.current, { v: Math.max(counter.current.v, progress * 95), duration: 0.8, ease: 'power2.out', onUpdate: renderCounter });
  }, [progress]);

  useEffect(() => {
    if (!sceneReady) return;
    const wait = Math.max(0, MIN_DURATION - (performance.now() - mounted.current));
    const id = window.setTimeout(() => {
      gsap.timeline()
        .to(counter.current, { v: 100, duration: 0.5, ease: 'power2.inOut', onUpdate: renderCounter })
        .to(content.current, { yPercent: -40, autoAlpha: 0, duration: 0.6, ease: 'power3.in' }, '+=0.15')
        .call(() => cbs.current.onReveal())
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' })
        .call(() => cbs.current.onComplete());
    }, wait);
    return () => window.clearTimeout(id);
  }, [sceneReady]);

  return (
    <div ref={root} className="fixed inset-0 z-100 flex items-center justify-center bg-ink" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div ref={content} className="flex flex-col items-center gap-8">
        <div className="font-display text-2xl font-bold tracking-[0.3em]">RPRE</div>
        <div className="h-px w-48 overflow-hidden bg-white/10">
          <div ref={bar} className="h-full w-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
        </div>
        <div className="flex items-baseline gap-3 text-xs uppercase tracking-[0.25em] text-white/40">
          <span>Loading experience</span>
          <span ref={num} className="font-display text-base text-white tabular-nums">000</span>
        </div>
      </div>
    </div>
  );
}
