import React, { useRef } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Bismuth from './Bismuth';
import BismuthSegment from './BismuthSegment';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

const App = () => {
  return (
    <div className="App">
      <Canvas
        style={{ touchAction: 'none' }}
        camera={{
          position: [5, 9, 5]
        }}
      >
        <Controls />
        <ambientLight />
        <spotLight position={[0, 10, 4]} />
        <axesHelper args={[5]} />
        <Bismuth />
      </Canvas>
    </div>
  );
};

export default App;
