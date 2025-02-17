const Hapi = require("@hapi/hapi");
const path = require("path");
const config = require("./../../config");
const { loadAll } = require("./../../storage");

module.exports = async function (
  appName,
  customPort = config.SERVER_PORT,
  { hotVersion = "latest", hotServer, testName } = {},
) {
  const server = Hapi.server({
    port: customPort,
    host: config.SERVER_HOST,
    routes: {
      files: {
        relativeTo: __dirname + path.sep + "public",
      },
    },
  });

  await server.register(require("@hapi/vision"));
  await server.register(require("@hapi/inert"));

  server.views({
    engines: {
      html: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "templates",
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true,
      },
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async function (request, h) {
      const stats = await loadAll();

      return h.view(appName, {
        sampleSize: config.SAMPLE_SIZE,
        stats: JSON.stringify(Array.from(stats.entries())),
        urls: getHotUrl({ hotVersion, hotServer }),
      });
    },
  });

  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

function getHotUrl({ hotVersion, hotServer } = {}) {
  const urls = {
    script: "",
    style_core: "",
    style_theme_main: "",
    style_theme_horizon: "",
  };

  if (hotServer) {
    urls.script = `${hotServer}/dist/handsontable.full.js`;
    // urls.style_core = `${hotServer}/dist/handsontable.full.css`;
    urls.style_core = `${hotServer}/styles/handsontable.css`;
    urls.style_theme_main = `${hotServer}/styles/ht-theme-main.css`;
    // urls.style_core = `${hotServer}/styles_processed/handsontable.css`;
    // urls.style_theme_main = `${hotServer}/styles_processed/ht-theme-main.css`;
    // urls.style_theme_horizon = `${hotServer}/styles/ht-theme-horizon.css`;
  } else {
    urls.script = `https://cdn.jsdelivr.net/npm/handsontable@${hotVersion}/dist/handsontable.full.js`;
    // urls.style_core = `https://cdn.jsdelivr.net/npm/handsontable@${hotVersion}/dist/handsontable.full.css`;
    urls.style_core = `https://cdn.jsdelivr.net/npm/handsontable@${hotVersion}/styles/handsontable.css`;
    urls.style_theme_main = `https://cdn.jsdelivr.net/npm/handsontable@${hotVersion}/styles/ht-theme-main.css`;
    // urls.style_theme_horizon = `https://cdn.jsdelivr.net/npm/handsontable@${hotVersion}/styles/ht-theme-horizon.css`;
  }

  return urls;
}
