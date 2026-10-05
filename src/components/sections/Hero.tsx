import { RevealText } from '../RevealText';
import { MagneticButton } from '../MagneticButton';

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-20">
      <div className="mx-auto w-full max-w-350">
        <p data-reveal data-reveal-delay="0.2" className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          Creative technology studio
        </p>
        <h1 className="max-w-[13ch] font-display text-[clamp(3rem,8.5vw,9.5rem)] font-semibold leading-[0.95] tracking-tightest">
          <RevealText text="We craft digital worlds that move." delay={0.35} />
        </h1>
        <div className=" grid items-end gap-8 -mt-20 md:grid-cols-12">
          <p data-reveal data-reveal-delay="0.7" className="max-w-md text-base leading-relaxed text-white/60 md:col-span-5 md:text-lg">
            RPRE Tech Studio designs and engineers cinematic web experiences, real-time 3D and interactive products for ambitious brands.
          </p>
          <div data-reveal data-reveal-delay="0.85" className="flex flex-wrap gap-4 md:col-span-7 md:justify-end">
            <MagneticButton href="#contact">Start a project</MagneticButton>
            <MagneticButton href="#work" variant="ghost">Selected work</MagneticButton>
          </div>
        </div>
        <div data-reveal data-reveal-delay="1" className="mt-16 flex justify-between text-[11px] uppercase tracking-[0.25em] text-white/40">
          <span className="flex items-center gap-3"><span className="scroll-hint" /> Scroll to explore</span>
          <span>Est. 2021 · Worldwide</span>
        </div>
      </div>
    </section>
  );
}
