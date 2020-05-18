import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useTypewriter from 'react-typewriter-hook';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';

const MagicWords = [
  'desenvolvedora de web',
  'brasileira',
  'queer',
  'poliglota',
  'ótima cozinheira',
  'ex-matleta',
  'marombeira',
  'não-binária',
  'artista aspirante',
];
let index = 0;

export default function PTIndexPage(props) {
  const [magicWord, setMagicWord] = useState('desenvolvedora de web');
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

  return (
    <Layout location={props.location}>
      <div>
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <h2>
          <FormattedMessage id="intro" />
        </h2>
        <h2>
          sou <p className="cursor">{currentWord}</p>
        </h2>
      </div>
    </Layout>
  );
}

PTIndexPage.propTypes = {
  location: PropTypes.object,
};
