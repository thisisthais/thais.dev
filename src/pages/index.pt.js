import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import Layout from '../layouts/index.js';

export default function PTIndexPage(props) {
  return (
    <Layout location={props.location}>
      <h1>
        <FormattedMessage id="greeting" />
      </h1>
      <Link to="/pt/page-2/">Ir para página 2</Link>
    </Layout>
  );
}

PTIndexPage.propTypes = {
  location: PropTypes.object,
};
