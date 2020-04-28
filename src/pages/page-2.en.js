import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layouts/index.js';

export default () => {
  return (
    <Layout>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/en/">Go back to the homepage</Link>
    </Layout>
  );
};
