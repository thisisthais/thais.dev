import React from 'react';
import { a } from 'react-spring/three';
import * as THREE from 'three';

const aBlockEndFaces = [[12, 0, 4], [12, 8, 0], [15, 7, 3], [15, 3, 11]];
const aBlockFaces = ({ closed } = {}) => [
  [7, 0, 3], // top ring
  [0, 7, 4], // top ring
  [15, 11, 8], // bottom ring
  [8, 12, 15], // bottom ring
  [15, 4, 7], // inner
  [15, 12, 4], // inner
  [11, 3, 0], // outer faces
  [11, 0, 8], // outer faces
  ...(closed ? aBlockEndFaces : [])
];
const aBlockVertexIndices = [0, 3, 4, 7, 8, 11, 12, 13];

const bBlockEndFaces = [[12, 4, 0], [12, 0, 8], [9, 1, 5], [9, 5, 13]];
const bBlockFaces = ({ closed } = {}) => [
  [0, 4, 1], // top ring
  [1, 4, 5], // top ring
  [8, 9, 12], // bottom ring
  [9, 13, 12], // bottom ring
  [9, 0, 1], // outer
  [9, 8, 0], // outer
  [4, 13, 5], // inner
  [4, 12, 13], // inner
  ...(closed ? bBlockEndFaces : [])
];
const bBlockVertexIndices = [0, 1, 4, 5, 8, 9, 12, 13];

const cBlockEndFaces = [[5, 1, 9], [5, 9, 13], [2, 6, 10], [6, 14, 10]];
const cBlockFaces = ({ closed } = {}) => [
  [1, 5, 2], // top ring
  [2, 5, 6], // top ring
  [9, 10, 13], // bottom ring
  [10, 14, 13], // bottom ring
  [9, 2, 10], // outer
  [9, 1, 2], // outer
  [13, 6, 5], // inner
  [13, 14, 6], // inner
  ...(closed ? cBlockEndFaces : [])
];
const cBlockVertexIndices = [1, 2, 5, 6, 9, 10, 13, 14];

const dBlockEndFaces = [[6, 2, 10], [14, 6, 10], [7, 15, 3], [3, 15, 11]];
const dBlockFaces = ({ closed } = {}) => [
  [2, 6, 3], // top ring
  [6, 7, 3], // top ring
  [10, 11, 14], // bottom ring
  [14, 11, 15], // bottom ring
  [11, 2, 3], // outer
  [11, 10, 2], // outer
  [6, 15, 7], // inner
  [6, 14, 15], // inner
  ...(closed ? dBlockEndFaces : [])
];
const dBlockVertexIndexes = [2, 3, 6, 7, 10, 11, 14, 15];

// stretch the vertices length and depth to make wider ring
const stretchVertex = (v, stretch) => [
  v[0] > 0 ? v[0] + stretch : v[0] - stretch,
  v[1],
  v[2] > 0 ? v[2] + stretch : v[2] - stretch
];

/**
 * blocks is an object that may contain A, B, C, and D keys.
 * if a key exists, that block will be added to the box ring.
 * the closed at that key determines if it's a closed or open block
 */
const defaultBlocks = {
  A: { closed: false },
  B: { closed: false },
  C: { closed: false },
  D: { closed: false }
};
const BoxRing = ({ position, stretch = 0, blocks = defaultBlocks }) => {
  const { A, B, C, D } = blocks;
  const vertices = [
    // top ring
    [-1, 0.25, 1], //0
    [-1, 0.25, -1], //1
    [1, 0.25, -1], //2,
    [1, 0.25, 1], //3,
    [-0.5, 0.25, 0.5], //4
    [-0.5, 0.25, -0.5], //5
    [0.5, 0.25, -0.5], //6
    [0.5, 0.25, 0.5], //7 // bottom ring
    [-1, -0.25, 1], //8
    [-1, -0.25, -1], //9
    [1, -0.25, -1], //10,
    [1, -0.25, 1], //11,
    [-0.5, -0.25, 0.5], //12
    [-0.5, -0.25, -0.5], //13
    [0.5, -0.25, -0.5], //14
    [0.5, -0.25, 0.5] //15
  ].map(v => stretchVertex(v, stretch));

  var faces = [
    ...(A ? aBlockFaces({ closed: A.closed }) : []),
    ...(B ? bBlockFaces({ closed: B.closed }) : []),
    ...(C ? cBlockFaces({ closed: C.closed }) : []),
    ...(D ? dBlockFaces({ closed: D.closed }) : [])
  ];
  faces = faces.map(f => new THREE.Face3(...f));

  faces.forEach((face, ndx) => {
    face.vertexColors = [
      new THREE.Color().setHSL(ndx / 12, 1, 0.5),
      new THREE.Color().setHSL(ndx / 12 + 0.1, 1, 0.5),
      new THREE.Color().setHSL(ndx / 12 + 0.2, 1, 0.5)
    ];
  });

  return (
    <a.mesh position={position || [0, 0, 0]}>
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
  // MUST be capital! or else a conflicts with <a />
  const firstTowerBaseBlocks = {
    A: { closed: true },
    B: { closed: false },
    C: { closed: true }
  };
  const firtTowerTopBlocks = {
    A: { closed: true },
    B: { closed: true }
  };
  const firstTowerFirstLoopBlock = {
    C: { closed: true },
    D: { closed: true }
  };
  const firstTowerSecondLoopBlock = {
    A: { closed: true }
  };
  const firstTower = (
    <>
      <BoxRing
        position={[-1.75, 2.75, -1.75]}
        blocks={firstTowerSecondLoopBlock}
        key="paloita"
      />
      <BoxRing
        stretch={0.25}
        position={[-2, 2.75, -2]}
        blocks={firstTowerFirstLoopBlock}
        key="donimer"
      />
      <BoxRing
        stretch={0.75}
        position={[-1.5, 2.75, -1.5]}
        blocks={firtTowerTopBlocks}
        key="roleum"
      />
      <BoxRing
        stretch={0.5}
        position={[-1.5, 2.5, -1.5]}
        blocks={firstTowerBaseBlocks}
        key="devilFace"
      />
      <BoxRing
        stretch={0.25}
        position={[-1.5, 2.25, -1.5]}
        blocks={firstTowerBaseBlocks}
        key="devilFace"
      />
      <BoxRing
        position={[-1.5, 2, -1.5]}
        blocks={firstTowerBaseBlocks}
        key="beese"
      />
    </>
  );
  const secondTowerBaseBlocks = {
    A: { closed: true },
    D: { closed: true }
  };
  const allClosedBase = [
    <BoxRing stretch={1.5} position={[0, 1.5, 0]} key="vibro" />,
    <BoxRing stretch={1.25} position={[0, 1.25, 0]} key="maniaBaby" />,
    <BoxRing stretch={1} position={[0, 1, 0]} key="chiqueta" />,
    <BoxRing stretch={0.75} position={[0, 0.75, 0]} key="fantimer" />,
    <BoxRing stretch={0.5} position={[0, 0.5, 0]} key="tillium" />,
    <BoxRing stretch={0.25} position={[0, 0.25, 0]} key="angelShape" />,
    <BoxRing key="baws" />
  ];
  return (
    <>
      <BoxRing
        stretch={0.5}
        position={[1.5, 2.25, 1.5]}
        blocks={secondTowerBaseBlocks}
        key="tojaLad"
      />
      <BoxRing
        position={[1.5, 2, 1.5]}
        blocks={secondTowerBaseBlocks}
        key="boobi"
      />
      {firstTower}
      {allClosedBase}
    </>
  );
};
