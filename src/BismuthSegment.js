import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';
import { hsluvToHex } from 'hsluv';

const HEIGHT = 0.2;
const WIDTH = 0.2;

// initial point is top right when facing camera
const calcInitialVertices = ([startX, startY, startZ]) => [
  [startX, startY, startZ],
  [startX, startY - HEIGHT, startZ],
  [startX - WIDTH, startY - HEIGHT, startZ],
  [startX - WIDTH, startY, startZ]
];

const pushBack = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x, v1y, v1z - length],
  [v2x, v2y, v2z - length],
  [v3x, v3y, v3z - length],
  [v4x, v4y, v4z - length]
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

const pushRight = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x + length, v1y, v1z],
  [v2x + length, v2y, v2z],
  [v3x + length, v3y, v3z],
  [v4x + length, v4y, v4z]
];

const turn90Q2 = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x - WIDTH, v1y, v1z + WIDTH],
  [v2x - WIDTH, v2y, v2z + WIDTH],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
];

const pushFoward = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x, v1y, v1z + length],
  [v2x, v2y, v2z + length],
  [v3x, v3y, v3z + length],
  [v4x, v4y, v4z + length]
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

const pushLeft = (
  [[v1x, v1y, v1z], [v2x, v2y, v2z], [v3x, v3y, v3z], [v4x, v4y, v4z]],
  length
) => [
  [v1x - length, v1y, v1z],
  [v2x - length, v2y, v2z],
  [v3x - length, v3y, v3z],
  [v4x - length, v4y, v4z]
];

const turn90Q0 = ([
  [v1x, v1y, v1z],
  [v2x, v2y, v2z],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
]) => [
  [v1x + WIDTH, v1y, v1z - WIDTH],
  [v2x + WIDTH, v2y, v2z - WIDTH],
  [v3x, v3y, v3z],
  [v4x, v4y, v4z]
];

const triangulateQ0toQ1 = (offset = 0) =>
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
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const triangulateQ1toQ2 = (offset = 8) =>
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
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const triangulateQ2toQ3 = (offset = 16) =>
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
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const triangulateQ3toQ4 = (offset = 24) =>
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
  ].map(([v1, v2, v3]) => [v1 + offset, v2 + offset, v3 + offset]);

const orderedVerticesFunctions = [
  [turn90Q0, pushBack],
  [turn90Q1, pushRight],
  [turn90Q2, pushFoward],
  [turn90Q3, pushLeft]
];
const orderedFacesFunctions = [
  triangulateQ0toQ1,
  triangulateQ1toQ2,
  triangulateQ2toQ3,
  triangulateQ3toQ4
];
const calcVerticesAndFaces = (listOfLengths, startingPoint = [0, 0, 0]) => {
  const vertices = [];
  const faces = [];
  for (let i = 0; i < listOfLengths.length; i++) {
    const functionsIndex = i % 4;
    // calculate the vertices, initial case is special since we have
    // to calculate the first face from initial point
    if (i === 0) {
      const initialFace = calcInitialVertices(startingPoint);
      vertices.push(...initialFace, ...pushBack(initialFace, listOfLengths[i]));
    } else {
      const [turnFunction, pushFunction] = orderedVerticesFunctions[
        functionsIndex
      ];
      const lastFaceVertices = vertices.slice(-4, vertices.length);
      const turnFaceVertices = turnFunction(lastFaceVertices);
      const pushFaceVertices = pushFunction(turnFaceVertices, listOfLengths[i]);
      vertices.push(...turnFaceVertices, ...pushFaceVertices);
    }

    // fake triangulate faces from vertices
    // fake because there's no math, i hardcoded the vertices based on patterns
    const triangulateFunction = orderedFacesFunctions[functionsIndex];
    // i*8 because each new block on the segment adds 8 vertices, so we need to offset
    faces.push(...triangulateFunction(i * 8));
  }
  return [vertices, faces.map(f => new THREE.Face3(...f))];
};

export default ({
  lengths = [1, 1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const [vertices, faces] = calcVerticesAndFaces(lengths);

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
