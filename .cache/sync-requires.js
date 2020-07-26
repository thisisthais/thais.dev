const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/thais/thais.dev/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/thais/thais.dev/src/pages/404.js"))),
  "component---src-pages-bismuth-js": hot(preferDefault(require("/Users/thais/thais.dev/src/pages/bismuth.js"))),
  "component---src-pages-blog-first-en-mdx": hot(preferDefault(require("/Users/thais/thais.dev/src/pages/blog/first.en.mdx"))),
  "component---src-pages-blog-first-pt-mdx": hot(preferDefault(require("/Users/thais/thais.dev/src/pages/blog/first.pt.mdx"))),
  "component---src-pages-index-en-js": hot(preferDefault(require("/Users/thais/thais.dev/src/pages/index.en.js"))),
  "component---src-pages-index-pt-js": hot(preferDefault(require("/Users/thais/thais.dev/src/pages/index.pt.js")))
}

