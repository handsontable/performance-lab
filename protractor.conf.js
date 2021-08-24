const path = require('path');

const USE_HEADLESS_MODE = false;

exports.config = {
  directConnect: true,
  chromeDriver: path.resolve('./node_modules/webdriver-manager/selenium/chromedriver_92.0.4515.107'),

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      'args': ['--js-flags=--expose-gc', '--window-size=1300,1000', ...(USE_HEADLESS_MODE ? ['--headless', '--disable-gpu'] : []) ],
      'perfLoggingPrefs': {
        'traceCategories': 'v8,blink.console,devtools.timeline,devtools.timeline.frame,blink.user_timing'
      },
    },
    loggingPrefs: {
      performance: 'ALL',
      browser: 'ALL',
      driver: 'ALL',
    },
  },

  // specs: ['test/config.js', 'test/spec/**/*.spec.js'],
  // specs: ['test/config.js', 'test/spec/view-scrolling.spec.js'],
  // specs: ['test/config.js', 'test/spec/arrow-keys-navigation.spec.js', 'test/spec/editing.spec.js'],
  // specs: ['test/config.js', 'test/spec/arrow-keys-navigation.spec.js', 'test/spec/editing.spec.js', 'test/spec/view-scrolling.spec.js'],
  // specs: ['test/config.js', 'test/spec/arrow-keys-navigation.spec.js'],
  // specs: ['test/config.js', 'test/spec/editing.spec.js'],
  // specs: ['test/config.js', 'test/spec/altering.spec.js'],
  specs: ['test/config.js', 'test/spec/get-cell-meta.spec.js'],
  framework: 'jasmine2',

  onPrepare: function() {
    patchProtractorWait(browser);

    beforeEach(function() {
      patchProtractorWait(browser);
    });
  },

  restartBrowserBetweenTests: true,
  skipSourceMapSupport: true,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1200000
  }
};

function patchProtractorWait(browser) {
  // Tells protractor this isn't an Angular application
  browser.ignoreSynchronization = true;

  // const _get = browser.get;
  // const sleepInterval = process.env.TRAVIS || process.env.JENKINS_URL ? 7000 : 3000;
  //
  // browser.get = function() {
  //   const result = _get.apply(this, arguments);
  //
  //   browser.sleep(sleepInterval);
  //
  //   return result;
  // }
}
