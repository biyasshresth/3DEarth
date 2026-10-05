import { PROJECTS } from "../../data/content";
import { RevealText } from "../RevealText";
import { SectionLabel } from "../SectionLabel";
import { useTilt } from "../../hooks/useTilt";
function WorkCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const tilt = useTilt<HTMLDivElement>(5);
  return (
    <article
      data-reveal-clip
      data-reveal-delay={(i % 2) * 0.12}
      className={`group ${i % 2 ? "md:mt-32" : ""}`}
    >
      {" "}
      <div
        ref={tilt}
        data-cursor="View"
        className="work-media relative aspect-4/5 overflow-hidden rounded-sm"
      >
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="absolute bottom-6 left-6 translate-y-4 text-[11px] uppercase tracking-[0.25em] text-white/70 opacity-0 transition-all duration-700 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          Case study →
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold">{p.title}</h3>
          <p className="mt-1 text-sm text-white/50"> {p.category} </p>
        </div>
        <span className="text-xs text-white/40"> {p.year} </span>
      </div>
    </article>
  );
}
export function Work() {
  return (
    <section id="work" className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-350">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="03" label="Selected work" />
            <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              <RevealText text="Work that travels." />
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-sm text-sm leading-relaxed text-white/50"
          >
            A selection of recent collaborations across finance, culture and
            technology.
          </p>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {PROJECTS.map((p, i) => (
            <WorkCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
