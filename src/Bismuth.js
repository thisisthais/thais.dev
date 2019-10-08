import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';
import { a } from 'react-spring/three';
import * as THREE from 'three';
import { hsluvToHex } from 'hsluv';

const OUTER_LENGTH = 1;
const INNER_LENGTH = 1;
const HEIGHT = 1;
const WIDTH = 1;

const aBlockVertices = (stretch = 0) => [
  [-OUTER_LENGTH - stretch, HEIGHT, OUTER_LENGTH + stretch], //0
  [-INNER_LENGTH - stretch, HEIGHT, OUTER_LENGTH + stretch], //1
  [-OUTER_LENGTH - stretch, -HEIGHT, OUTER_LENGTH + stretch], //2
  [-INNER_LENGTH - stretch, -HEIGHT, OUTER_LENGTH + stretch], //3
  //
  [-OUTER_LENGTH - stretch, HEIGHT, -OUTER_LENGTH - stretch], //4
  [-INNER_LENGTH - stretch, HEIGHT, -OUTER_LENGTH - stretch], //5
  [-OUTER_LENGTH - stretch, -HEIGHT, -OUTER_LENGTH - stretch], //6
  [-INNER_LENGTH - stretch, -HEIGHT, -OUTER_LENGTH - stretch] //7
];
const bBlockVertices = (stretch = 0) => [
  [-OUTER_LENGTH - stretch, HEIGHT, -INNER_LENGTH - stretch], //8
  [OUTER_LENGTH + stretch, HEIGHT, -INNER_LENGTH - stretch], //9
  [-OUTER_LENGTH - stretch, -HEIGHT, -INNER_LENGTH - stretch], //10
  [OUTER_LENGTH + stretch, -HEIGHT, -INNER_LENGTH - stretch], //11
  //
  [-OUTER_LENGTH - stretch, HEIGHT, -OUTER_LENGTH - stretch], //12
  [OUTER_LENGTH + stretch, HEIGHT, -OUTER_LENGTH - stretch], //13
  [-OUTER_LENGTH - stretch, -HEIGHT, -OUTER_LENGTH - stretch], //14
  [OUTER_LENGTH + stretch, -HEIGHT, -OUTER_LENGTH - stretch] //15
];
const cBlockVertices = (stretch = 0) => [
  [INNER_LENGTH + stretch, HEIGHT, OUTER_LENGTH + stretch], //16
  [OUTER_LENGTH + stretch, HEIGHT, OUTER_LENGTH + stretch], //17
  [INNER_LENGTH + stretch, -HEIGHT, OUTER_LENGTH + stretch], //18
  [OUTER_LENGTH + stretch, -HEIGHT, OUTER_LENGTH + stretch], //19
  //
  [INNER_LENGTH + stretch, HEIGHT, -OUTER_LENGTH - stretch], //20
  [OUTER_LENGTH + stretch, HEIGHT, -OUTER_LENGTH - stretch], //21
  [INNER_LENGTH + stretch, -HEIGHT, -OUTER_LENGTH - stretch], //22
  [OUTER_LENGTH + stretch, -HEIGHT, -OUTER_LENGTH - stretch] //23
];
const dBlockVertices = (stretch = 0) => [
  [-OUTER_LENGTH - stretch, HEIGHT, OUTER_LENGTH + stretch], //24
  [OUTER_LENGTH + stretch, HEIGHT, OUTER_LENGTH + stretch], //25
  [-OUTER_LENGTH - stretch, -HEIGHT, OUTER_LENGTH + stretch], //26
  [OUTER_LENGTH + stretch, -HEIGHT, OUTER_LENGTH + stretch], //27
  //
  [-OUTER_LENGTH - stretch, HEIGHT, INNER_LENGTH + stretch], //28
  [OUTER_LENGTH + stretch, HEIGHT, INNER_LENGTH + stretch], //29
  [-OUTER_LENGTH - stretch, -HEIGHT, INNER_LENGTH + stretch], //30
  [OUTER_LENGTH + stretch, -HEIGHT, INNER_LENGTH + stretch] //31
];

const aBlockFaces = [
  [0, 2, 3],
  [0, 3, 1],
  [0, 5, 4],
  [0, 1, 5],
  [7, 1, 3],
  [7, 5, 1],
  [4, 5, 7],
  [4, 7, 6],
  [2, 7, 3],
  [2, 6, 7],
  [6, 2, 0],
  [6, 0, 4]
];
const bBlockFaces = [
  [10, 9, 8],
  [10, 11, 9],
  [8, 9, 13],
  [8, 13, 12],
  [11, 15, 13],
  [11, 13, 9],
  [14, 12, 13],
  [14, 13, 15],
  [10, 15, 11],
  [10, 14, 15],
  [10, 8, 12],
  [10, 12, 14]
];
const cBlockFaces = [
  [17, 16, 18],
  [17, 18, 19],
  [17, 20, 16],
  [17, 21, 20],
  [19, 21, 17],
  [19, 23, 21],
  [21, 22, 20],
  [21, 23, 22],
  [20, 18, 16],
  [20, 22, 18],
  [22, 23, 19],
  [22, 19, 18]
];
const dBlockFaces = [
  [26, 25, 24],
  [26, 27, 25],
  [25, 28, 24],
  [25, 29, 28],
  [28, 26, 24],
  [28, 30, 26],
  [28, 29, 31],
  [28, 31, 30],
  [30, 27, 26],
  [30, 31, 27],
  [25, 31, 29],
  [25, 27, 31]
];

// initial point is top right when facing camera
const calcClockwiseFace = ([startX, startY, startZ]) => [
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

const triangulateRectPrism = ([v0, v1, v2, v3, v4, v5, v6, v7]) => [
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

const calcVertices = (listOfLengths, startingPoint = [1, 1, 1]) => {
  // calc starting face
  const vertices = calcClockwiseFace(startingPoint);
  const backVertices = pushBack(vertices.slice(0, 4));

  return [...vertices, ...backVertices];
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
  const vertices = [...calcVertices([1])];
  console.log(vertices);
  const faces = triangulateRectPrism(vertices).map(f => new THREE.Face3(...f));

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
