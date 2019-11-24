import React, { useRef, useState } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Bismuth from './Bismuth';
import { Button, Paper, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import polyfill from '@juggle/resize-observer';

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

const MyButton = withStyles({
  root: {
    color: '#ba6ca7',
    borderColor: '#ba6ca7',
    '&:hover': {
      backgroundColor: 'rgba(138, 84, 171, 0.2)'
    }
  }
})(Button);

const MyPaper = withStyles({
  root: {
    boxShadow:
      '2px 3px 1px -1px rgba(134, 88, 184, 0.2), 2px 2px 2px 0px rgba(134, 88, 184, 0.2), 2px 2px 4px 0px rgba(134, 88, 184, 0.2)',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '1em'
  }
})(Paper);

const App = () => {
  // cleam this up later
  const [regenBismuth, setRegenBismuth] = useState(false);
  const [numLayers, setNumLayers] = useState(5);
  const [baseTowerHeightRange, setBaseTowerHeightRange] = useState([10, 20]);
  const [towerHeightRange, setTowerHeightRange] = useState([7, 30]);
  const [gapDistance, setGapDistance] = useState(1.25);

  return (
    <div className="App">
      <MyPaper className="sideBar">
        <div className="textContainer">
          <h5>Play around with some input values :)</h5>
          <h5>A new bismuth will automatically generate on any change.</h5>
          <h5>
            You can also generate new bismuths while keeping the same inputs by
            using the button.
          </h5>
        </div>
        <div className="slidersContainer">
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
          <MyButton
            variant="outlined"
            size="small"
            onClick={() => setRegenBismuth(!regenBismuth)}
          >
            Gen new bismuth
          </MyButton>
        </div>
      </MyPaper>
      <Canvas
        resize={{ polyfill }}
        id="myCanvas"
        style={{ touchAction: 'none' }}
        camera={{
          position: [-3, 5, -3]
        }}
      >
        <Controls />
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

export default App;
