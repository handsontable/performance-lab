const config = require("./../lib/config");
const fs = require("fs-extra");
const path = require("path");

const HOT_VERSION = process.env.HOT_VERSION;

exports.SAMPLE_SIZE = config.SAMPLE_SIZE;

exports.runSample = async function (benchpressConfig) {
  const benchpress = await import("@angular/benchpress");

  const bindings = [
    benchpress.SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS,
    // { provide: benchpress.Options.FORCE_GC, useValue: true },
    {
      provide: benchpress.RegressionSlopeValidator.SAMPLE_SIZE,
      useValue: benchpressConfig.SAMPLE_SIZE
        ? benchpressConfig.SAMPLE_SIZE
        : config.SAMPLE_SIZE,
    },
    benchpress.JsonFileReporter.PROVIDERS,
    benchpress.MultiReporter.provideWith([
      benchpress.ConsoleReporter,
      benchpress.JsonFileReporter,
    ]),
  ];

  benchpress.Options.DEFAULT_PROVIDERS.push({
    provide: benchpress.Options.WRITE_FILE,
    useValue: (filename, content) => void process.send(content),
  });

  const runner = new benchpress.Runner(bindings);

  benchpressConfig.providers = [
    {
      provide: benchpress.Options.SAMPLE_DESCRIPTION,
      useValue: { hotVersion: HOT_VERSION },
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(runner.sample(benchpressConfig)), 50);
  });
};

exports.openPage = async function (hotSettings) {
  const urlParams = [];

  hotSettings = hotSettings || {};

  Object.keys(hotSettings).forEach((paramName) => {
    urlParams.push(paramName + "=" + hotSettings[paramName]);
  });

  const url = `http://${config.SERVER_HOST}:${
    config.SERVER_PORT
  }?${urlParams.join("&")}`;

  return new Promise((resolve) => {
    browser.get(encodeURI(url));

    // setTimeout(() => resolve(url), 500);
    resolve(url);
  });
};
