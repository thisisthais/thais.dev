import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export default function Card() {
  return (
    <div className="cardContainer">
      <div className="writingCard">
        <FormattedMessage id="comingSoon" />
        <button>
          <FormattedMessage id="readMore" />
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {};
