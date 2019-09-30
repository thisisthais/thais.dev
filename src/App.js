import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';

import Box from './Box';

import './App.css';

const App = () => {
  const [scaledState, setScaledState] = useState(false);
  const [floatState, setFloatState] = useState(false);

  const boxes = [
    <Box
      key={0}
      initialPosition={[0, 0, 0]}
      scaledState={scaledState}
      floatState={floatState}
    />
  ];
  for (var i = 1.5; i <= 3 * 1.5; i += 1.5) {
    boxes.push(
      <Box
        key={i}
        initialPosition={[i, 0, 0]}
        scaledState={scaledState}
        floatState={floatState}
      />
    );
    boxes.push(
      <Box
        key={-i}
        initialPosition={[-i, 0, 0]}
        scaledState={scaledState}
        floatState={floatState}
      />
    );
  }

  return (
    <div className="App">
      <button type="button" onClick={() => setScaledState(!scaledState)}>
        Scale
      </button>
      <button type="button" onClick={() => setFloatState(!floatState)}>
        Float
      </button>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight />
        <spotLight position={[0, 5, 5]} />
        {boxes}
      </Canvas>
    </div>
  );
};

export default App;
