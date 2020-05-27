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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-167129565-1',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          blog: require.resolve('./src/components/blog-post-layout.js'),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/blog`,
        name: `blog`,
      },
    },
  ],
};
