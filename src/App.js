import React, { useRef, useState } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import Bismuth from './Bismuth';
import { Button, Grid, Paper, Slider, Tooltip } from '@material-ui/core';
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
    color: '#a46fd9',
    borderColor: '#a46fd9',
    marginTop: '-0.5em',
    marginBottom: '0.5em',
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
    margin: '0.8em'
  }
})(Paper);

const MyTooltip = withStyles({
  tooltip: {
    backgroundColor: '#ffffff',
    color: '#a46fd9',
    border: '1px solid #a46fd9',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '0.8em'
  }
})(Tooltip);

const App = () => {
  // cleam this up later
  const [regenBismuth, setRegenBismuth] = useState(false);
  const [numLayers, setNumLayers] = useState(5);
  const [baseTowerHeightRange, setBaseTowerHeightRange] = useState([10, 20]);
  const [towerHeightRange, setTowerHeightRange] = useState([7, 30]);
  const [gapDistance, setGapDistance] = useState(1.25);

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebarContent">
          <div className="sidebarTitle">
            <span role="img" aria-label="sparkle emoji">
              ✨✨✨
            </span>
            <h2>Bismuth Generator</h2>
            <p>ⓘ</p>
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
          {/* <div className="button">
            <MyButton
              variant="outlined"
              size="small"
              onClick={() => setRegenBismuth(!regenBismuth)}
            >
              Regenerate
            </MyButton>
          </div> */}
        </div>
      </div>
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

const App2 = () => {
  // cleam this up later
  const [regenBismuth, setRegenBismuth] = useState(false);
  const [numLayers, setNumLayers] = useState(5);
  const [baseTowerHeightRange, setBaseTowerHeightRange] = useState([10, 20]);
  const [towerHeightRange, setTowerHeightRange] = useState([7, 30]);
  const [gapDistance, setGapDistance] = useState(1.25);

  const tooltipText = `
  Enjoy growing bismuth crystals from the comfort of your device!
  No two bismuths are exactly the same.
  Below you will find some properties that affect the generated geometry or iridescence of your bismuth.
  `;

  return (
    <div className="App">
      <MyPaper className="sideBar">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="sidebarContent"
        >
          <Grid container item justify="center" sm>
            <MyTooltip title={tooltipText} placement="bottom">
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <span role="img" aria-label="sparkle emoji">
                  ✨✨✨
                </span>
                <h2>Bismuth Generator</h2>
                <h7>ⓘ</h7>
                <span role="img" aria-label="sparkle emoji">
                  ✨✨✨
                </span>
              </Grid>
            </MyTooltip>
          </Grid>
          <Grid container item direction="column" justify="center">
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
              <MyButton
                variant="outlined"
                size="small"
                onClick={() => setRegenBismuth(!regenBismuth)}
              >
                Regenerate
              </MyButton>
            </Grid>
          </Grid>
        </Grid>
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
