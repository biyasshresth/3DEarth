import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initReveals(): () => void {
  const ctx = gsap.context(() => {
    const delayOf = (el: HTMLElement) => Number(el.dataset.revealDelay ?? 0);

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 48 }, {
        autoAlpha: 1, y: 0, duration: 1.3, delay: delayOf(el), ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-reveal-clip]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)', y: 30 }, {
        clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.4, delay: delayOf(el), ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      gsap.fromTo(el.querySelectorAll('.split-word-inner'), { yPercent: 110 }, {
        yPercent: 0, duration: 1.2, stagger: 0.035, delay: delayOf(el), ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const s = parseFloat(el.dataset.parallax || '0.2');
      gsap.fromTo(el, { y: () => s * 140 }, {
        y: () => -s * 140, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });

  return () => ctx.revert();
}
