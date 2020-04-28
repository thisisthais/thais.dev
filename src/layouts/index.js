import React from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import locale_en from 'react-intl/locale-data/en';
import locale_pt from 'react-intl/locale-data/pt';
import messages_en from '../data/en.js';
import messages_pt from '../data/pt.js';

import SelectLanguage from '../components/SelectLanguage';

addLocaleData([...locale_en, ...locale_pt]);

const messages = {
  en: messages_en,
  pt: messages_pt,
};
const defaultLangKey = 'en';
const langs = ['en', 'pt'];

const Layout = ({ children }) => {
  const url = window.location.pathname;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  return (
    <IntlProvider locale={langKey} messages={messages[langKey]}>
      <div>
        <SelectLanguage langs={langsMenu} />
        <div>{children}</div>
      </div>
    </IntlProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
