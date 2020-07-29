import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';
import Card from '../components/Card.js';

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
  'a scuba diver',
];

export default function ENIndexPage(props) {
  return (
    <Layout location={props.location}>
      <div>
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <AboutMe magicWords={MagicWords} />
        <div className="cardsContainer">
          <Card linkURL="/bismuth" titleId="bismuth">
            {/* TODO: fix this so it fits no matter screensize. will have to fix card */}
            {/* <span className="cardDescription">
              one of the projects i worked on during my time at the recurse
              center. an exploration of the prettiest crystal, bismuth, and
              generative art.
            </span> */}
          </Card>
          <Card />
        </div>
      </div>
    </Layout>
  );
}

ENIndexPage.propTypes = {
  location: PropTypes.object,
};
