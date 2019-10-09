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

// don't ask me where these numbers came from but it depends on
// the y axis rotation, aka rotation[1]
const rotationOffsetMapping = {
  0: { xOff: -0.05, zOff: 0.05 },
  [Math.PI / 2]: { xOff: 0.05, zOff: 0.05 },
  [Math.PI]: { xOff: 0.05, zOff: -0.05 }
};

const generateTower = (
  { lengths, position, height, rotation = [0, 0, 0] },
  towerList = []
) => {
  if (height <= 1) {
    return [
      ...towerList,
      <Segment position={position} lengths={lengths} rotation={rotation} />
    ];
  }

  towerList.push(
    <Segment position={position} lengths={lengths} rotation={rotation} />
  );
  const [x, y, z] = position;
  const { xOff, zOff } = rotationOffsetMapping[rotation[1]];
  return generateTower(
    {
      position: [x + xOff, y + HEIGHT / 2, z + zOff],
      rotation,
      lengths: lengths.map(l => l + 0.1),
      height: height - 1
    },
    towerList
  );
};

export default () => {
  console.log(rotationOffsetMapping);
  const tower0 = generateTower({
    lengths: [1, 1, 1, 1],
    position: [-2, 0, -2],
    height: 4
  });
  const tower1 = generateTower({
    lengths: [1.2, 1, 1],
    position: [0, 0, -1.8],
    height: 4
  });
  const tower2 = generateTower({
    lengths: [1.2, 1, 0.5],
    position: [2, 0, -1.8],
    height: 4
  });
  const tower3 = generateTower({
    lengths: [1.2, 1, 1, 0.4],
    position: [-2, 0, 0],
    height: 4
  });
  const tower4 = generateTower({
    lengths: [1.2, 1, 0.5, 0.4],
    position: [0, 0, 0],
    height: 4
  });
  const tower5 = generateTower({
    lengths: [1.2, 1, 0.7, 0.5, 0.25],
    position: [2, 0, 0],
    height: 4
  });
  const tower6 = generateTower({
    lengths: [0.5, 1, 1, 0.4],
    position: [-1.7, 0, 1.6],
    rotation: [0, Math.PI / 2, 0],
    height: 4
  });
  const tower7 = generateTower({
    lengths: [0.5, 0.5, 1, 1, 0.4],
    position: [0.3, 0, 1.3],
    rotation: [0, Math.PI, 0],
    height: 4
  });
  const tower8 = generateTower({
    lengths: [0.4, 0.3, 0.6, 1, 1, 0.4, 0.3],
    position: [2.1, 0, 1],
    rotation: [0, Math.PI, 0],
    height: 4
  });
  console.log(tower6);
  return (
    <>
      {tower0}
      {tower1}
      {tower2}
      {tower3}
      {tower4}
      {tower5}
      {tower6}
      {tower7}
      {tower8}
    </>
  );
};
