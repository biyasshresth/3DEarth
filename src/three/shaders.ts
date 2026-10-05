export const ATMOSPHERE_VERTEX =  `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const ATMOSPHERE_FRAGMENT =  `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uBias;
  uniform float uPower;
  varying vec3 vNormal;
  void main() {
    float rim = pow(max(uBias - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), uPower);
    gl_FragColor = vec4(uColor * rim * uIntensity, 1.0);
  }
`;
