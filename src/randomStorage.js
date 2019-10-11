const tower0 = generateTower({
  lengths: [1, 1, 1, 1],
  position: [-2, 0, -2.2],
  height: 4
});
const tower1 = generateTower({
  lengths: [1.2, 1, 1],
  position: [0, 0, -2],
  height: 4
});
const tower2 = generateTower({
  lengths: [1.2, 1, 0.5],
  position: [2, 0, -2],
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
  position: [-1.7, 0, 1.8],
  rotation: [0, Math.PI / 2, 0],
  height: 4
});
const tower7 = generateTower({
  lengths: [0.5, 0.5, 1, 1, 0.4],
  position: [0.3, 0, 1.5],
  rotation: [0, Math.PI, 0],
  height: 4
});
const tower8 = generateTower({
  lengths: [0.4, 0.3, 0.6, 1, 1, 0.4, 0.3],
  position: [2.1, 0, 1.2],
  rotation: [0, Math.PI, 0],
  height: 4
});

////////

var currentLayersHeight = 0;
const randomBaseTowerHeight = randIntInRange(MIN_BASE_HEIGHT, MAX_BASE_HEIGHT);
currentLayersHeight = randomBaseTowerHeight;

const numTowerLayers = randIntInRange(4, 8);
const allLayerSegments = [];

for (var i = 0; i < numTowerLayers; i++) {
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
