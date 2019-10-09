import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';
import { hsluvToHex } from 'hsluv';
import { default as Segment } from './BismuthSegment';

const interpolateHue = idx => (360 * (idx + (1 % 12))) / 12;

const OUTER_LENGTH = 2;
const HEIGHT = 0.25;

const Base = ({ position = [0, 0, 0] }) => {
  const boxGeo = new THREE.BoxGeometry(
    2 * OUTER_LENGTH,
    HEIGHT,
    2 * OUTER_LENGTH
  );
  boxGeo.faces.forEach((face, idx) => {
    face.vertexColors = [
      // new THREE.Color(hsluvToHex([interpolateHue(idx + 4), 100, 60])),
      // new THREE.Color(hsluvToHex([interpolateHue(idx + 7), 100, 70])),
      // new THREE.Color(hsluvToHex([interpolateHue(idx), 100, 50]))
      new THREE.Color().setHSL(idx / 12, 0.5, 0.5),
      new THREE.Color().setHSL(idx / 12 + 0.1, 0.5, 0.5),
      new THREE.Color().setHSL(idx / 12 + 0.2, 0.5, 0.5)
    ];
  });
  return (
    <a.mesh geometry={boxGeo} position={position}>
      <a.meshBasicMaterial
        attach="material"
        vertexColors={THREE.VertexColors}
      />
    </a.mesh>
  );
};

export default () => {
  return (
    <>
      <Segment position={[-2, 0, -2]} lengths={[1, 1, 1, 1]} />
      <Segment position={[0, 0, -1.8]} lengths={[1.2, 1, 1]} />
      <Segment position={[2, 0, -1.8]} lengths={[1.2, 1, 0.5]} />
      <Segment position={[-2, 0, 0]} lengths={[1.2, 1, 1, 0.4]} />
      <Segment position={[0, 0, 0]} lengths={[1.2, 1, 0.5, 0.4]} />
      <Segment position={[2, 0, 0]} lengths={[1.2, 1, 0.7, 0.5, 0.25]} />
      <Segment
        position={[-1.7, 0, 1.6]}
        lengths={[0.5, 1, 1, 0.4]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Segment
        position={[0.3, 0, 1.3]}
        lengths={[0.5, 0.5, 1, 1, 0.4]}
        rotation={[0, Math.PI, 0]}
      />
      <Segment
        position={[2, 0, 1]}
        lengths={[0.4, 0.3, 0.6, 1, 1, 0.4, 0.3]}
        rotation={[0, Math.PI, 0]}
      />
    </>
  );
};
