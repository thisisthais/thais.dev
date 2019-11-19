import React, { useMemo, useRef, useEffect } from 'react';
import { a } from 'react-spring/three';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const HEIGHT = 0.1;
const WIDTH = 0.1;

// initial point is top right when facing camera
const calcInitialVertices = ([startX, startY, startZ]) => [
  [startX + WIDTH / 2, startY + HEIGHT / 2, startZ],
  [startX + WIDTH / 2, startY - HEIGHT / 2, startZ],
  [startX - WIDTH / 2, startY - HEIGHT / 2, startZ],
  [startX - WIDTH / 2, startY + HEIGHT / 2, startZ]
];

const pushBack = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x, v1y, v1z - length],
  [v2x, v2y, v2z - length],
  [v3x, v3y, v3z - length],
  [v4x, v4y, v4z - length]
];

const turn90Q1 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x + WIDTH, v3y, v3z + WIDTH],
  [v4x + WIDTH, v4y, v4z + WIDTH]
];

const pushRight = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x + length, v1y, v1z],
  [v2x + length, v2y, v2z],
  [v3x + length, v3y, v3z],
  [v4x + length, v4y, v4z]
];

const turn90Q2 = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x - WIDTH, v1y, v1z + WIDTH],
  [v2x - WIDTH, v2y, v2z + WIDTH],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
];

const pushFoward = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x, v1y, v1z + length],
  [v2x, v2y, v2z + length],
  [v3x, v3y, v3z + length],
  [v4x, v4y, v4z + length]
];

const turn90Q3 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x - WIDTH, v3y, v3z - WIDTH],
  [v4x - WIDTH, v4y, v4z - WIDTH]
];

const pushLeft = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x - length, v1y, v1z],
  [v2x - length, v2y, v2z],
  [v3x - length, v3y, v3z],
  [v4x - length, v4y, v4z]
];

const turn90Q0 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x + WIDTH, v1y, v1z - WIDTH],
  [v2x + WIDTH, v2y, v2z - WIDTH],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
];

const triangulateQ0toQ1 = (offset = 0) =>
  [
    // front
    [0, 2, 1],
    [0, 3, 2],
    // back
    [7, 5, 6],
    [7, 4, 5],
    // right
    [1, 4, 0],
    [1, 5, 4],
    // left
    [3, 7, 6],
    [3, 6, 2],
    // top
    [4, 7, 3],
    [4, 3, 0],
    // bottom
    [6, 1, 2],
    [6, 5, 1]
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const triangulateQ1toQ2 = (offset = 8) =>
  [
    // front
    [0, 1, 2],
    [0, 2, 3],
    // back
    [7, 6, 5],
    [7, 5, 4],
    // right
    [1, 0, 4],
    [1, 4, 5],
    // left
    [3, 6, 7],
    [3, 2, 6],
    // top
    [4, 3, 7],
    [4, 0, 3],
    // bottom
    [6, 2, 1],
    [6, 1, 5]
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const triangulateQ2toQ3 = (offset = 16) =>
  [
    // front
    [0, 2, 1],
    [0, 3, 2],
    // back
    [7, 5, 6],
    [7, 4, 5],
    // right
    [1, 4, 0],
    [1, 5, 4],
    // left
    [3, 7, 6],
    [3, 6, 2],
    // top
    [4, 7, 3],
    [4, 3, 0],
    // bottom
    [6, 1, 2],
    [6, 5, 1]
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const triangulateQ3toQ4 = (offset = 24) =>
  [
    // front
    [0, 1, 2],
    [0, 2, 3],
    // back
    [7, 6, 5],
    [7, 5, 4],
    // right
    [1, 0, 4],
    [1, 4, 5],
    // left
    [3, 6, 7],
    [3, 2, 6],
    // top
    [4, 3, 7],
    [4, 0, 3],
    // bottom
    [6, 2, 1],
    [6, 1, 5]
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const orderedVerticesFunctions = [
  [turn90Q0, pushBack],
  [turn90Q1, pushRight],
  [turn90Q2, pushFoward],
  [turn90Q3, pushLeft]
];
const orderedFacesFunctions = [
  triangulateQ0toQ1,
  triangulateQ1toQ2,
  triangulateQ2toQ3,
  triangulateQ3toQ4
];
const calcVerticesAndFaces = (listOfLengths, startingPoint = [0, 0, 0]) => {
  const vertices = [];
  const faces = [];
  for (let i = 0; i < listOfLengths.length; i++) {
    const functionsIndex = i % 4;
    // calculate the vertices, initial case is special since we have
    // to calculate the first face from initial point
    if (i === 0) {
      const initialFace = calcInitialVertices(startingPoint);
      vertices.push(...initialFace, ...pushBack(initialFace, listOfLengths[i]));
    } else {
      const [turnFunction, pushFunction] = orderedVerticesFunctions[
        functionsIndex
      ];
      const lastFaceVertices = vertices.slice(-4, vertices.length);
      const turnFaceVertices = turnFunction(lastFaceVertices);
      const pushFaceVertices = pushFunction(turnFaceVertices, listOfLengths[i]);
      vertices.push(...turnFaceVertices, ...pushFaceVertices);
    }

    // fake triangulate faces from vertices
    // fake because there's no math, i hardcoded the vertices based on patterns
    const triangulateFunction = orderedFacesFunctions[functionsIndex];
    // i*8 because each new block on the segment adds 8 vertices, so we need to offset
    faces.push(...triangulateFunction(i * 8));
  }
  return [
    vertices.map(v => new THREE.Vector3(...v)),
    faces.map(f => new THREE.Face3(...f))
  ];
};

export default ({
  lengths = [1, 1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const [vertices, faces] = useMemo(() => calcVerticesAndFaces(lengths), []);

  const fragmentShader = `
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
  initialColor += color;

  gl_FragColor = vec4(initialColor, 1.0);
}`;

  const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;

    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const shaderData = useMemo(
    () => ({
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
      fragmentShader,
      vertexShader
    }),
    []
  );

  const shaderRef = useRef();

  let canvasElement;
  useEffect(() => {
    canvasElement = document.getElementsByTagName('canvas')[0];
  }, []);

  useFrame(state => {
    shaderRef.current.uniforms.iTime.value =
      shaderRef.current.uniforms.iTime.value + 0.001;
    shaderRef.current.uniforms.iResolution.value = new THREE.Vector3(
      canvasElement.width,
      canvasElement.height,
      1
    );
  });

  return (
    <a.mesh position={position} rotation={rotation}>
      <geometry
        attach="geometry"
        vertices={vertices}
        faces={faces}
        onUpdate={self => self.computeFaceNormals()}
      />
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
      <a.shaderMaterial attach="material" ref={shaderRef} {...shaderData} />
    </a.mesh>
  );
};
