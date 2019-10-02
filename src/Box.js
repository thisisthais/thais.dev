import React, { useState } from 'react';
import { useSpring, a } from 'react-spring/three';
import { useDrag } from 'react-use-gesture';

export default ({ initialPosition, color }) => {
  const [floatState, setFloatState] = useState(false);
  const boxData = useSpring({
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
      <a.meshPhysicalMaterial attach="material" color={color || 'pink'} />
    </a.mesh>
  );
};
