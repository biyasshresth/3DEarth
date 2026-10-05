import { RevealText } from '../RevealText';
import { SectionLabel } from '../SectionLabel';
import { MagneticButton } from '../MagneticButton';

export function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen flex-col px-6 pt-40 md:px-12">
      <div className="mx-auto w-full">
        <SectionLabel index="05" label="Contact" />
        <h2 className="mt-8 max-w-[12ch] font-display text-[clamp(3rem,8vw,9rem)] font-semibold leading-[0.95] tracking-tightest">
          <RevealText text="Let's build what's next." />
        </h2>
        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <a data-reveal href="mailto:hello@rpre.studio" className="link-line font-display text-2xl md:text-4xl">hello@rpre.studio</a>
          <div data-reveal data-reveal-delay="0.15"><MagneticButton href="mailto:hello@rpre.studio">Start a conversation</MagneticButton></div>
        </div>
        <div data-reveal data-reveal-delay="0.25" className="mt-24 grid gap-8 text-sm text-white/50 sm:grid-cols-3">
          <div><div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/30">Studio</div>Remote-first · Working globally</div>
          <div><div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/30">Social</div>
            <div className="flex gap-5">{['LinkedIn', 'Instagram', 'Facebook', 'Github'].map((s) => <a key={s} href="#" className="link-line hover:text-white">{s}</a>)}</div>
          </div>
          <div><div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-white/30">Availability</div>Taking on projects from 2025</div>
        </div>
      </div>
    </section>
  );
}
