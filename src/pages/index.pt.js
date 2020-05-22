import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import AboutMe from '../components/AboutMe.js';

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

export default function PTIndexPage(props) {
  return (
    <Layout location={props.location}>
      <div>
        <h1>
          <FormattedMessage id="greeting" />
        </h1>
        <AboutMe magicWords={MagicWords} />
      </div>
    </Layout>
  );
}

PTIndexPage.propTypes = {
  location: PropTypes.object,
};
