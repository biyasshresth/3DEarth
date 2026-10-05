import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { isFinePointer } from '../lib/utils';
import { useSmoothScroll } from '../hooks/useLenis';

interface Props { href: string; children: ReactNode; variant?: 'primary' | 'ghost'; className?: string }

export function MagneticButton({ href, children, variant = 'primary', className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label || !isFinePointer()) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    const lx = gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3' });
    const ly = gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x(dx * 0.3); y(dy * 0.3); lx(dx * 0.12); ly(dy * 0.12);
    };
    const leave = () => {
      gsap.to([el, label], { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' });
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, []);

  const isAnchor = href.startsWith('#');
  return (
    <a
      ref={ref}
      href={href}
      onClick={isAnchor ? (e) => { e.preventDefault(); scrollTo(href); } : undefined}
      className={`btn btn-${variant} ${className}`}
      data-cursor="hide"
    >
      <span className="btn-fill" aria-hidden />
      <span ref={labelRef} className="btn-label">{children}</span>
    </a>
  );
}
