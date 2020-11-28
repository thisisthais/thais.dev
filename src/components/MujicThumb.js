import React from 'react';
import { FormattedMessage } from 'react-intl';
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
          <FormattedMessage id="mujic.1" />
          <br />
          <br />
          <i>
            <FormattedMessage id="mujic.2" />
          </i>
        </span>
      </div>
      <div>
        <button
          onMouseEnter={play}
          onMouseLeave={() => stop()}
          onTouchStart={play}
          onTouchEnd={() => stop()}
        >
          <FormattedMessage id="mujic.original" />
        </button>
        <button
          onMouseEnter={play2}
          onMouseLeave={() => stop2()}
          onTouchStart={play2}
          onTouchEnd={() => stop2()}
        >
          <FormattedMessage id="mujic.generated" />
        </button>
      </div>
    </div>
  );
}
