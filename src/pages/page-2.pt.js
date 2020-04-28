import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layouts/index.js';

export default (props) => {
  return (
    <Layout location={props.location}>
      <h1>Oi da segunda página!</h1>
      <p>Bem vindo á página 2</p>
      <Link to="/pt/">Voltar pro início</Link>
    </Layout>
  );
};
