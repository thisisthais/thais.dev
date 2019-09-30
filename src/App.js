import React from 'react';
import { Canvas } from 'react-three-fiber';

import Box from './Box';

import './App.css';

const App = () => {
  const boxes = [
    <Box key={0} initialPosition={[0, 0, 0]} scaledState={scaledState} />
  ];
  for (var i = 1.2; i <= 5 * 1.2; i += 1.2) {
    boxes.push(
      <Box key={i} initialPosition={[i, 0, 0]} scaledState={scaledState} />
    );
    boxes.push(
      <Box key={-i} initialPosition={[-i, 0, 0]} scaledState={scaledState} />
    );
  }

  return (
    <div className="App">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight />
        <spotLight position={[0, 5, 5]} />
        {boxes}
      </Canvas>
    </div>
  );
};

export default App;
