import React, { useRef, useState } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Bismuth from './Bismuth';
import { Button, Paper, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
    padding: '0.5em 2em 2em 2em',
    margin: '1em',
    maxHeight: '40%'
  }
})(Paper);

const App = () => {
  const [regenBismuth, setRegenBismuth] = useState(false);
  const [numLayers, setNumLayers] = useState(5);
  const [baseTowerHeightRange, setBaseTowerHeightRange] = useState([10, 20]);
  const [towerHeightRange, setTowerHeightRange] = useState([7, 30]);

  return (
    <div className="App">
      <MyPaper>
        <h3>Play around with some input values :)</h3>
        <h5>
          A new bismuth will automatically generate on any change.You can also
          generate new bismuths while keeping the same inputs by using the 'Gen
          New Bismuth' button.
        </h5>
        <h4>Base Tower Height Range</h4>
        <MySlider
          defaultValue={baseTowerHeightRange}
          marks={true}
          min={1}
          max={30}
          onChange={(_, value) => setBaseTowerHeightRange(value)}
          valueLabelDisplay="auto"
        />
        <h4>Number of Layers</h4>
        <MySlider
          defaultValue={numLayers}
          marks={true}
          min={3}
          max={10}
          onChange={(_, value) => setNumLayers(value)}
          valueLabelDisplay="auto"
        />
        <h4>Tower Height Range</h4>
        <MySlider
          defaultValue={towerHeightRange}
          marks={true}
          min={5}
          max={40}
          onChange={(_, value) => setTowerHeightRange(value)}
          valueLabelDisplay="auto"
        />
        <MyButton
          variant="outlined"
          size="small"
          onClick={() => setRegenBismuth(!regenBismuth)}
        >
          Gen new bismuth
        </MyButton>
      </MyPaper>
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
          forceUpdate={regenBismuth} // bool prop just to trigger re-render using new random values
          numLayers={numLayers}
          towerHeightRange={towerHeightRange}
        />
      </Canvas>
    </div>
  );
};

export default App;
