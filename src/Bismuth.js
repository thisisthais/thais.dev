import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';

const aBlockFaces = [
  [7, 0, 3], // top ring
  [0, 7, 4], // top ring
  [15, 11, 8], // bottom ring
  [8, 12, 15], // bottom ring
  [15, 4, 7], // inner
  [15, 12, 4], // inner
  [11, 3, 0], // outer faces
  [11, 0, 8] // outer faces
];
const aBlockVertexIndices = [0, 3, 4, 7, 8, 11, 12, 13];

const bBlockFaces = [
  [0, 4, 1], // top ring
  [1, 4, 5], // top ring
  [8, 9, 12], // bottom ring
  [9, 13, 12], // bottom ring
  [9, 0, 1], // outer
  [9, 8, 0], // outer
  [4, 13, 5], // inner
  [4, 12, 13] // inner
];
const bBlockVertexIndices = [0, 1, 4, 5, 8, 9, 12, 13];
const cBlockFaces = [
  [1, 5, 2], // top ring
  [2, 5, 6], // top ring
  [9, 10, 13], // bottom ring
  [10, 14, 13], // bottom ring
  [9, 2, 10], // outer
  [9, 1, 2], // outer
  [13, 6, 5], // inner
  [13, 14, 6] // inner
];
const cBlockVertexIndices = [1, 2, 5, 6, 9, 10, 13, 14];

const dBlockFaces = [
  [2, 6, 3], // top ring
  [6, 7, 3], // top ring
  [10, 11, 14], // bottom ring
  [14, 11, 15], // bottom ring
  [11, 2, 3], // outer
  [11, 10, 2], // outer
  [6, 15, 7], // inner
  [6, 14, 15] // inner
];
const dBlockVertexIndexes = [2, 3, 6, 7, 10, 11, 14, 15];

const BoxRing = ({ scale, position }) => {
  const vertices = [
    // top ring
    [-2, 0.5, 2], //0
    [-2, 0.5, -2], //1
    [2, 0.5, -2], //2,
    [2, 0.5, 2], //3,
    [-1, 0.5, 1], //4
    [-1, 0.5, -1], //5
    [1, 0.5, -1], //6
    [1, 0.5, 1], //7
    // bottom ring
    [-2, -0.5, 2], //8
    [-2, -0.5, -2], //9
    [2, -0.5, -2], //10,
    [2, -0.5, 2], //11,
    [-1, -0.5, 1], //12
    [-1, -0.5, -1], //13
    [1, -0.5, -1], //14
    [1, -0.5, 1] //15
  ];
  var faces = [...aBlockFaces, ...bBlockFaces, ...cBlockFaces, ...dBlockFaces];
  faces = faces.map(f => new THREE.Face3(...f));

  faces.forEach((face, ndx) => {
    face.vertexColors = [
      new THREE.Color().setHSL(ndx / 12, 1, 0.5),
      new THREE.Color().setHSL(ndx / 12 + 0.1, 1, 0.5),
      new THREE.Color().setHSL(ndx / 12 + 0.2, 1, 0.5)
    ];
  });

  return (
    <a.mesh scale={scale || [1, 1, 1]} position={position || [0, 0, 0]}>
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
      {/* <BoxRing scale={[2.5, 1, 2.5]} position={[0, 3, 0]} />
      <BoxRing scale={[2, 1, 2]} position={[0, 2, 0]} />
      <BoxRing scale={[1.5, 1, 1.5]} position={[0, 1, 0]} /> */}
      <BoxRing />
    </>
  );
};
