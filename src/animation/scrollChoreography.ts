import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { EarthState } from '../three/EarthScene';
import { DESKTOP_KEYFRAMES, MOBILE_KEYFRAMES, SECTION_IDS } from './keyframes';

gsap.registerPlugin(ScrollTrigger);

interface Options { onProgress?: (p: number) => void }

export function createScrollChoreography(target: EarthState | null, opts: Options = {}): () => void {
  const mm = gsap.matchMedia();

  mm.add({ isDesktop: '(min-width: 768px)', isMobile: '(max-width: 767px)' }, (ctx) => {
    const isMobile = Boolean(ctx.conditions?.isMobile);
    const frames = isMobile ? MOBILE_KEYFRAMES : DESKTOP_KEYFRAMES;

    if (target) {
      Object.assign(target, frames.hero); // the render loop lerps from INTRO_STATE into this
      SECTION_IDS.forEach((id, i) => {
        if (i === 0) return;
        const el = document.getElementById(id);
        if (!el) return;
        gsap.fromTo(target, { ...frames[SECTION_IDS[i - 1]] }, {
          ...frames[id],
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top top', scrub: 1.2, invalidateOnRefresh: true },
        });
      });
    }

    ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => opts.onProgress?.(self.progress),
    });
  });

  return () => mm.revert();
}
