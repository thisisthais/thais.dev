import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import './header.css';

export default function Header(props) {
  const links = props.langs.map((lang) => (
    <li selected={lang.selected} key={lang.langKey}>
      {lang.selected ? (
        <b>
          <Link to={lang.link}>{lang.langKey == 'en' ? '🇺🇸 en' : 'pt 🇧🇷'}</Link>
        </b>
      ) : (
        <Link to={lang.link}>{lang.langKey == 'en' ? '🇺🇸 en' : 'pt 🇧🇷'}</Link>
      )}
    </li>
  ));

  return (
    <header>
      <ul>{links}</ul>
    </header>
  );
}

Header.propTypes = {
  langs: PropTypes.array,
  currentLang: PropTypes.string,
};
