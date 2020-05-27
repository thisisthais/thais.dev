import React from 'react';
import { Link } from 'gatsby';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export default function Card({ linkURL }) {
  return (
    <div className="cardContainer">
      <div className="writingCard">
        <FormattedMessage id="comingSoon" />
        <Link className="readMoreButton" to={linkURL}>
          <button>
            <FormattedMessage id="readMore" />
          </button>
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  linkURL: PropTypes.string,
};
