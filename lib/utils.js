
var benchpress = require('benchpress');

module.exports = {
  PAGE_DISABLED_PLUGINS: 'disabled_plugins.html',
  PAGE_ENABLED_ALL_MODULES: 'enabled_all_modules.html',
  openPage: openPage,
  patchProtractorWait: patchProtractorWait,
  runBenchmark: runBenchmark
};

/**
 * Open page
 *
 * @param {String} page
 * @param {Object} hotSettings
 * @returns {Promise}
 */
function openPage(page, hotSettings) {
  var urlParams = [], url;

  hotSettings = hotSettings || {};

  Object.keys(hotSettings).forEach(function(paramName) {
    urlParams.push(paramName + '=' + hotSettings[paramName]);
  });

  url = BASE_URL + page + '?' + urlParams.join('&');

  return new Promise(function(resolve, reject) {
    browser.get(encodeURI(url));

    setTimeout(function() {
      resolve(url);
    }, 500);
  });
}

/**
 * Run benchmark
 *
 * @param {Object} config
 * @returns {*}
 */
function runBenchmark(config) {
  if (config.onBefore) {
    config.onBefore();
  }
  config.bindings = [
    benchpress.bind(benchpress.Options.SAMPLE_DESCRIPTION).toValue({
      url: config.url
    })
  ];
  config.id = config.reportPath;

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(benchpressRunner.sample(config));
    }, 50);
  });
}

function patchProtractorWait(browser) {
  // Tells protractor this isn't an Angular 1 application
  browser.ignoreSynchronization = true;
  //protractor.promise.fulfilled()

  var _get = browser.get;
  var sleepInterval = process.env.TRAVIS || process.env.JENKINS_URL ? 7000 : 3000;

  browser.get = function() {
    var result = _get.apply(this, arguments);

    browser.sleep(sleepInterval);

    return result;
  }
}
