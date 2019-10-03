import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';

export default () => {
  const vertices = [
    [-1, -1, 1], // 0
    [1, -1, 1], // 1
    [-1, 1, 1], // 2
    [1, 1, 1], // 3
    [-1, -1, -1], // 4
    [1, -1, -1], // 5
    [-1, 1, -1], // 6
    [1, 1, -1], // 7
    [0, 2, 0] // 8
  ];
  var faces = [
    // front
    [0, 3, 2],
    [0, 1, 3],
    // right
    [1, 7, 3],
    [1, 5, 7],
    // back
    [5, 6, 7],
    [5, 4, 6],
    // left
    [4, 2, 6],
    [4, 0, 2],
    // top
    [2, 7, 6],
    [2, 3, 7],
    // bottom
    [4, 1, 0],
    [4, 5, 1],
    // tri front
    [2, 3, 8],
    // tri back
    [7, 6, 8],
    // tri right
    [3, 7, 8],
    // tri left
    [6, 2, 8]
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
