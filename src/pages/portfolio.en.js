import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useSpring, animated } from 'react-spring';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout.js';
import MujicThumb from '../components/MujicThumb.js';
import GWCThumb from '../components/GWCThumb.js';

import doNothingThumb from '../images/doNothing.gif';
import bismuthThumb from '../images/bismuth.gif';
import shaderSketchesThumb from '../images/shaderSketches.gif';
import dynamiclandThumb from '../images/dynamicland.gif';
import daedalusThumb from '../images/daedalus.png';
import salorThumb from '../images/salor.png';
import aquaponicsThumb from '../images/aquaponics.jpg';
import portfolioData from '../data/portfolioData';

import '../components/portfolio.css';

const PROJECT_TO_THUMBNAIL = {
  doNothing: doNothingThumb,
  bismuth: bismuthThumb,
  shaderSketches: shaderSketchesThumb,
  dynamicland: dynamiclandThumb,
  mujic: null,
  girlsWhoCode: null,
  daedalus: daedalusThumb,
  salor: salorThumb,
  aquaponics: aquaponicsThumb,
};

const ProjectCard = ({ isExpanded, project, setExpandedProject }) => {
  const projectExtras = portfolioData[project].extra;
  const animProps = useSpring({
    height: isExpanded ? '300px' : '0px',
    opacity: isExpanded ? '1.0' : '0.0',
  });

  let thumbNail;
  switch (project) {
    case 'mujic':
      thumbNail = <MujicThumb />;
      break;
    case 'girlsWhoCode':
      thumbNail = <GWCThumb />;
      break;
    default:
      thumbNail = portfolioData[project].imageUrl ? (
        <a
          href={portfolioData[project].imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="imageUrl"
        >
          <img src={PROJECT_TO_THUMBNAIL[project]} />
        </a>
      ) : (
        <img src={PROJECT_TO_THUMBNAIL[project]} />
      );
  }

  return (
    <div className="projectCard">
      {thumbNail}
      <h3>
        <FormattedMessage id={`portfolioData.${project}.title`} />
      </h3>
      <p>
        <FormattedMessage id={`portfolioData.${project}.shortDesc`} />
        {projectExtras && (
          <span
            className="seeMore"
            role="button"
            onClick={() => setExpandedProject(isExpanded ? null : project)}
          >
            {isExpanded ? 'Collapse' : 'See more!'}
          </span>
        )}
      </p>
      <animated.div style={animProps}>
        <ReactMarkdown>{projectExtras}</ReactMarkdown>
      </animated.div>
      <marquee scrollamount="3">
        {(portfolioData[project].tags || []).map((t, i) => (
          <a href="" key={i}>
            {t}
          </a>
        ))}
      </marquee>
    </div>
  );
};

const PortfolioPage = (props) => {
  const [expandedProject, setExpandedProject] = useState(null);

  return (
    <Layout location={props.location}>
      <div className="projectsContainer">
        {Object.keys(portfolioData).map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            isExpanded={expandedProject === project}
            setExpandedProject={setExpandedProject}
          />
        ))}
      </div>
    </Layout>
  );
};

PortfolioPage.propTypes = {
  location: PropTypes.object,
};

export default PortfolioPage;
