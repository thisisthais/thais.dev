import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';
import Card from '../components/Card.js';
import BismuthGif from '../images/pretty_bismuth_shader.gif';

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
      <div className="greetingContainer">
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <AboutMe magicWords={MagicWords} />
      </div>
      <div className="cardsContainer">
        <Card linkURL="/bismuth" titleId="bismuth" thumbnail={BismuthGif}>
          <span>
            generative art meets the prettiest crystal. now you can make bismuth
            in your browser! no stovetop needed :) this is one of the projects i
            worked on during my time at the{' '}
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

ENIndexPage.propTypes = {
  location: PropTypes.object,
};
