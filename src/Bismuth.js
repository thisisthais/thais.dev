import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';
import { a } from 'react-spring/three';
import * as THREE from 'three';
import { hsluvToHex } from 'hsluv';

const OUTER_LENGTH = 2;
const INNER_LENGTH = 1;
const HEIGHT = 1;
const WIDTH = 1;

// initial point is top right when facing camera
const calcInitialVertices = ([startX, startY, startZ]) => [
  [startX, startY, startZ],
  [startX, startY - HEIGHT, startZ],
  [startX - WIDTH, startY - HEIGHT, startZ],
  [startX - WIDTH, startY, startZ]
];

const pushBack = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x, v1y, v1z - OUTER_LENGTH],
  [v2x, v2y, v2z - OUTER_LENGTH],
  [v3x, v3y, v3z - OUTER_LENGTH],
  [v4x, v4y, v4z - OUTER_LENGTH]
];

const turn90Q1 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x + WIDTH, v3y, v3z + WIDTH],
  [v4x + WIDTH, v4y, v4z + WIDTH]
];

const pushRight = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x + OUTER_LENGTH, v1y, v1z],
  [v2x + OUTER_LENGTH, v2y, v2z],
  [v3x + OUTER_LENGTH, v3y, v3z],
  [v4x + OUTER_LENGTH, v4y, v4z]
];

const turn90Q2 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x - WIDTH, v1y, v1z + WIDTH],
  [v2x - WIDTH, v2y, v2z + WIDTH],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
];

const pushFoward = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x, v1y, v1z + OUTER_LENGTH],
  [v2x, v2y, v2z + OUTER_LENGTH],
  [v3x, v3y, v3z + OUTER_LENGTH],
  [v4x, v4y, v4z + OUTER_LENGTH]
];

const turn90Q3 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x - WIDTH, v3y, v3z - WIDTH],
  [v4x - WIDTH, v4y, v4z - WIDTH]
];

const pushLeft = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x - OUTER_LENGTH, v1y, v1z],
  [v2x - OUTER_LENGTH, v2y, v2z],
  [v3x - OUTER_LENGTH, v3y, v3z],
  [v4x - OUTER_LENGTH, v4y, v4z]
];

const triangulateQ0toQ1 = () => [
  // front
  [0, 2, 1],
  [0, 3, 2],
  // back
  [7, 5, 6],
  [7, 4, 5],
  // right
  [1, 4, 0],
  [1, 5, 4],
  // left
  [3, 7, 6],
  [3, 6, 2],
  // top
  [4, 7, 3],
  [4, 3, 0],
  // bottom
  [6, 1, 2],
  [6, 5, 1]
];

const triangulateQ1toQ2 = () =>
  [
    // front
    [0, 1, 2],
    [0, 2, 3],
    // back
    [7, 6, 5],
    [7, 5, 4],
    // right
    [1, 0, 4],
    [1, 4, 5],
    // left
    [3, 6, 7],
    [3, 2, 6],
    // top
    [4, 3, 7],
    [4, 0, 3],
    // bottom
    [6, 2, 1],
    [6, 1, 5]
  ].map(([v1, v2, v3]) => [v1 + 8, v2 + 8, v3 + 8]);

const triangulateQ2toQ3 = () =>
  [
    // front
    [0, 2, 1],
    [0, 3, 2],
    // back
    [7, 5, 6],
    [7, 4, 5],
    // right
    [1, 4, 0],
    [1, 5, 4],
    // left
    [3, 7, 6],
    [3, 6, 2],
    // top
    [4, 7, 3],
    [4, 3, 0],
    // bottom
    [6, 1, 2],
    [6, 5, 1]
  ].map(([v1, v2, v3]) => [v1 + 16, v2 + 16, v3 + 16]);

const triangulateQ3toQ4 = () =>
  [
    // front
    [0, 1, 2],
    [0, 2, 3],
    // back
    [7, 6, 5],
    [7, 5, 4],
    // right
    [1, 0, 4],
    [1, 4, 5],
    // left
    [3, 6, 7],
    [3, 2, 6],
    // top
    [4, 3, 7],
    [4, 0, 3],
    // bottom
    [6, 2, 1],
    [6, 1, 5]
  ].map(([v1, v2, v3]) => [v1 + 24, v2 + 24, v3 + 24]);

const calcVertices = (listOfLengths, startingPoint = [0, 0, 0]) => {
  // calc starting face
  const Q0FrontVertices = calcInitialVertices(startingPoint);
  const Q1FrontVertices = pushBack(Q0FrontVertices.slice(0, 4));
  const Q1SideVertices = turn90Q1(Q1FrontVertices);
  const Q2SideVertices = pushRight(Q1SideVertices);
  const Q2FrontVertices = turn90Q2(Q2SideVertices);
  const Q3FrontVertices = pushFoward(Q2FrontVertices);
  const Q3SideVertices = turn90Q3(Q3FrontVertices);
  const Q0SideVertuces = pushLeft(Q3SideVertices);

  return [
    [...Q0FrontVertices, ...Q1FrontVertices],
    [...Q1SideVertices, ...Q2SideVertices],
    [...Q2FrontVertices, ...Q3FrontVertices],
    [...Q3SideVertices, ...Q0SideVertuces]
  ];
};

const interpolateHue = idx => (360 * (idx + (1 % 12))) / 12;

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

const Layer = ({
  stretch = 0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  curl = 0
}) => {
  const [Q0toQ1, Q1toQ2, Q2toQ3, Q3toQ0] = calcVertices([1]);
  const Q0toQ1faces = triangulateQ0toQ1(Q0toQ1);
  const Q1toQ2faces = triangulateQ1toQ2(Q1toQ2);
  const Q2toQ3faces = triangulateQ2toQ3(Q2toQ3);
  const Q3toQ0faces = triangulateQ3toQ4(Q3toQ0);
  console.log(Q3toQ0);

  const faces = [
    ...Q0toQ1faces,
    ...Q1toQ2faces,
    ...Q2toQ3faces,
    ...Q3toQ0faces
  ].map(f => new THREE.Face3(...f));

  faces.forEach((face, idx) => {
    face.vertexColors = [
      // new THREE.Color(hsluvToHex([interpolateHue(idx + 4), 100, 60])),
      // new THREE.Color(hsluvToHex([interpolateHue(idx + 7), 100, 70])),
      // new THREE.Color(hsluvToHex([interpolateHue(idx), 100, 50]))
      new THREE.Color().setHSL(idx / 12, 0.5, 0.5),
      new THREE.Color().setHSL(idx / 12 + position[1] + 0.2, 0.5, 0.5),
      new THREE.Color().setHSL(idx / 12 + position[1] + 0.4, 0.5, 0.5)
    ];
  });

  const vertices = [...Q0toQ1, ...Q1toQ2, ...Q2toQ3, ...Q3toQ0];
  console.log(vertices, faces);
  return (
    <a.mesh position={position} rotation={rotation}>
      <geometry
        attach="geometry"
        vertices={vertices.map(v => new THREE.Vector3(...v))}
        faces={faces}
      />
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
      <Layer />
      {/* <Base /> */}
    </>
  );
};
