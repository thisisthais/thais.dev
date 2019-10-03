import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';

export default () => {
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
  var faces = [
    // top ring
    [0, 4, 1],
    [1, 4, 5],
    [1, 5, 2],
    [2, 5, 6],
    [2, 6, 3],
    [6, 7, 3],
    [7, 0, 3],
    [0, 7, 4],
    // bottom ring
    [8, 9, 12],
    [9, 13, 12],
    [9, 10, 13],
    [10, 14, 13],
    [10, 11, 14],
    [14, 11, 15],
    [15, 11, 8],
    [8, 12, 15],
    // hole faces
    [4, 13, 5],
    [4, 12, 13],
    [13, 6, 5],
    [13, 14, 6],
    [15, 4, 7],
    [15, 12, 4],
    [6, 14, 15],
    [6, 15, 7],
    // outer faces
    [11, 3, 0],
    [11, 0, 8],
    [9, 0, 1],
    [9, 8, 0],
    [9, 2, 10],
    [9, 1, 2],
    [11, 2, 3],
    [11, 10, 2]
  ];
  faces = faces.map(f => new THREE.Face3(...f));

  faces.forEach((face, ndx) => {
    face.vertexColors = [
      new THREE.Color().setHSL(ndx / 12, 1, 0.5),
      new THREE.Color().setHSL(ndx / 12 + 0.1, 1, 0.5),
      new THREE.Color().setHSL(ndx / 12 + 0.2, 1, 0.5)
    ];
  });

  const test = (
    <a.mesh scale={[2, 2, 2]}>
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

  return test;
};
