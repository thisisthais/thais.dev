import React, {
  createContext,
  createRef,
  useContext,
  useEffect,
  useRef
} from 'react';
import './App.css';

import { Canvas } from 'react-three-fiber';
import { a } from 'react-spring/three';
import * as THREE from 'three';

const deg = THREE.Math.degToRad;

function Thing() {
  const shaderData = {
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

      void main() {
        gl_FragColor=vec4(0.5, 0.5, 0.5, 1.0);
      }

    `
  };
  return (
    <mesh scale={[20000, 20000, 1]} rotation={[0, deg(-20), 0]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.shaderMaterial attach="material" {...shaderData} />
    </mesh>
  );
}

function App() {
  return (
    <div class="main">
      <Canvas
        invalidateFrameloop
        camera={{
          fov: 90,
          position: [0, 0, 1800],
          rotation: [0, deg(-20), deg(180)],
          near: 0.1,
          far: 20000
        }}
      >
        <spotLight intensity={0.5} position={[-300, 300, 4000]} />
        <Thing />
      </Canvas>
    </div>
  );
}

export default App;
