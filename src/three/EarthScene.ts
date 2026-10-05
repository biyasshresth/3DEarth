import * as THREE from 'three';
import { ATMOSPHERE_FRAGMENT, ATMOSPHERE_VERTEX } from './shaders';
import { dampFactor, lerp } from '../lib/utils';

 export interface EarthState {
  x: number; y: number; z: number;       
  tiltX: number; tiltZ: number; spin: number;  
  scale: number;
  camX: number; camY: number; camZ: number;
  sunX: number; sunY: number; sunZ: number; sun: number; fill: number;
  glow: number;                               
}

 export const INTRO_STATE: EarthState = {
  x: 0, y: -0.4, z: 0, tiltX: 0.4, tiltZ: 0, spin: -0.8, scale: 0.55,
  camX: 0, camY: 0, camZ: 10, sunX: -6, sunY: 2, sunZ: 4, sun: 0.5, fill: 0.2, glow: 0.4,
};

const TEXTURE_BASE = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/';
const IDLE_SPIN_SPEED = 0.04;  
const DAMPING = 4.2;          
const LOAD_TIMEOUT_MS = 9000;

export interface EarthSceneOptions {
  canvas: HTMLCanvasElement;
  reducedMotion?: boolean;
  lowPower?: boolean;
  onProgress?: (progress: number) => void;
  onReady?: () => void;
}

export class EarthScene {
  readonly target: EarthState = { ...INTRO_STATE };
  private readonly current: EarthState = { ...INTRO_STATE };
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly earthGroup = new THREE.Group();
  private readonly earth: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>;
  private readonly clouds: THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial> | null = null;
  private readonly innerGlow: THREE.ShaderMaterial;
  private readonly outerGlow: THREE.ShaderMaterial;
  private readonly stars: THREE.Points;
  private readonly sun = new THREE.DirectionalLight(0xfff1e0, 2.4);
  private readonly fill = new THREE.DirectionalLight(0x6b8cff, 0.5);
  private readonly clock = new THREE.Clock();
  private readonly pointer = new THREE.Vector2();
  private readonly pointerSmoothed = new THREE.Vector2();
  private readonly textures: THREE.Texture[] = [];
  private rafId = 0;
  private running = false;
  private idleSpin = 0;
  private scrollProgress = 0;
  private readyFired = false;
  private readyTimeout = 0;

