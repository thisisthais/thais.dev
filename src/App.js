import React from 'react';
import { Canvas } from 'react-three-fiber';

import Box from './Box';

import './App.css';
import { hsluvToHex } from 'hsluv';

const hueMin = 260;
const hueMax = 340;
const satMin = 60;
const satMax = 90;
const spacing = 1.1;
const hueStep = (hueMax - hueMin) / (10 * spacing);
const randColor = () =>
  hsluvToHex([
    Math.random() * (hueMax - hueMin) + hueMin,
    Math.random() * (satMax - satMin) + satMin,
    72
  ]);

const xBasedColor = x =>
  hsluvToHex([
    x === 0 ? hueMax : hueMax - x * 6,
    Math.random() * (satMax - satMin) + satMin,
    72
  ]);

const App = () => {
  let keyCount = 0;
  const boxes = [];

  for (var x = -12; x <= 12; x++) {
    for (var z = -20; z <= 6; z++) {
      if (Math.random() >= 0.5) {
        const randHeight = Math.random() * (2.4 - 1.0) + 1.0;
        boxes.push(
          <Box
            key={`box#${keyCount++}`}
            initialPosition={[x, 0, z]}
            color={xBasedColor(Math.abs(x))}
            randHeight={randHeight}
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
        <spotLight position={[0, 10, 4]} />
        {boxes}
      </Canvas>
    </div>
  );
};

export default App;
