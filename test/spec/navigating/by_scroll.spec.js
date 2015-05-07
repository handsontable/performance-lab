
var utils = require('./../../../lib/utils');
var SCROLL_STEP = 100;


describe('navigating by scroll (handsontable disabled all plugins)', function() {
  var TEST_DESC = 'disabled_plugins/navigating/';

  // scroll down
  // cell 20, 20
  it('scroll down on main table (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on top overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaY: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on left overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });


  // cell 500, 500
  it('scroll down on main table (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-500-500-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on top overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-500-500-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaY: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on left overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-500-500-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });


  // scroll right
  // cell 20, 20
  it('scroll right on main table (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-20-20-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on top overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-20-20-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on left overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-20-20-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaX: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });

  // cell 500, 500
  it('scroll right on main table (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-500-500-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on top overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-500-500-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on left overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-500-500-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaX: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });
});

//
// ALL MODULES
//
describe('navigating by scroll (handsontable enabled all modules)', function() {
  var TEST_DESC = 'enabled_all_modules/navigating/';

  // scroll down
  // cell 20, 20
  it('scroll down on main table (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on top overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaY: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on left overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-20-20-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });


  // cell 500, 500
  it('scroll down on main table (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-500-500-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on top overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-500-500-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaY: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll down on left overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-down-from-cell-500-500-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollTop;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollTop = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });


  // scroll right
  // cell 20, 20
  it('scroll right on main table (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-20-20-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on top overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-20-20-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on left overlay (from cell 20, 20)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-20-20-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(20, 20);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaX: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });

  // cell 500, 500
  it('scroll right on main table (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-500-500-ht_master',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_master .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on top overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-500-500-ht_clone_top',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_top .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("wtHolder.scrollLeft = (step = step + " + SCROLL_STEP + ");");
        }
      }).then(done, done.fail);
    });
  });

  it('scroll right on left overlay (from cell 500, 500)', function(done) {
    utils.openPage(utils.PAGE_DISABLED_PLUGINS).then(function(url) {
      utils.runBenchmark({
        reportPath: TEST_DESC + 'scroll-right-from-cell-500-500-ht_clone_left',
        url: url,
        onBefore: function() {
          browser.executeScript(
            "hot.selectCell(500, 500);" +
            "window.wtHolder = document.querySelector('.ht_clone_left .wtHolder');" +
            "window.step = document.querySelector('.ht_master .wtHolder').scrollLeft;"
          );
        },
        execute: function() {
          browser.executeScript("$(wtHolder).simulate('wheel', {wheelDeltaX: -" + SCROLL_STEP + " * 9})");
        }
      }).then(done, done.fail);
    });
  });
});
