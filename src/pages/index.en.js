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
      <Link to="/en/page-2/">Go to page 2</Link>
    </Layout>
  );
};
