import React, { useState } from 'react';
import { useSpring, a } from 'react-spring/three';
import { useDrag } from 'react-use-gesture';

export default ({ initialPosition, color, randHeight }) => {
  const [pointerState, setPointerState] = useState(false);

  const boxData = useSpring({
    scale: pointerState ? [1, 2.5, 1] : [1, randHeight, 1],
    position: pointerState
      ? [initialPosition[0], 2.5 - randHeight, initialPosition[2]]
      : initialPosition
  });
  const stretchBox = () => {
    setPointerState(true);
    setTimeout(() => setPointerState(false), 500);
  };
  const dragBind = useDrag(stretchBox, { pointerEvents: true });

  return (
    <a.mesh
      position={initialPosition}
      {...boxData}
      {...dragBind()}
      onPointerOver={stretchBox}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={color || 'pink'} />
    </a.mesh>
  );
};
