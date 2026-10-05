import { PROCESS } from '../../data/content';
import { RevealText } from '../RevealText';
import { SectionLabel } from '../SectionLabel';

export function Process() {
  return (
    <section id="process" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-350 gap-10 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-6">
          <SectionLabel index="04" label="Philosophy" />
          <blockquote className="mt-8 font-display text-[clamp(1.75rem,3.6vw,3.5rem)] font-medium leading-[1.1] tracking-tight">
            <RevealText text="Restraint is the hardest effect to master. We animate only what carries meaning, and we make it feel inevitable." />
          </blockquote>
          <ol className="mt-20 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
            {PROCESS.map((p, i) => (
              <li key={p.step} data-reveal data-reveal-delay={i * 0.08} data-parallax={0.08 * (i % 2 ? 1 : -1)} className="bg-ink/80 p-8 backdrop-blur-sm">
                <div className="text-xs tabular-nums text-accent">0{i + 1}</div>
                <h3 className="mt-6 font-display text-2xl font-semibold">{p.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
