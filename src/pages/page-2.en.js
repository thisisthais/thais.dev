import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Layout from '../components/layout.js';

export default function ENSecondPage(props) {
  return (
    <Layout location={props.location}>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/en/">Go back to the homepage</Link>
    </Layout>
  );
}

ENSecondPage.propTypes = {
  location: PropTypes.object,
};
