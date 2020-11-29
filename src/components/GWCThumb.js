import React, { useState, useEffect } from 'react';
import GWC1 from '../images/GWC1.jpg';
import GWC2 from '../images/GWC2.jpg';

const otherImage = (currrentImage) => {
  if (currrentImage === GWC1) {
    return GWC2;
  }

  return GWC1;
};

export default function GWCThumb() {
  const [currentImage, setImage] = useState(GWC1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(otherImage(currentImage));
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <img
      onMouseEnter={() => setImage(otherImage(currentImage))}
      onMouseLeave={() => setImage(otherImage(currentImage))}
      src={currentImage}
    />
  );
}
