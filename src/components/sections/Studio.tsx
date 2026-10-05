import { RevealText } from '../RevealText';
import { SectionLabel } from '../SectionLabel';

const STATS = [['40+', 'Projects shipped'], ['12', 'Industry awards'], ['6', 'Countries'], ['100%', 'In-house craft']];

export function Studio() {
  return (
    <section id="studio" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-6">
          <SectionLabel index="01" label="Studio" />
          <h2 className="-mt-10 font-display text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            <RevealText text="A studio at the intersection of design, motion and engineering." />
          </h2>
          <p data-reveal className="mt-10 max-w-xl text-lg leading-relaxed text-white/60">
            We are a small, senior team of designers and creative technologists. We build experiences that feel alive: considered, fluid and technically uncompromising.
          </p>
          <p data-reveal data-reveal-delay="0.1" className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Every project is treated as a single continuous story, from the first frame to the last interaction.
          </p>
          <ul data-reveal data-reveal-delay="0.2" className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {STATS.map(([v, l]) => (
              <li key={l}>
                <div className="font-display text-4xl font-semibold">{v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{l}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
