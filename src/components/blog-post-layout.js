import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';

export default function BlogPostLayout({ children, location }) {
  return (
    <Layout location={location}>
      <article>{children}</article>
    </Layout>
  );
}

BlogPostLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};
