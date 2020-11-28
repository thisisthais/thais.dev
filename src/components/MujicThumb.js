import React from 'react';
import useSound from 'use-sound';
import sunflowerPark from '../sound/sunflower-park.mp3';
import markovSunflower from '../sound/markov-sunflower.mp4';
import hamtaro from '../images/hamtaro.gif';

export default function MujicThumb() {
  const [play, { stop }] = useSound(sunflowerPark);
  const [play2, { stop: stop2 }] = useSound(markovSunflower);
  return (
    <div className="mujicThumb">
      <div>
        <img src={hamtaro} />
        <span>
          My favorite example was generated based on a track from the game
          Hamtaro: Ham-Hams Unite!
          <br />
          <br />
          <i> Hover or hold to listen.</i>
        </span>
      </div>
      <div>
        <button
          onMouseEnter={play}
          onMouseLeave={() => stop()}
          onTouchStart={play}
          onTouchEnd={() => stop()}
        >
          Original track
        </button>
        <button
          onMouseEnter={play2}
          onMouseLeave={() => stop2()}
          onTouchStart={play2}
          onTouchEnd={() => stop2()}
        >
          Generated track
        </button>
      </div>
    </div>
  );
}
