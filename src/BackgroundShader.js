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
  fragmentShader: `
      varying vec3 Normal;
      varying vec3 Position;

      uniform float u_time;

      void main() {
        gl_FragColor=vec4(u_time, u_time, u_time, 1.0);
      }
    `
};

export { BackgroundShader };
