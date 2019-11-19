import * as THREE from 'three';

const BismuthShader = {
  uniforms: {
    // phong uniforms
    Ka: { value: new THREE.Vector3(1, 1, 1) },
    Kd: { value: new THREE.Vector3(1, 1, 1) },
    Ks: { value: new THREE.Vector3(1, 1, 1) },
    LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
    LightPosition: { value: new THREE.Vector4(3.0, 3.0, 2.0, 1.0) },
    Shininess: { value: 200.0 },
    // basic uniforms
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector3() }
    // iridescence uniform
  },
  vertexShader: `
    varying vec3 Normal;
    varying vec3 Position;

    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 Normal;
    varying vec3 Position;

    uniform vec3 Ka;
    uniform vec3 Kd;
    uniform vec3 Ks;
    uniform vec4 LightPosition;
    uniform vec3 LightIntensity;
    uniform float Shininess;
    uniform float iTime;
    uniform vec3 iResolution;

    // --- Spectral Zucconi --------------------------------------------
    // By Alan Zucconi
    // Based on GPU Gems: https://developer.nvidia.com/sites/all/modules/custom/gpugems/books/GPUGems/gpugems_ch08.html
    // But with values optimised to match as close as possible the visible spectrum
    // Fits this: https://commons.wikimedia.org/wiki/File:Linear_visible_spectrum.svg
    // With weighter MSE (RGB weights: 0.3, 0.59, 0.11)
    vec3 bump3y (vec3 x, vec3 yoffset) {
      vec3 y = vec3(1.,1.,1.) - x * x;
      y = saturate(y-yoffset);
      return y;
    }

    // --- Spectral Zucconi 6 -----------------------------------------
    // Based on GPU Gems
    // Optimised by Alan Zucconi
    vec3 spectral_zucconi6 (float w) {
      // w: [400, 700]
      // x: [0,   1]
      float x = saturate((w - 400.0)/ 300.0);

      const vec3 c1 = vec3(3.54585104, 2.93225262, 2.41593945);
      const vec3 x1 = vec3(0.69549072, 0.49228336, 0.27699880);
      const vec3 y1 = vec3(0.02312639, 0.15225084, 0.52607955);

      const vec3 c2 = vec3(3.90307140, 3.21182957, 3.96587128);
      const vec3 x2 = vec3(0.11748627, 0.86755042, 0.66077860);
      const vec3 y2 = vec3(0.84897130, 0.88445281, 0.73949448);

      return
        bump3y(c1 * (x - x1), y1) +
        bump3y(c2 * (x - x2), y2) ;
    }

    void main() {
      vec3 viewVector = normalize(cameraPosition - Position);
      float viewDirection = acos(dot(viewVector, Normal)/length(viewVector)*length(Normal));

      vec3 lightVector = normalize(LightPosition.xyz - Position);
      float lightDirection = acos(dot(lightVector, Normal)/length(viewVector)*length(Normal));

      float w = abs(viewVector.x)*300. + 400.;
      vec3 zucColor = spectral_zucconi6(w);

      gl_FragColor = vec4(zucColor, 1.0);
    }
  `
};

export { BismuthShader };
