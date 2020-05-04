import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';

export default function ENIndexPage(props) {
  return (
    <Layout location={props.location}>
      <h1>
        <FormattedMessage id="greeting" />
      </h1>
      <Link to="/en/page-2/">Go to page 2</Link>
    </Layout>
  );
}

ENIndexPage.propTypes = {
  location: PropTypes.object,
};
