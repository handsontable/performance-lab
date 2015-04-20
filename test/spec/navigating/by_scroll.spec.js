
var utils = require('./../../../lib/utils');
var SCROLL_STEP = 100;


describe('navigating by changing scrollTop (handsontable disabled all plugins)', function() {
  var TEST_DESC = 'disabled_plugins/navigating/';

  it('scroll down', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20',
        url: url,
        onBefore: function() {
          browser.executeScript("window.step = 0;");
        },
        execute: function() {
          browser.executeScript("document.querySelector('.wtHolder').scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });
});

describe('navigating by changing scrollTop (handsontable enabled all modules)', function() {
  var TEST_DESC = 'enabled_all_modules/navigating/';

  it('scroll down', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20',
        url: url,
        onBefore: function() {
          browser.executeScript("window.step = 0;");
        },
        execute: function() {
          browser.executeScript("document.querySelector('.wtHolder').scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });
});
