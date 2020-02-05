import bgShader from 'raw-loader!glslify-loader!./backgroundShader.glsl';

const BackgroundShader = {
  uniforms: { u_time: { type: 'f', value: 0 } },
  vertexShader: `
      varying vec3 Normal;
      varying vec3 Position;
      void main() {
        Normal = normalize(normalMatrix * normal);
        Position = vec3(modelViewMatrix * vec4(position, 1.0));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  fragmentShader: bgShader
};

export { BackgroundShader };
