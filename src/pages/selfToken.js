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
  useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      position={position}
      ref={ref}
      onClick={(event) => {
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
        <h4>You often have a backup plan for your backup plan.</h4>
        <Slider
          getAriaLabel={() => 'Radius'}
          defaultValue={radius}
          marks={true}
          min={1}
          max={1.8}
          step={0.2}
          onChange={(_, value) => setRadius(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => VALUES_1[value]}
        />
        <h4>
          You prefer to completely finish one project before starting another.
        </h4>
        <Slider
          getAriaLabel={() => 'Tube'}
          defaultValue={tube}
          marks={true}
          min={0.1}
          max={0.5}
          step={0.1}
          onChange={(_, value) => setTube(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => VALUES_2[value]}
        />
        <h4>
          You feel comfortable just walking up to someone you find interesting
          and striking up a conversation.
        </h4>
        <Slider
          getAriaLabel={() => 'Tubular Segments'}
          defaultValue={tubularSegments}
          marks={true}
          min={12}
          max={112}
          step={25}
          onChange={(_, value) => setTubularSegments(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => VALUES_3[value]}
        />
        <h4>
          After a long and exhausting week, a lively social event is just what
          you need.
        </h4>
        <Slider
          getAriaLabel={() => 'Radial Segments'}
          defaultValue={radialSegments}
          marks={true}
          min={3}
          max={11}
          step={2}
          onChange={(_, value) => setRadialSegments(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => VALUES_4[value]}
        />
        <h4>
          Your personal work style is closer to spontaneous bursts of energy
          than organized and consistent efforts.
        </h4>
        <Slider
          getAriaLabel={() => 'Winds around axis of rotational symmetry'}
          defaultValue={p}
          marks={true}
          min={2}
          max={6}
          step={1}
          onChange={(_, value) => setP(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => VALUES_5[value]}
        />
        <h4>You are more inclined to follow your head than your heart.</h4>
        <Slider
          getAriaLabel={() =>
            'Winds around a cricle in the interior of the torus'
          }
          defaultValue={q}
          marks={true}
          min={3}
          max={7}
          step={1}
          onChange={(_, value) => setQ(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => VALUES_6[value]}
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

const VALUES_1 = {
  1.0: 1,
  1.2: 2,
  1.4: 3,
  1.6: 4,
  1.8: 5,
};

const VALUES_2 = {
  0.1: 1,
  0.2: 2,
  0.3: 3,
  0.4: 4,
  0.5: 5,
};

const VALUES_3 = {
  12: 1,
  37: 2,
  62: 3,
  87: 4,
  112: 5,
};

const VALUES_4 = {
  3: 1,
  5: 2,
  7: 3,
  9: 4,
  11: 5,
};

const VALUES_5 = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
};

const VALUES_6 = {
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
};

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
