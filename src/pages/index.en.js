import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';

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

export default function ENIndexPage(props) {
  return (
    <Layout location={props.location}>
      <div>
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <AboutMe magicWords={MagicWords} />
        {/* <div className="writingCard">coming soon!</div> */}
      </div>
    </Layout>
  );
}

ENIndexPage.propTypes = {
  location: PropTypes.object,
};
