import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { Slider } from '@material-ui/core';
import '../utils/selfToken.css';

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
  const [radius, setRadius] = useState(1.4);
  const [tube, setTube] = useState(0.3);
  const [tubularSegments, setTubularSegments] = useState(62);
  const [radialSegments, setRadialSegments] = useState(7);
  const [p, setP] = useState(2);
  const [q, setQ] = useState(3);
  return (
    <div className="container">
      <div className="slidersContainer">
        <Slider
          getAriaLabel={() => 'Radius'}
          defaultValue={radius}
          marks={true}
          min={1}
          max={1.8}
          step={0.2}
          onChange={(_, value) => setRadius(value)}
          valueLabelDisplay="auto"
        />
        <Slider
          getAriaLabel={() => 'Tube'}
          defaultValue={tube}
          marks={true}
          min={0.1}
          max={0.5}
          step={0.1}
          onChange={(_, value) => setTube(value)}
          valueLabelDisplay="auto"
        />
        <Slider
          getAriaLabel={() => 'Tubular Segments'}
          defaultValue={tubularSegments}
          marks={true}
          min={12}
          max={112}
          step={25}
          onChange={(_, value) => setTubularSegments(value)}
          valueLabelDisplay="auto"
        />
        <Slider
          getAriaLabel={() => 'Radial Segments'}
          defaultValue={radialSegments}
          marks={true}
          min={3}
          max={11}
          step={2}
          onChange={(_, value) => setRadialSegments(value)}
          valueLabelDisplay="auto"
        />
        <Slider
          getAriaLabel={() => 'Winds around axis of rotational symmetry'}
          defaultValue={p}
          marks={true}
          min={2}
          max={6}
          step={1}
          onChange={(_, value) => setP(value)}
          valueLabelDisplay="auto"
        />
        <Slider
          getAriaLabel={() =>
            'Winds around a cricle in the intereior of the torus'
          }
          defaultValue={q}
          marks={true}
          min={1}
          max={12}
          step={1}
          onChange={(_, value) => setQ(value)}
          valueLabelDisplay="auto"
        />
      </div>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Shape position={[0, 0, 0]}>
          <torusKnotBufferGeometry
            args={[radius, tube, tubularSegments, radialSegments, p, q]}
          />
        </Shape>
      </Canvas>
    </div>
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
