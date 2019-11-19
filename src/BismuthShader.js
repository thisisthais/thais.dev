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

    vec3 phong() {
      vec3 n = normalize(Normal);
      vec3 s = normalize(vec3(LightPosition) - Position);
      vec3 v = normalize(vec3(-Position));
      vec3 r = reflect(-s, n);

      vec3 ambient = Ka;
      vec3 diffuse = Kd * max(dot(s, n), 0.0);
      vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

      return LightIntensity * (ambient + diffuse + specular);
    }

    vec3 hsb2rgb( in vec3 c ){
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                                6.0)-3.0)-1.0,
                        0.0,
                        1.0 );
      rgb = rgb*rgb*(3.0-2.0*rgb);
      return c.z * mix( vec3(1.0), rgb, c.y);
    }

    vec3 pretty() {
      vec4 fragColor = gl_FragColor;
      vec2 fragCoord = gl_FragCoord.xy;

      vec2 uv = fragCoord.xy / iResolution.xy;
      vec2 p=(2.0*fragCoord.xy-iResolution.xy)/max(iResolution.x,iResolution.y);

      for(int i=1;i<45;i++) {
        vec2 newp=p;
        newp.x+=(0.5/float(i))*cos(float(i)*p.y+iTime*11.0/37.0+0.03*float(i))+1.3;		
        newp.y-=(0.5/float(i))*cos(float(i)*p.x+iTime*17.0/41.0+0.03*float(i+10))+1.9;
        p=newp;
      }

      
      vec3 col=vec3(max(0.5, 0.5*sin(3.0*p.x)+0.5),min(0.75, 0.5*cos(3.0*p.y)+0.5),max(0.75, sin(1.3*p.x+1.7*p.y)));
      return col;
    }

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

      vec3 initialColor = spectral_zucconi6(Position.x + Position.y + Position.z)/3.;

      vec3 color = vec3(0.);
      float gapDistance =1.25;
      for (int n = 1; n <= 8; n++) {
        float wavelength = abs(sin(lightDirection) - sin(viewDirection))*gapDistance / float(n);
        color += spectral_zucconi6(wavelength);
      }
      color.x *= 1.5;
      initialColor += color + pretty()/5.0;

      gl_FragColor = vec4(initialColor, 1.0);
    }
  `
};

export { BismuthShader };
