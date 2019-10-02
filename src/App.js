import React from 'react';
import { Canvas } from 'react-three-fiber';

import Box from './Box';

import './App.css';
import { hsluvToHex } from 'hsluv';

const hueMin = 260;
const hueMax = 340;
const satMin = 60;
const satMax = 90;
const randColor = () =>
  hsluvToHex([
    Math.random() * (hueMax - hueMin) + hueMin,
    Math.random() * (satMax - satMin) + satMin,
    72
  ]);

const App = () => {
  let keyCount = 0;
  const spacing = 1.1;
  const boxes = [
    <Box
      key={`box#${keyCount++}`}
      initialPosition={[0, 0, 0]}
      color={randColor()}
    />
  ];

  for (var x = spacing; x <= 10 * spacing; x += spacing) {
    for (var z = spacing; z <= 6 * spacing; z += spacing) {
      if (Math.random() >= 0.7) {
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[x, 0, z]}
            color={randColor()}
          />
        );
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[-x, 0, z]}
            color={randColor()}
          />
        );
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[x, 0, -z]}
            color={randColor()}
          />
        );
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[-x, 0, -z]}
            color={randColor()}
          />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[0, 0, z]}
            color={randColor()}
          />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[0, 0, -z]}
            color={randColor()}
          />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[x, 0, 0]}
            color={randColor()}
          />
        );
      }

      if (Math.random() >= 0.9) {
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[-x, 0, 0]}
            color={randColor()}
          />
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
