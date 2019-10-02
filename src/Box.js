import React, { useState } from 'react';
import { useSpring, a } from 'react-spring/three';
import { useDrag } from 'react-use-gesture';

export default ({ initialPosition, scaledState }) => {
  const [floatState, setFloatState] = useState(false);
  const boxData = useSpring({
    scale: scaledState ? [1.5, 1.5, 1.5] : [1, 1, 1],
    position: floatState
      ? [initialPosition[0], 1, initialPosition[2]]
      : initialPosition
  });
  const floatBox = () => {
    setFloatState(true);
    setTimeout(() => setFloatState(false), 500);
  };
  // trying to use this for mobile but not working yet
  const dragBind = useDrag(floatBox, { pointerEvents: true });

  return (
    <a.mesh {...boxData} {...dragBind()} onPointerOver={floatBox}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={'pink'} />
    </a.mesh>
  );
};
