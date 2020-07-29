import React from 'react';
import { Link } from 'gatsby';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './card.css';

export default function Card({ linkURL, titleId }) {
  return (
    <div className="cardContainer">
      <div className="writingCard">
        <FormattedMessage id={titleId || 'comingSoon'} />
        <span>ugfiudsg ihsfiuhdsfnifuhniufg fiusnuigfa iffusga</span>
        <Link className="readMoreButton" to={linkURL}>
          <button>
            <FormattedMessage id="seeProject" />
          </button>
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  linkURL: PropTypes.string,
};
