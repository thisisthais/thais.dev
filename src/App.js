import React from 'react';
import { Canvas } from 'react-three-fiber';

import Box from './Box';

import './App.css';

const App = () => {
  let keyCount = 0;
  const spacing = 1.1;
  const boxes = [<Box key={`box#${keyCount++}`} initialPosition={[0, 0, 0]} />];
  for (var x = spacing; x <= 10 * spacing; x += spacing) {
    for (var z = spacing; z <= 6 * spacing; z += spacing) {
      if (Math.random() >= 0.7) {
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[x, 0, z]} />
        );
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[-x, 0, z]} />
        );
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[x, 0, -z]} />
        );
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[-x, 0, -z]} />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[0, 0, z]} />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[0, 0, -z]} />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[x, 0, 0]} />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box key={`box#${keyCount++}`} initialPosition={[-x, 0, 0]} />
        );
      }
    }
  }

  return (
    <div className="App">
      <Canvas
        style={{ touchAction: 'none' }}
        camera={{ position: [0, 4, 10], lookAt: [0, 0, 0] }}
      >
        <ambientLight />
        <spotLight position={[0, 8, 5]} />
        {boxes}
      </Canvas>
    </div>
  );
};

export default App;
