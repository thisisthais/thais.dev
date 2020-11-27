import React from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import locale_en from 'react-intl/locale-data/en';
import locale_pt from 'react-intl/locale-data/pt';
import messages_en from '../data/en.js';
import messages_pt from '../data/pt.js';
import { Helmet } from 'react-helmet';

import './layout.css';
import Header from '../components/Header';

addLocaleData([...locale_en, ...locale_pt]);

const messages = {
  en: messages_en,
  pt: messages_pt,
};
const defaultLangKey = 'en';
const langs = ['en', 'pt'];

export default function Layout({ children, location }) {
  const url = location.pathname;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>thisisthaís</title>
        <link rel="canonical" href="https://thais.dev" />
      </Helmet>
      <IntlProvider
        locale={langKey}
        messages={flattenMessages(messages[langKey]) || messages[langKey]}
      >
        <>
          <Header langs={langsMenu} currentLang={langKey} />
          <div className="contentContainer">{children}</div>
        </>
      </IntlProvider>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

const flattenMessages = (nestedMessages, prefix = '') => {
  console.log(nestedMessages);
  if (!nestedMessages) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};
