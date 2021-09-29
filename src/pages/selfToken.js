import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

const Shape = ({ position, children }) => {
  const exporter = new GLTFExporter();
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      position={position}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active);
        exporter.parse(
          ref.current,
          function (gltf) {
            downloadJSON(gltf, 'selfToken.gltf');
          },
          {}
        );
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {children}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default function SelfToken() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Shape position={[0, 0, 0]}>
        <torusKnotBufferGeometry args={[1, 0.2, 64, 8]} />
      </Shape>
    </Canvas>
  );
}

function downloadJSON(json, filename) {
  saveString(JSON.stringify(json), filename);
}

function saveString(text, filename) {
  save(new Blob([text], { type: 'model/gltf+json' }), filename);
}

var link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...
}
