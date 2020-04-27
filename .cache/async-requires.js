// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-index-en-js": () => import("./../src/pages/index.en.js" /* webpackChunkName: "component---src-pages-index-en-js" */),
  "component---src-pages-index-pt-js": () => import("./../src/pages/index.pt.js" /* webpackChunkName: "component---src-pages-index-pt-js" */)
}

