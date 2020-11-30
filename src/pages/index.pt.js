import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';
import Card from '../components/Card.js';
import BismuthGif from '../images/bismuth.gif';

const MagicWords = [
  'desenvolvedora de web',
  'brasileira',
  'queer',
  'poliglota',
  'ótima cozinheira',
  'ex-matleta',
  'marombeira',
  'uma pessoa não-binária',
  'artista aspirante',
  'mergulhadora de scuba',
];

export default function PTIndexPage(props) {
  return (
    <Layout location={props.location}>
      <div className="greetingContainer">
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <AboutMe magicWords={MagicWords} />
      </div>
      <div className="cardsContainer">
        <Card linkURL="/bismuth" titleId="bismuth" thumbnail={BismuthGif}>
          <span>
            arte generativa se encontra com o cristal mais bonito. agora você
            pode fazer bismuto no seu navegador! nenhum fogão necessário :) este
            é um dos projetos em que trabalhei durante meu período no{' '}
            <a
              href="https://www.recurse.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              recurse center
            </a>
            .
          </span>
        </Card>
        <Card />
      </div>
    </Layout>
  );
}

PTIndexPage.propTypes = {
  location: PropTypes.object,
};
