import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useTypewriter from 'react-typewriter-hook';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import namePronounce from '../sound/namePronounce.mp3';
import useSound from 'use-sound';

let index = 0;

export default function AboutMe({ magicWords }) {
  const [magicWord, setMagicWord] = useState(magicWords[0]);
  const intervalRef = useRef({});
  const currentWord = useTypewriter(magicWord);
  const howManyWords = magicWords.length;
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      index = ++index % howManyWords;
      setMagicWord(magicWords[index]);
    }, Math.min(4000, Math.max(3000, magicWords[index].length * 400)));
    return function clear() {
      clearInterval(intervalRef.current);
    };
  }, [magicWord]);

  const [playbackRate, setPlaybackRate] = React.useState(0.9);
  const [play] = useSound(namePronounce, { playbackRate, volume: 0.5 });
  const handleClick = () => {
    setPlaybackRate(playbackRate + 0.1);
    play();
  };

  return (
    <>
      <h2>
        <FormattedMessage id="intro" />
        <i>
          {' '}
          (tah•EES){' '}
          <span
            className="speaker"
            role="img"
            aria-label="speaker"
            onClick={handleClick}
          >
            🔊
          </span>
        </i>
      </h2>
      <h2>
        <FormattedMessage id="iAm" /> <p className="cursor">{currentWord}</p>
      </h2>
    </>
  );
}

AboutMe.propTypes = {
  magicWords: PropTypes.arrayOf(PropTypes.string).isRequired,
};
