import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';
import Card from '../components/Card.js';
import {
  Desktop,
  Tablet,
  Mobile,
  Default,
} from '../components/ResponsiveComponents.js';

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
        <Card linkURL="/bismuth" titleId="bismuth">
          <Desktop>
            <span className="cardDescription">
              one of the projects i worked on during my time at the recurse
              center. an exploration of the prettiest crystal, bismuth, and
              generative art.
            </span>
          </Desktop>
          <Tablet>
            <span className="cardDescription">
              one of the projects i worked on during my time at the recurse
              center. an exploration of the prettiest crystal, bismuth, and
              generative art.
            </span>
          </Tablet>
          <Mobile>
            <span className="cardDescription">
              an exploration of the prettiest crystal, bismuth, and generative
              art.
            </span>
          </Mobile>
        </Card>
        <Card />
      </div>
    </Layout>
  );
}

PTIndexPage.propTypes = {
  location: PropTypes.object,
};
