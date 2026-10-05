export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div data-reveal className="flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-white/50">
      <span className="text-accent">{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
    </div>
  );
}
