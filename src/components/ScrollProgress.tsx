export function ScrollProgress() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-px bg-white/5" aria-hidden>
      <div className="h-full origin-left bg-linear-to-r from-accent to-accent-violet" style={{ transform: 'scaleX(var(--scroll-progress))' }} />
    </div>
  );
}
