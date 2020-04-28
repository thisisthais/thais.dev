import React from 'react';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import Layout from '../layouts/index.js';

export default (props) => {
  return (
    <Layout location={props.location}>
      <h1>
        <FormattedMessage id="greeting" />
      </h1>
      <Link to="/pt/page-2/">Ir para página 2</Link>
    </Layout>
  );
};
