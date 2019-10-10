import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';
import { default as Segment } from './BismuthSegment';

// to delete
const OUTER_LENGTH = 2;

// to keep
const HEIGHT = 0.1;
const LENGTH_DELTA = 0.2;
const MIN_BASE_HEIGHT = 2;
const MAX_BASE_HEIGHT = 7;

const randIntInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randFloatInRange = (min, max) => Math.random() * (max - min) + min;
const randomlyNegative = num => (Math.random() > 0.5 ? num : -num);

const Base = ({ size = 1, position = [0, 0, 0] }) => {
  const boxGeo = new THREE.BoxGeometry(size, HEIGHT, size);
  boxGeo.faces.forEach((face, idx) => {
    face.vertexColors = [
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
  0: { xOff: -LENGTH_DELTA / 2, zOff: LENGTH_DELTA / 2 },
  [Math.PI / 2]: { xOff: LENGTH_DELTA / 2, zOff: LENGTH_DELTA / 2 },
  [(3 / 2) * Math.PI]: { xOff: -LENGTH_DELTA / 2, zOff: -LENGTH_DELTA / 2 },
  [Math.PI]: { xOff: LENGTH_DELTA / 2, zOff: -LENGTH_DELTA / 2 }
};

const generateTower = (
  {
    height,
    lengths = [1, 1, 1, 1],
    position = [0, 0, 0, 0],
    rotation = [0, 0, 0]
  },
  towerList = []
) => {
  if (height <= 1) {
    console.log('lastTowerHeight', position[1]);
    return [
      ...towerList,
      <Segment
        position={position}
        lengths={lengths}
        rotation={rotation}
        key={`segment${towerList.length + 1}`}
      />
    ];
  }

  towerList.push(
    <Segment
      position={position}
      lengths={lengths}
      rotation={rotation}
      key={`segment${towerList.length + 1}`}
    />
  );
  const [x, y, z] = position;
  const { xOff, zOff } = rotationOffsetMapping[rotation[1]];
  return generateTower(
    {
      position: [x + xOff, y + HEIGHT, z + zOff],
      rotation,
      lengths: lengths.map(l => l + LENGTH_DELTA),
      height: height - 1
    },
    towerList
  );
};

export default () => {
  // const tower0 = generateTower({
  //   lengths: [1, 1, 1, 1],
  //   position: [-2, 0, -2.2],
  //   height: 4
  // });
  // const tower1 = generateTower({
  //   lengths: [1.2, 1, 1],
  //   position: [0, 0, -2],
  //   height: 4
  // });
  // const tower2 = generateTower({
  //   lengths: [1.2, 1, 0.5],
  //   position: [2, 0, -2],
  //   height: 4
  // });
  // const tower3 = generateTower({
  //   lengths: [1.2, 1, 1, 0.4],
  //   position: [-2, 0, 0],
  //   height: 4
  // });
  // const tower4 = generateTower({
  //   lengths: [1.2, 1, 0.5, 0.4],
  //   position: [0, 0, 0],
  //   height: 4
  // });
  // const tower5 = generateTower({
  //   lengths: [1.2, 1, 0.7, 0.5, 0.25],
  //   position: [2, 0, 0],
  //   height: 4
  // });
  // const tower6 = generateTower({
  //   lengths: [0.5, 1, 1, 0.4],
  //   position: [-1.7, 0, 1.8],
  //   rotation: [0, Math.PI / 2, 0],
  //   height: 4
  // });
  // const tower7 = generateTower({
  //   lengths: [0.5, 0.5, 1, 1, 0.4],
  //   position: [0.3, 0, 1.5],
  //   rotation: [0, Math.PI, 0],
  //   height: 4
  // });
  // const tower8 = generateTower({
  //   lengths: [0.4, 0.3, 0.6, 1, 1, 0.4, 0.3],
  //   position: [2.1, 0, 1.2],
  //   rotation: [0, Math.PI, 0],
  //   height: 4
  // });
  const randomBaseTowerHeight = randIntInRange(
    MIN_BASE_HEIGHT,
    MAX_BASE_HEIGHT
  );
  console.log('randBaseHeight', randomBaseTowerHeight);

  const baseTower = generateTower({
    height: randomBaseTowerHeight,
    position: [-0.4, 2 * HEIGHT, 0.4]
  });
  const offsetFromOrigin = LENGTH_DELTA * randomBaseTowerHeight;

  // 2*HEIGHT makes some overlap, 3*HEIGHT makes it exactly on top
  var currentHeight = 2 * HEIGHT + randomBaseTowerHeight * HEIGHT;
  console.log('calculated height', currentHeight);

  // again, where does the 1.5 come from?? no clue
  const randomTowerStartPos = {
    x1: randomlyNegative(
      randFloatInRange(offsetFromOrigin / 2, offsetFromOrigin)
    ),
    y1: currentHeight,
    z1: randomlyNegative(
      randFloatInRange(offsetFromOrigin / 2, offsetFromOrigin)
    )
  };
  const { x1, y1, z1 } = randomTowerStartPos;
  const nextTower = generateTower({
    lengths: [0.5, 0.5, 0.5],
    position: [x1, y1, z1],
    height: 4
  });

  return (
    <>
      <a.mesh position={[-4, 0, -6]}>
        {/* {tower0}
        {tower1}
        {tower2}
        {tower3}
        {tower4}
        {tower5}
        {tower6}
        {tower7}
        {tower8} */}
      </a.mesh>
      {nextTower}
      {baseTower}
      <Base />
    </>
  );
};
