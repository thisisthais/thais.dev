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

  const numTurns = randIntInRange(2, 7);
  const newLengths = [];
  for (let i = 0; i < numTurns; i++) {
    const randOffset = randFloatInRange(-0.1, 0.1);
    // make this strictly smaller lengths after 4?
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
    return towerList;
  }

  towerList.push(
    <Segment
      position={position}
      lengths={lengths}
      rotation={rotation}
      key={`segment${towerList.length + Math.random()}`}
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

const generateLayers = (
  { numLayers = 1, currentHeight = 0, lastLayerLengths = [] },
  allSegments = []
) => {
  if (numLayers < 1) {
    return allSegments;
  }

  let randomBaseTowerHeight;
  if (allSegments.length === 0) {
    randomBaseTowerHeight = randIntInRange(10, 20);
    const baseTower = generateTower({
      height: randomBaseTowerHeight,
      position: [-0.5, HEIGHT, 0.5 - HEIGHT / 2]
    });
    allSegments.push(...baseTower);
    currentHeight += randomBaseTowerHeight;
  }

  const numTowers = randIntInRange(1, 4);
  const startingLayerHeight = ((randomBaseTowerHeight * 9) / 10) * HEIGHT;
  const initialBaseLength = 1 + randomBaseTowerHeight * LENGTH_DELTA;

  // keept track of where each tower is placed and don't reuse quadrants
  var availableLayerQuadrants = [...QUAD_MULTIPLIERS];

  const towersInLayer = [];
  let shortestTowerHeight = 100;
  for (let i = 0; i < numTowers; i++) {
    // figuring out a random position that makes sense
    const offsetFromOrigin = (currentHeight * HEIGHT * numLayers) / 5;
    const [[xMult, zMult]] = availableLayerQuadrants.splice(
      randIntInRange(0, availableLayerQuadrants.length - 1),
      1
    );
    const randPosOffset = randFloatInRange(-0.1, 0.1);
    const randomTowerStartPos = {
      x:
        xMult * randFloatInRange(offsetFromOrigin / 3, offsetFromOrigin) +
        randPosOffset,
      y: (currentHeight * HEIGHT) / 2,
      z:
        zMult * randFloatInRange(offsetFromOrigin / 3, offsetFromOrigin) +
        randPosOffset
    };
    const { x, y, z } = randomTowerStartPos;

    // figure out lengths
    if (lastLayerLengths.length === 0) {
      lastLayerLengths = [
        initialBaseLength,
        initialBaseLength,
        initialBaseLength,
        initialBaseLength
      ];
    }
    const randLengths = genRandLengths(lastLayerLengths, currentHeight);

    const randTowerHeight = randIntInRange(7, 30 - currentHeight);
    if (randTowerHeight <= shortestTowerHeight) {
      shortestTowerHeight = randTowerHeight;
      // also update lengths
      lastLayerLengths = randLengths;
    }

    const nextTower = generateTower({
      lengths: randLengths,
      position: [x, Math.min(y, 3), z],
      rotation: [0, randRotation(), 0],
      height: randTowerHeight
    });
    towersInLayer.push(...nextTower);
  }

  const nextLayerHeight = currentHeight + shortestTowerHeight;
  availableLayerQuadrants = [...QUAD_MULTIPLIERS];
  return generateLayers(
    {
      numLayers: numLayers - 1,
      currentHeight: nextLayerHeight,
      lastLayerLengths
    },
    [...allSegments, ...towersInLayer]
  );
};

export default () => {
  const baseTower = generateLayers({ numLayers: 5 });

  return (
    <>
      {baseTower}
      <Base />
    </>
  );
};