  constructor(private readonly opts: EarthSceneOptions) {
    const { canvas, lowPower } = opts;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    this.camera.position.set(0, 0, INTRO_STATE.camZ);
    this.scene.add(new THREE.AmbientLight(0x1a2240, 0.6));
    this.fill.position.set(-4, -2, -3);
    this.scene.add(this.sun, this.fill);

    const segments = lowPower ? 48 : 72;
    this.earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, segments, segments),
      new THREE.MeshPhongMaterial({ color: 0x9fb4d8, specular: 0x2a3d6e, shininess: 16 }),
    );
    this.earthGroup.add(this.earth);

    if (!lowPower) {
      this.clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.012, segments, segments),
        new THREE.MeshLambertMaterial({ transparent: true, opacity: 0.55, depthWrite: false }),
      );
      this.clouds.visible = false; 
      this.earthGroup.add(this.clouds);
    }

    const makeGlow = (bias: number, power: number, color: number, side: THREE.Side) =>
      new THREE.ShaderMaterial({
        vertexShader: ATMOSPHERE_VERTEX,
        fragmentShader: ATMOSPHERE_FRAGMENT,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: 1 },
          uBias: { value: bias },
          uPower: { value: power },
        },
        side, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      });
    this.innerGlow = makeGlow(1.0, 3.0, 0x5d7dff, THREE.FrontSide);
    this.outerGlow = makeGlow(0.55, 3.5, 0x4a6cff, THREE.BackSide);
    this.earthGroup.add(
      new THREE.Mesh(new THREE.SphereGeometry(1.02, 48, 48), this.innerGlow),
      new THREE.Mesh(new THREE.SphereGeometry(1.18, 48, 48), this.outerGlow),
    );
    this.scene.add(this.earthGroup);
    this.stars = this.createStars(lowPower ? 900 : 1800);
    this.scene.add(this.stars);
    this.loadTextures();
    this.handleResize();

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('pointermove', this.handlePointer, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibility);
  }
  setScrollProgress(p: number) { this.scrollProgress = p; }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    this.tick();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  dispose() {
    this.stop();
    window.clearTimeout(this.readyTimeout);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.handlePointer);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m: THREE.Material) => m.dispose());
      }
    });
    this.textures.forEach((t) => t.dispose());
    this.renderer.dispose();
  }

  private createStars(count: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xbfcaff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.7, depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }

  private loadTextures() {
    const manager = new THREE.LoadingManager();
    manager.onProgress = (_url, loaded, total) => this.opts.onProgress?.(loaded / total);
    manager.onLoad = () => this.fireReady();
    const loader = new THREE.TextureLoader(manager);
    loader.setCrossOrigin('anonymous');
    const aniso = this.renderer.capabilities.getMaxAnisotropy();
    const load = (file: string, onLoad: (t: THREE.Texture) => void) =>
      loader.load(TEXTURE_BASE + file, (t) => { t.anisotropy = aniso; this.textures.push(t); onLoad(t); });
    const mat = this.earth.material;
    load('earth_atmos_2048.jpg', (t) => { t.colorSpace = THREE.SRGBColorSpace; mat.map = t; mat.color.set(0xffffff); mat.needsUpdate = true; });
    load('earth_normal_2048.jpg', (t) => { mat.normalMap = t; mat.normalScale.set(0.8, 0.8); mat.needsUpdate = true; });
    load('earth_specular_2048.jpg', (t) => { mat.specularMap = t; mat.needsUpdate = true; });
    if (this.clouds) {
      const clouds = this.clouds;
      load('earth_clouds_1024.png', (t) => { t.colorSpace = THREE.SRGBColorSpace; clouds.material.map = t; clouds.material.needsUpdate = true; clouds.visible = true; });
    }
    this.readyTimeout = window.setTimeout(() => this.fireReady(), LOAD_TIMEOUT_MS);
  }

  private fireReady() {
    if (this.readyFired) return;
    this.readyFired = true;
    this.opts.onReady?.();
  }

  private handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.opts.lowPower ? 1.5 : 2));
    this.renderer.setSize(w, h, false);
  };

  private handlePointer = (e: PointerEvent) => {
    this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  };

  private handleVisibility = () => {
    if (document.hidden) this.stop(); else this.start();
  };
  private tick = () => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.tick);

    const dt = Math.min(this.clock.getDelta(), 1 / 20);
    const k = dampFactor(DAMPING, dt);
    const c = this.current;
    const t = this.target;
    (Object.keys(t) as Array<keyof EarthState>).forEach((key) => { c[key] = lerp(c[key], t[key], k); });
    this.idleSpin += dt * IDLE_SPIN_SPEED * (this.opts.reducedMotion ? 0.4 : 1);
    this.pointerSmoothed.lerp(this.pointer, dampFactor(2.5, dt));

    const xComp = Math.min(1, this.camera.aspect / 1.6);
    this.earthGroup.position.set(c.x * xComp, c.y, c.z);
    this.earthGroup.rotation.set(c.tiltX, 0, c.tiltZ);
    this.earthGroup.scale.setScalar(c.scale);
    this.earth.rotation.y = this.idleSpin + c.spin;
    if (this.clouds) this.clouds.rotation.y = this.idleSpin * 1.3 + c.spin * 1.02;
    this.camera.position.set(c.camX + this.pointerSmoothed.x * 0.35, c.camY + this.pointerSmoothed.y * 0.2, c.camZ);
    this.camera.lookAt(0, 0, 0);
    this.sun.position.set(c.sunX, c.sunY, c.sunZ);
    this.sun.intensity = c.sun;
    this.fill.intensity = c.fill;
    this.outerGlow.uniforms.uIntensity.value = c.glow;
    this.innerGlow.uniforms.uIntensity.value = c.glow * 0.6;
    this.stars.rotation.y = this.idleSpin * 0.15 + this.scrollProgress * 0.5;
    this.stars.rotation.x = this.scrollProgress * 0.25;
    this.renderer.render(this.scene, this.camera);
  };
}
