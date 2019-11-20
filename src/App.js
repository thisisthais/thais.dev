import React, { useRef, useState } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Bismuth from './Bismuth';
import { Slider, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

const MySlider = withStyles({
  root: {
    color: '#ba6ca7'
  }
})(Slider);

const App = () => {
  const [numLayers, setNumLayers] = useState(5);
  const [baseTowerHeightRange, setBaseTowerHeightRange] = useState([10, 20]);

  return (
    <div className="App">
      <div className="sliders">
        <h4>Number of Layers</h4>
        <MySlider
          defaultValue={numLayers}
          marks={true}
          min={3}
          max={10}
          onChange={(_, value) => setNumLayers(value)}
          valueLabelDisplay="auto"
        />
        <h4>Base Tower Height Range</h4>
        <MySlider
          defaultValue={baseTowerHeightRange}
          marks={true}
          min={1}
          max={30}
          onChange={(_, value) => setBaseTowerHeightRange(value)}
          valueLabelDisplay="auto"
        />
      </div>
      <Canvas
        id="myCanvas"
        style={{ touchAction: 'none' }}
        camera={{
          position: [-3, 5, -3]
        }}
      >
        <Controls />
        <axesHelper args={[5]} />
        <Bismuth
          baseTowerHeightRange={baseTowerHeightRange}
          numLayers={numLayers}
        />
      </Canvas>
    </div>
  );
};

export default App;
