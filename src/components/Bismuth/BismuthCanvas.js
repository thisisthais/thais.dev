import React, { useRef, useState } from 'react';

import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Bismuth from './Bismuth';
import { Button, Paper, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import polyfill from '@juggle/resize-observer';

import './bismuthCanvas.css';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

const MySlider = withStyles({
  root: {
    color: '#ba6ca7',
  },
})(Slider);

const MyButton = withStyles({
  root: {
    color: '#a46fd9',
    borderColor: '#a46fd9',
    marginTop: '-0.5em',
    marginBottom: '0.5em',
    '&:hover': {
      backgroundColor: 'rgba(138, 84, 171, 0.2)',
    },
  },
})(Button);

const BismuthCanvas = () => {
  // cleam this up later
  const [regenBismuth, setRegenBismuth] = useState(false);
  const [numLayers, setNumLayers] = useState(5);
  const [baseTowerHeightRange, setBaseTowerHeightRange] = useState([10, 20]);
  const [towerHeightRange, setTowerHeightRange] = useState([7, 30]);
  const [gapDistance, setGapDistance] = useState(1.25);

  return (
    <div className="bismuthContainer">
      <div className="sidebar">
        <div className="sidebarContent">
          <div className="sidebarTitle">
            <span role="img" aria-label="sparkle emoji">
              ✨✨✨
            </span>
            <span>Bismuth Generator</span>
            <span role="img" aria-label="sparkle emoji">
              ✨✨✨
            </span>
          </div>
          <div className="slider1">
            <h4>Base Tower Height Range</h4>
            <MySlider
              getAriaLabel={() => 'Base Tower Height Range'}
              defaultValue={baseTowerHeightRange}
              marks={true}
              min={1}
              max={30}
              onChange={(_, value) => setBaseTowerHeightRange(value)}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="slider2">
            <h4>Number of Layers</h4>
            <MySlider
              aria-label="Number of Layers"
              defaultValue={numLayers}
              marks={true}
              min={3}
              max={10}
              onChange={(_, value) => setNumLayers(value)}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="slider3">
            <h4>Tower Height Range</h4>
            <MySlider
              getAriaLabel={() => 'Tower Height Range'}
              defaultValue={towerHeightRange}
              marks={true}
              min={5}
              max={40}
              onChange={(_, value) => setTowerHeightRange(value)}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="slider4">
            <h4>Iridescence Gap Distance</h4>
            <MySlider
              aria-label="Iridescence Gap Distance"
              defaultValue={gapDistance}
              min={0.01}
              max={5.0}
              step={0.01}
              onChange={(_, value) => setGapDistance(value)}
              valueLabelDisplay="auto"
            />
          </div>
          <MyButton
            className="button"
            variant="outlined"
            size="small"
            onClick={() => setRegenBismuth(!regenBismuth)}
          >
            Regenerate
          </MyButton>
        </div>
      </div>
      <Canvas
        resize={{ polyfill }}
        id="myCanvas"
        style={{ touchAction: 'none' }}
        camera={{
          position: [-3, 5, -3],
        }}
      >
        <Controls />
        <axesHelper args={[5]} />
        <Bismuth
          baseTowerHeightRange={baseTowerHeightRange}
          forceUpdate={regenBismuth} // bool prop just to trigger re-render using new random values
          numLayers={numLayers}
          towerHeightRange={towerHeightRange}
          gapDistance={gapDistance}
        />
      </Canvas>
    </div>
  );
};

export default BismuthCanvas;
