import type { EarthState } from '../three/EarthScene';

export const SECTION_IDS = ['hero', 'studio', 'services', 'work', 'process', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

const BASE: EarthState = {
  x: 0, y: 0, z: 0, tiltX: 0.2, tiltZ: 0, spin: 0, scale: 1,
  camX: 0, camY: 0, camZ: 6, sunX: -5, sunY: 3, sunZ: 4, sun: 2.4, fill: 0.5, glow: 1,
};
const frame = (o: Partial<EarthState>): EarthState => ({ ...BASE, ...o });

export const DESKTOP_KEYFRAMES: Record<SectionId, EarthState> = {
  hero:     frame({ x: 1.7,  y: -0.25, scale: 1.4,  tiltX: 0.18 }),
  studio:   frame({ x: -2.1, y: 0.15,  scale: 1.05, tiltX: 0.32, tiltZ: -0.1, spin: 0.9, camZ: 6.4, sunX: 4, glow: 1.15 }),
  services: frame({ x: 2.3,  y: 0.4,   scale: 0.9,  tiltX: 0.1, tiltZ: 0.15, spin: 1.9, camZ: 5.6, camY: 0.2, sunX: -3, sunY: 5 }),
  work:     frame({ x: 0.4,  y: 2.1, z: -2, scale: 0.75, tiltX: -0.1, spin: 2.8, camZ: 7.5, sun: 1.3, fill: 0.3, glow: 0.55 }),
  process:  frame({ x: -1.9, y: -0.35, scale: 1.2,  tiltX: -0.22, tiltZ: -0.18, spin: 3.6, camZ: 6.2, sunX: 5, sunY: -1, sun: 2.2, glow: 1.25 }),
  contact:  frame({ x: 0,    y: -2.9,  scale: 2.5,  tiltX: -0.4, spin: 4.4, camY: -0.3, sunX: -2, sunY: 4, sunZ: 3, sun: 2.8, fill: 0.7, glow: 1.7 }),
};

export const MOBILE_KEYFRAMES: Record<SectionId, EarthState> = {
  hero:     frame({ y: -1.3, scale: 1.1, camZ: 7 }),
  studio:   frame({ x: 0.9, y: 1.4, scale: 0.8, spin: 0.9, camZ: 7 }),
  services: frame({ x: -0.9, y: 1.5, scale: 0.7, spin: 1.9, camZ: 7 }),
  work:     frame({ y: 2.6, z: -2, scale: 0.6, spin: 2.8, camZ: 8, sun: 1.3, glow: 0.5 }),
  process:  frame({ x: 0.8, y: -1.6, scale: 0.9, spin: 3.6, camZ: 7, glow: 1.2 }),
  contact:  frame({ y: -2.6, scale: 2, spin: 4.4, camZ: 6.5, sun: 2.8, glow: 1.7 }),
};
