import React, { useState } from 'react';
import { useSpring, a } from 'react-spring/three';

export default ({ initialPosition, scaledState, floatState }) => {
  const boxData = useSpring({
    scale: scaledState ? [1.5, 1.5, 1.5] : [1, 1, 1],
    position: floatState
      ? [initialPosition[0], 1, initialPosition[2]]
      : initialPosition
  });

  return (
    <a.mesh position={boxData.position} scale={boxData.scale}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={'pink'} />
    </a.mesh>
  );
};
