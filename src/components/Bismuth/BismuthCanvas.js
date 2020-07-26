import React, { useRef } from 'react';

import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Bismuth from './Bismuth';
// import BismuthSegment from './BismuthSegment';

import './bismuthCanvas.css';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

const BismuthCanvas = () => {
  return (
    <div className="App">
      <Canvas
        id="myCanvas"
        style={{ touchAction: 'none' }}
        camera={{
          position: [5, 9, 5],
        }}
      >
        {/* <Controls /> */}
        {/* <ambientLight /> */}
        {/* <spotLight position={[0, 10, 4]} /> */}
        {/* <axesHelper args={[5]} />
        <Bismuth /> */}
        {/* <BismuthSegment /> */}
        {/* testing */}
        <mesh>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={'hotpink'} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default BismuthCanvas;
