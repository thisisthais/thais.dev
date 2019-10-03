import React, { useRef } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Bismuth from './Bismuth';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls args={[camera, gl.domElement]} autoRotate ref={orbitRef} />
  );
};

const App = () => {
  return (
    <div className="App">
      <Canvas
        style={{ touchAction: 'none' }}
        camera={{ position: [0, 10, 16], rotation: [-Math.PI / 8, 0, 0] }}
      >
        <Controls />
        <ambientLight />
        <spotLight position={[0, 10, 4]} />
        <Bismuth />
      </Canvas>
    </div>
  );
};

export default App;
