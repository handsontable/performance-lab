
var utils = require('./../../../lib/utils');

//
// DISABLED ALL MODULES
//
describe('navigating by arrow keys (disabled all plugins)', function() {
  var TEST_DESC = 'disabled_plugins/navigating/';

  it('arrow down (started from cell 20,20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-20-20',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(20, 20);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow down (started from cell 500,500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-500-500',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(500, 500);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow up (started from cell 979,979)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-up-from-cell-979-979',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(979, 979);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_UP);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow right (started from cell 20,20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-right-from-cell-20-20',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(20, 20);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow right (started from cell 500,500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-right-from-cell-500-500',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(500, 500);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow left (started from cell 979,979)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-left-from-cell-979-979',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(979, 979);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_LEFT);
        }
      }).then(done, done.fail);
    });
  });
});
//
//
// ALL MODULES
//
describe('navigating by arrow keys (enabled all modules)', function() {
  var TEST_DESC = 'enabled_all_modules/navigating/';

  it('arrow down (started from cell 20,20)', function(done) {
    utils.openPage(utils.PAGE_ENABLED_ALL_MODULES).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-20-20',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(20, 20);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow down (started from cell 500,500)', function(done) {
    utils.openPage(utils.PAGE_ENABLED_ALL_MODULES).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-500-500',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(500, 500);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow up (started from cell 979,979)', function(done) {
    utils.openPage(utils.PAGE_ENABLED_ALL_MODULES).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-979-979',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(979, 979);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_UP);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow right (started from cell 20,20)', function(done) {
    utils.openPage(utils.PAGE_ENABLED_ALL_MODULES).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-right-from-cell-20-20',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(20, 20);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow right (started from cell 500,500)', function(done) {
    utils.openPage(utils.PAGE_ENABLED_ALL_MODULES).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-right-from-cell-500-500',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(500, 500);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow left (started from cell 979,979)', function(done) {
    utils.openPage(utils.PAGE_ENABLED_ALL_MODULES).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-left-from-cell-979-979',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(979, 979);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_LEFT);
        }
      }).then(done, done.fail);
    });
  });
});

//
// ALL MODULES (rowHeaders: true, colsHeader: true)
//
describe('navigating by arrow keys (all modules) - rowHeaders: true, colsHeader: true', function() {
  var TEST_DESC = 'disabled_plugins/navigating/';
  var hotOptions = {
    rowHeaders: true,
    colHeaders: true
  };

  it('arrow down (started from cell 20,20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS, hotOptions).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-20-20-rowH-colsH',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(20, 20);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow down (started from cell 500,500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS, hotOptions).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-down-from-cell-500-500-rowH-colsH',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(500, 500);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow up (started from cell 979,979)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS, hotOptions).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-up-from-cell-979-979-rowH-colsH',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(979, 979);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_UP);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow right (started from cell 20,20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS, hotOptions).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-right-from-cell-20-20-rowH-colsH',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(20, 20);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow right (started from cell 500,500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS, hotOptions).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-right-from-cell-500-500-rowH-colsH',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(500, 500);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        }
      }).then(done, done.fail);
    });
  });

  it('arrow left (started from cell 979,979)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS, hotOptions).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'arrow-left-from-cell-979-979-rowH-colsH',
        url: url,
        onBefore: function() {
          browser.executeScript("hot.selectCell(979, 979);");
        },
        execute: function() {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_LEFT);
        }
      }).then(done, done.fail);
    });
  });
});
