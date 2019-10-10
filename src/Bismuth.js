import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';
import { default as Segment } from './BismuthSegment';

// to keep
const HEIGHT = 0.1;
const LENGTH_DELTA = 0.2;
const MIN_BASE_HEIGHT = 2;
const MAX_BASE_HEIGHT = 7;
const DEFAULT_LENGTHS = [1, 1, 1, 1];
const ROTATIONS = [0, Math.PI / 2, (3 / 2) * Math.PI, Math.PI];
const QUAD_MULTIPLIERS = [[1, 1], [-1, 1], [1, -1], [-1, -1]];

const randIntInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randFloatInRange = (min, max) => Math.random() * (max - min) + min;
const randomlyNegative = num => (Math.random() > 0.5 ? num : -num);
const randRotation = () => ROTATIONS[randIntInRange(0, 3)];

const genRandLengths = (lastLengths, height) => {
  const maxLastLength = Math.max(...lastLengths);

  var numTurns;
  if (height < 10) {
    numTurns = randIntInRange(3, 5);
  } else if (height < 15) {
    numTurns = randIntInRange(3, 6);
  } else if (height < 20) {
    numTurns = randIntInRange(4, 6);
  } else {
    numTurns = 2;
  }

  const newLengths = [];
  for (let i = 0; i < numTurns; i++) {
    const randOffset = randFloatInRange(-0.1, 0.1);
    newLengths.push(maxLastLength / 4 + randOffset);
  }

  return newLengths;
};

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

// don't ask me where these numbers came from
const rotationOffsetMapping = {
  0: { xOff: -LENGTH_DELTA / 2, zOff: LENGTH_DELTA / 2 },
  [Math.PI / 2]: { xOff: LENGTH_DELTA / 2, zOff: LENGTH_DELTA / 2 },
  [(3 / 2) * Math.PI]: { xOff: -LENGTH_DELTA / 2, zOff: -LENGTH_DELTA / 2 },
  [Math.PI]: { xOff: LENGTH_DELTA / 2, zOff: -LENGTH_DELTA / 2 }
};

var currentHeight = 0;
var currentLengths = [];
const generateTower = (
  {
    height,
    lengths = DEFAULT_LENGTHS,
    position = [0, 0, 0, 0],
    rotation = [0, 0, 0]
  },
  towerList = []
) => {
  if (height <= 1) {
    currentHeight = position[1];
    currentLengths = lengths;
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
  var currentLayersHeight = 0;
  const randomBaseTowerHeight = randIntInRange(
    MIN_BASE_HEIGHT,
    MAX_BASE_HEIGHT
  );
  currentLayersHeight = randomBaseTowerHeight;

  const baseTower = generateTower({
    height: randomBaseTowerHeight,
    position: [-0.5, HEIGHT, 0.5 - HEIGHT / 2]
  });
  const numTowerLayers = randIntInRange(4, 8);
  const allLayerSegments = [];

  for (var i = 0; i < numTowerLayers; i++) {
    console.log(currentLayersHeight);
    const offsetFromOrigin =
      1.1 * LENGTH_DELTA * Math.min(currentLayersHeight, 5);

    // generate towers for layers
    const numTowersInLayer = randIntInRange(2, 4);
    const towersInLayer = [];
    const randomTowerStartPos = {
      x1: randomlyNegative(
        randFloatInRange(offsetFromOrigin / 3, offsetFromOrigin / 1.5)
      ),
      y1: currentHeight,
      z1: randomlyNegative(
        randFloatInRange(offsetFromOrigin / 3, offsetFromOrigin / 1.5)
      )
    };

    // keept track of where each tower is placed and don't reuse quadrants
    var availableLayerQuadrants = [...QUAD_MULTIPLIERS];

    const lastLayerLengths = currentLengths;
    var shortestTowerHeight = 10;
    for (let i = 0; i < numTowersInLayer; i++) {
      const [[xMult, zMult]] = availableLayerQuadrants.splice(
        randIntInRange(0, availableLayerQuadrants.length - 1),
        1
      );
      const { x1, y1, z1 } = randomTowerStartPos;

      const randLengths = genRandLengths(lastLayerLengths, currentLayersHeight);
      const randPosOffset = randFloatInRange(-0.1, 0.1);
      const randTowerHeight = randIntInRange(3, 7);
      shortestTowerHeight = Math.min(shortestTowerHeight, randTowerHeight);

      const nextTower = generateTower({
        lengths: randLengths,
        position: [x1 * xMult + randPosOffset, y1, z1 * zMult + randPosOffset],
        rotation: [0, randRotation(), 0],
        height: randTowerHeight
      });
      towersInLayer.push(nextTower);
    }
    availableLayerQuadrants = [...QUAD_MULTIPLIERS];
    currentLayersHeight += shortestTowerHeight;
    allLayerSegments.push(...towersInLayer);
  }

  return (
    <>
      <a.mesh position={[-2, 0, -4]}>
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
      {[...allLayerSegments]}
      {baseTower}
      <Base />
    </>
  );
};
