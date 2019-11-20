import * as THREE from 'three';

const BismuthShader = {
  uniforms: {
    LightPosition: { value: new THREE.Vector4(0.0, 5.0, -2.0, 1.0) },
    GapDistance: { value: 0.0 }
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

    uniform vec4 LightPosition;
    uniform float GapDistance;

    vec3 bump3y(in vec3 x, in vec3 yoffset) {
      vec3 y = vec3(1.0) - x * x;
      y = clamp(y - yoffset, 0.0, 1.9);
      return y;
    }

    vec3 spectral_zucconi6(in float x) {
      const vec3 c1 = vec3(3.54585104, 2.93225262, 2.41593945);
      const vec3 x1 = vec3(0.69549072, 0.49228336, 0.27699880);
      const vec3 y1 = vec3(0.02312639, 0.15225084, 0.52607955);

      const vec3 c2 = vec3(3.90307140, 3.21182957, 3.96587128);
      const vec3 x2 = vec3(0.11748627, 0.86755042, 0.66077860);
      const vec3 y2 = vec3(0.84897130, 0.88445281, 0.73949448);

      return
        bump3y(c1 * (x - x1), y1) +
        bump3y(c2 * (x - x2), y2);
    }

    void main() {
      vec3 viewVector = normalize(cameraPosition - Position);
      float viewDirection = acos(dot(viewVector, Normal)/length(viewVector)*length(Normal));

      vec3 lightVector = normalize(LightPosition.xyz - Position);
      float lightDirection = acos(dot(lightVector, Normal)/length(viewVector)*length(Normal));

      float w = abs(viewVector.z)*300. + 400.;
      //vec3 initialColor = spectral_zucconi6(w);
      vec3 initialColor = spectral_zucconi6((viewVector.x + viewVector.y + viewVector.z)/2.);

      vec3 color = vec3(0.);
      float gapDistance = GapDistance;
      for (int n = 1; n <= 8; n++) {
        float wavelength = abs(sin(lightDirection) - sin(viewDirection))*gapDistance / float(n);
        color += spectral_zucconi6(wavelength);
      }
      color *= 0.5;
      initialColor += color;

      gl_FragColor = vec4(initialColor, 1.0);
    }
  `
};

export { BismuthShader };
