import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';
import Card from '../components/Card.js';

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
      <div>
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <AboutMe magicWords={MagicWords} />
        <Card linkURL="/bismuth" titleId="bismuth">
          {/* TODO: fix this so it fits no matter screensize. will have to fix card */}
          {/* <span className="cardDescription">
            um dos projetos que fiz durante meu tempo no recurse center. uma
            exploração do cristal mais bonito, o bismuto, e arte generativa.
          </span> */}
        </Card>
      </div>
    </Layout>
  );
}

PTIndexPage.propTypes = {
  location: PropTypes.object,
};
