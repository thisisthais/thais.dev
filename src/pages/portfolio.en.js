import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Layout from '../components/layout.js';
import doNothingThumb from '../images/doNothing.gif';

import '../components/portfolio.css';

const ProjectCard = ({ text }) => {
  return (
    <div className="projectCard">
      <img src={doNothingThumb} />
      <FormattedMessage id="portfolioData.doNothing.title" />
      <FormattedMessage id="portfolioData.doNothing.shortDesc" />
    </div>
  );
};

export default function ENPortfolioPage(props) {
  return (
    <Layout location={props.location}>
      <div className="projectsContainer">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => (
          <ProjectCard key={t} text={t} />
        ))}
      </div>
    </Layout>
  );
}

ENPortfolioPage.propTypes = {
  location: PropTypes.object,
};
