import { SERVICES } from '../../data/content';
import { RevealText } from '../RevealText';
import { SectionLabel } from '../SectionLabel';
import { useSmoothScroll } from '../../hooks/useLenis';

export function Services() {
  const scrollTo = useSmoothScroll();
  return (
    <section id="services" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel index="02" label="Services" />
          <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            <RevealText text="What we do, done properly." />
          </h2>
          <ul className="mt-16 border-t border-white/10">
            {SERVICES.map((s, i) => (
              <li key={s.title} data-reveal data-reveal-delay={i * 0.06}>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }} data-cursor="Talk" className="service-row group">
                  <span className="text-xs tabular-nums text-white/40 transition-colors duration-500 group-hover:text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">{s.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/40">{t}</span>)}
                    </div>
                  </div>
                  <span className="text-xl opacity-30 transition-all duration-700 ease-out-expo group-hover:-rotate-45 group-hover:opacity-100">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
