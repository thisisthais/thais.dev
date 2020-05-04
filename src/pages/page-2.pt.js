import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Layout from '../components/layout.js';

export default function PTSecondPage(props) {
  return (
    <Layout location={props.location}>
      <h1>Oi da segunda página!</h1>
      <p>Bem vindo á página 2</p>
      <Link to="/pt/">Voltar pro início</Link>
    </Layout>
  );
}

PTSecondPage.propTypes = {
  location: PropTypes.object,
};
