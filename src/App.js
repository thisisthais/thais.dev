import React, { useMemo, useRef } from 'react';
import './App.css';

import { Canvas, useFrame } from 'react-three-fiber';
import { a } from 'react-spring/three';
import * as THREE from 'three';

import { BackgroundShader } from './BackgroundShader';

const deg = THREE.Math.degToRad;

function Thing() {
  const shaderData = useMemo(() => ({ ...BackgroundShader }), []);
  console.log(shaderData);

  const material = useRef();
  let t = 0;
  useFrame(() => {
    material.current.uniforms.u_time.value = Math.sin((t += 0.01));
  });
  return (
    <mesh scale={[20000, 20000, 1]} rotation={[0, deg(-20), 0]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.shaderMaterial attach="material" ref={material} {...shaderData} />
    </mesh>
  );
}

function App() {
  return (
    <div className="main">
      <Canvas
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
      <div className="header">Nav header</div>
      <div className="content">
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
        Main Content
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;
