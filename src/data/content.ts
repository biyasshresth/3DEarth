import AuroraImage from '../assets/Aurora.jpg';
import WebGLImage from '../assets/WebGL.jpg';
import HeliosImage from '../assets/Helios.jpg';
import OrbitalImage from '../assets/Orbital.jpg';

export const NAV = [
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  { title: 'Creative Development', desc: 'Motion-rich front-ends where design intent survives production.', tags: ['GSAP', 'WebGL', 'React'] },
  { title: 'Web Experiences', desc: 'Award-level marketing sites and campaign experiences built to perform.', tags: ['Next.js', 'Headless CMS', 'SEO'] },
  { title: 'Interactive Design', desc: 'Interfaces defined by rhythm, tactility and micro-interaction.', tags: ['UX', 'Prototyping', 'Design Systems'] },
  { title: '3D & WebGL', desc: 'Real-time scenes, shaders and configurators that run smoothly everywhere.', tags: ['Three.js', 'GLSL', 'Blender'] },
  { title: 'Digital Products', desc: 'From MVP to scale: products engineered with craft and clarity.', tags: ['TypeScript', 'APIs', 'Cloud'] },
];

export const PROJECTS = [
  { title: 'Aurora Finance', category: 'Immersive fintech platform', year: '2025', hue: 224, image: AuroraImage },
  { title: 'Limbus Labs', category: 'WebGL product configurator', year: '2025', hue: 262, image: WebGLImage },
  { title: 'Hélios', category: 'Editorial e-commerce', year: '2024', hue: 200, image: HeliosImage },
  { title: 'Orbital', category: 'Real-time data visualisation', year: '2024', hue: 280, image: OrbitalImage },
];

export const PROCESS = [
  { step: 'Discover', desc: 'We map ambition, audience and constraints before a single pixel moves.' },
  { step: 'Design', desc: 'Concept, art direction and motion language, prototyped in the browser early.' },
  { step: 'Engineer', desc: 'Performance-first builds with clean architecture and obsessive polish.' },
  { step: 'Evolve', desc: 'Launch is a checkpoint. We measure, refine and keep the experience alive.' },
];
