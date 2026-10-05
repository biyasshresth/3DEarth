import { useEffect, useRef } from 'react';
import { EarthScene } from '../three/EarthScene';
import { isMobileViewport } from '../lib/utils';

interface Props {
  reducedMotion: boolean;
  onScene: (scene: EarthScene) => void;
  onProgress: (p: number) => void;
  onReady: () => void;
}

export function EarthCanvas({ reducedMotion, onScene, onProgress, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cb = useRef({ onScene, onProgress, onReady });
  cb.current = { onScene, onProgress, onReady };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new EarthScene({
      canvas,
      reducedMotion,
      lowPower: isMobileViewport(),
      onProgress: (p) => cb.current.onProgress(p),
      onReady: () => cb.current.onReady(),
    });
    scene.start();
    cb.current.onScene(scene);
    return () => scene.dispose();
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full" aria-hidden="true" />;
}

export function WebGLFallback() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute right-[-10vw] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#4d6fd6_0%,#12244f_45%,#050609_70%)] shadow-[0_0_120px_40px_rgba(75,108,255,0.25)]" />
    </div>
  );
}
