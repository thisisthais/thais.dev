module.exports = {
  siteMetadata: {
    languages: ['en', 'pt'],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: 'en', // or pick your preferred default
        useLangKeyLayout: true,
        prefixDefault: true, // adds a route for your default language, en
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.png`,
      },
    },
  ],
};
