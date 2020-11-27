import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import doNothingThumb from '../images/doNothing.gif';
import bismuthThumb from '../images/bismuth.gif';
import shaderSketchesThumb from '../images/shaderSketches.gif';
import portfolioData from '../data/portfolioData';

import '../components/portfolio.css';

const PROJECT_TO_THUMBNAIL = {
  doNothing: doNothingThumb,
  bismuth: bismuthThumb,
  shaderSketches: shaderSketchesThumb,
};

const ProjectCard = ({ project }) => {
  return (
    <div className="projectCard">
      <img src={PROJECT_TO_THUMBNAIL[project]} />
      <h3>
        <FormattedMessage id={`portfolioData.${project}.title`} />
      </h3>
      <p>
        <FormattedMessage id={`portfolioData.${project}.shortDesc`} />
      </p>
      <marquee scrollamount="3">
        {(portfolioData[project].tags || []).map((t) => (
          <a href="">{t}</a>
        ))}
      </marquee>
    </div>
  );
};

const ENPortfolioPage = (props) => {
  return (
    <Layout location={props.location}>
      <div className="projectsContainer">
        {Object.keys(portfolioData).map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </Layout>
  );
};

ENPortfolioPage.propTypes = {
  location: PropTypes.object,
};

export default ENPortfolioPage;
