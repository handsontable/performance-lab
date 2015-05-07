
require('traceur/bin/traceur-runtime.js');

var benchpress = require('benchpress/benchpress');
var dirTree = require('dir-tree');
var fs = require('fs-extra');
var utils = require('./lib/utils');


exports.config = {
  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // Important for benchpress to get timeline data from the browser
      'args': ['--js-flags=--expose-gc'],
      'perfLoggingPrefs': {
        'traceCategories': 'blink.console,disabled-by-default-devtools.timeline'
      },
      'mobileEmulation': {
        'deviceMetrics': {
          'width': 600,
          'height': 960,
          'pixelRatio': 2
        }
      }
    },
    loggingPrefs: {
      performance: 'ALL',
      browser: 'ALL'
    }
  },

  specs: ['test/spec/**/*.spec.js'],
  framework: 'jasmine2',

  onPrepare: function() {
    utils.patchProtractorWait(browser);

    // open a new browser for every benchmark
    var originalBrowser = browser;

    beforeEach(function() {
      global.browser = originalBrowser.forkNewDriverInstance();
      utils.patchProtractorWait(global.browser);
      global.element = global.browser.element;
      global.$ = global.browser.$;
      global.$$ = global.browser.$$;
    });
    afterEach(function() {
      global.browser.quit();
      global.browser = originalBrowser;
    });
  },

  onComplete: function() {
    dirTree(RESULTS_DIR).then(function (tree) {
      writeFile(RESULTS_DIR + '/map.json', JSON.stringify(tree));
    });
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1200000
  }
};

/**
 * Register benchpress runner
 */
function registerBenchpressRunner() {
  var
    bindings = [
      benchpress.SeleniumWebDriverAdapter.PROTRACTOR_BINDINGS,
      benchpress.bind(benchpress.Options.FORCE_GC).toValue(false),
      benchpress.bind(benchpress.Options.DEFAULT_DESCRIPTION).toValue({
        'lang': 'js'
      }),
      benchpress.JsonFileReporter.BINDINGS,
      benchpress.bind(benchpress.JsonFileReporter.PATH).toValue(''),
      benchpress.Validator.bindTo(benchpress.RegressionSlopeValidator),
      benchpress.bind(benchpress.RegressionSlopeValidator.SAMPLE_SIZE).toValue(SAMPLE_SIZE),
      benchpress.MultiReporter.createBindings([
        benchpress.ConsoleReporter,
        benchpress.JsonFileReporter
      ])
    ];

  benchpress.Options.DEFAULT_BINDINGS.push(
    benchpress.bind(benchpress.Options.WRITE_FILE).toValue(function(filename, content) {
      var dirs;

      filename = (RESULTS_DIR + '/' + hotVersion + '-' + filename.substr(1));
      dirs = filename.split('/');

      if (dirs.length > 1) {
        return makeDirs(dirs.reverse().slice(1).reverse().join('/') + '/').then(function() {
            return writeFile(filename, content);
        });
      }

      return writeFile(filename, content);
    })
  );

  return new benchpress.Runner(bindings);
}

function writeFile(filename, content) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filename, content, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  })
}

function makeDirs(path) {
  return new Promise(function(resolve, reject) {
    fs.mkdirs(path, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  });
}

process.on('message', function(data) {
  var toExport = data.toExport;

  Object.keys(toExport).forEach(function(key) {
    global[key] = toExport[key];
  });
  global.benchpressRunner = registerBenchpressRunner();
});
