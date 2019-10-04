import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';

const aBlockVertices = [
  [-1, 0.1, 1], //0
  [-0.8, 0.1, 1], //1
  [-1, -0.1, 1], //2
  [-0.8, -0.1, 1], //3
  //
  [-1, 0.1, -1], //4
  [-0.8, 0.1, -1], //5
  [-1, -0.1, -1], //6
  [-0.8, -0.1, -1] //7
];
const bBlockVertices = [
  [-1, 0.1, -0.8], //8
  [1, 0.1, -0.8], //9
  [-1, -0.1, -0.8], //10
  [1, -0.1, -0.8], //11
  //
  [-1, 0.1, -1], //12
  [1, 0.1, -1], //13
  [-1, -0.1, -1], //14
  [1, -0.1, -1] //15
];
const cBlockVertices = [
  [0.8, 0.1, 1], //16
  [1, 0.1, 1], //17
  [0.8, -0.1, 1], //18
  [1, -0.1, 1], //19
  //
  [0.8, 0.1, -1], //20
  [1, 0.1, -1], //21
  [0.8, -0.1, -1], //22
  [1, -0.1, -1] //23
];
const dBlockVertices = [
  [-1, 0.1, 1], //24
  [1, 0.1, 1], //25
  [-1, -0.1, 1], //26
  [1, -0.1, 1], //27
  //
  [-1, 0.1, 0.8], //28
  [1, 0.1, 0.8], //29
  [-1, -0.1, 0.8], //30
  [1, -0.1, 0.8] //31
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

const BoxRing = () => {
  const vertices = [
    ...aBlockVertices,
    ...bBlockVertices,
    ...cBlockVertices,
    ...dBlockVertices
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
    <a.mesh>
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
      <BoxRing key="boobi" />
    </>
  );
};
