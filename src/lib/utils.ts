export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

 export const dampFactor = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

export function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isFinePointer = () => window.matchMedia('(pointer: fine)').matches;
export const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;
