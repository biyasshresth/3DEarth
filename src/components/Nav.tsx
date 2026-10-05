import { useState } from 'react';
import { NAV } from '../data/content';
import { useSmoothScroll } from '../hooks/useLenis';

export function Nav() {
  const [open, setOpen] = useState(false);
  const scrollTo = useSmoothScroll();
  const go = (href: string) => { setOpen(false); scrollTo(href); };

  return (
    <header data-reveal data-reveal-delay="0.3" className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <a href="#hero" onClick={(e) => { e.preventDefault(); go('#hero'); }} className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.3em]">
        RPRE <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </a>
      <nav className="hidden items-center gap-10 md:flex">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); go(n.href); }} className="link-line text-[13px] text-white/60 hover:text-white">
            {n.label}
          </a>
        ))}
      </nav>
      <button onClick={() => setOpen(!open)} className="md:hidden text-xs uppercase tracking-[0.25em]" aria-label="Menu">
        {open ? 'Close' : 'Menu'}
      </button>
      <div className={`fixed inset-0 -z-10 flex flex-col justify-center gap-6 bg-ink/95 px-8 transition-[clip-path] duration-700 ease-out-expo md:hidden ${open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'}`}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); go(n.href); }} className="font-display text-4xl font-semibold">{n.label}</a>
        ))}
      </div>
    </header>
  );
}
