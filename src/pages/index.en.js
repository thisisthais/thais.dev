import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useTypewriter from 'react-typewriter-hook';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import namePronounce from '../sound/namePronounce.mp3';
import useSound from 'use-sound';

const MagicWords = [
  'a web developer',
  'brazilian',
  'queer',
  'a polyglot',
  'a really good cook',
  'an ex-mathlete',
  'a musclehead',
  'non-binary',
  'an aspiring artist',
];
let index = 0;

export default function ENIndexPage(props) {
  const [magicWord, setMagicWord] = useState('a web developer');
  const intervalRef = useRef({});
  const currentWord = useTypewriter(magicWord);
  const howManyWords = MagicWords.length;
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      index = ++index % howManyWords;
      setMagicWord(MagicWords[index]);
    }, 3000);
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
    <Layout location={props.location}>
      <div>
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <h2>
          <FormattedMessage id="intro" />
          <i>
            {' '}
            (tah•EES) <span onClick={handleClick}>🔊</span>
          </i>
        </h2>
        <h2>
          i'm <p className="cursor">{currentWord}</p>
        </h2>
      </div>
    </Layout>
  );
}

ENIndexPage.propTypes = {
  location: PropTypes.object,
};
