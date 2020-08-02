import React from 'react';
import { Link } from 'gatsby';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './card.css';

export default function Card({ linkURL, titleId, thumbnail, children }) {
  return (
    <div className="cardContainer">
      <div className="writingCard">
        <FormattedMessage id={titleId || 'comingSoon'} />
        <div className="cardDescription">{children}</div>
        <div className="cardFooter">
          <Link className="readMoreButton" to={linkURL}>
            <button>
              <FormattedMessage id="seeProject" />
            </button>
          </Link>
          <img className="cardThumbnail" src={thumbnail} />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  linkURL: PropTypes.string,
};
