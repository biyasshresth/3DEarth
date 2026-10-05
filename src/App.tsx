import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EarthCanvas, WebGLFallback } from './components/EarthCanvas';
import { Preloader } from './components/Preloader';
import { Nav } from './components/Nav';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { Studio } from './components/sections/Studio';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { Process } from './components/sections/Process';
import { Contact } from './components/sections/Contact';
import { LenisContext, useLenis } from './hooks/useLenis';
import { createScrollChoreography } from './animation/scrollChoreography';
import { initReveals } from './animation/reveals';
import type { EarthScene } from './three/EarthScene';
import { isWebGLAvailable, prefersReducedMotion } from './lib/utils';

type Phase = 'loading' | 'revealing' | 'ready';

export default function App() {
  const webgl = useMemo(isWebGLAvailable, []);
  const reducedMotion = useMemo(prefersReducedMotion, []);
  const [progress, setProgress] = useState(0);
  const [sceneReady, setSceneReady] = useState(!webgl);
  const [phase, setPhase] = useState<Phase>('loading');
  const sceneRef = useRef<EarthScene | null>(null);
  const lenis = useLenis(!reducedMotion);
  const revealed = phase !== 'loading';

  // Lock scrolling behind the preloader
  useEffect(() => {
    document.body.style.overflow = revealed ? '' : 'hidden';
    if (lenis) revealed ? lenis.start() : lenis.stop();
  }, [revealed, lenis]);

  // Scroll choreography + entrance reveals start the moment the curtain lifts
  useEffect(() => {
    if (!revealed) return;
    const scene = sceneRef.current;
    const disposeChoreo = createScrollChoreography(scene?.target ?? null, {
      onProgress: (p) => {
        document.documentElement.style.setProperty('--scroll-progress', p.toFixed(4));
        scene?.setScrollProgress(p);
      },
    });
    const disposeReveals = initReveals();
    ScrollTrigger.refresh();
    return () => { disposeChoreo(); disposeReveals(); };
  }, [revealed]);

  return (
    <LenisContext.Provider value={lenis}>
      {webgl ? (
        <EarthCanvas reducedMotion={reducedMotion} onScene={(s) => { sceneRef.current = s; }} onProgress={setProgress} onReady={() => setSceneReady(true)} />
      ) : <WebGLFallback />}
      <div className="noise" aria-hidden />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <main className="relative z-10">
        <Hero /><Studio /><Services /><Work /><Process /><Contact />
      </main>
      <Footer />
      {phase !== 'ready' && (
        <Preloader progress={progress} sceneReady={sceneReady} onReveal={() => setPhase('revealing')} onComplete={() => setPhase('ready')} />
      )}
    </LenisContext.Provider>
  );
}
