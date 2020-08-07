const { runSample, openPage } = require('./../runner');
const { waitUntilHotIsInitialized, sleep } = require('./../utils');
const SCROLL_STEP = 50;

const wtHolderInjection = (overlay = 'master', scrollType) => `
  window.wtHolder = document.querySelector('.ht_${overlay} .wtHolder');
  window.step = document.querySelector('.ht_master .wtHolder').${scrollType};
  `;

describe('navigating by scroll', () => {
  describe('master table', () => {
    it('scroll down starting from the most top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        ${wtHolderInjection('master', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.master.most-top-left',
        execute: () => {
          browser.executeScript(`wtHolder.scrollTop = (step = step + ${SCROLL_STEP});`);
        },
      });
    });

    xit('scroll down starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        var __rows = parseInt(hot.countRows() / 2, 10);
        var __cols = parseInt(hot.countCols() / 2, 10);

        hot.selectCell(__rows, __cols);
        ${wtHolderInjection('master', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.master.middle',
        execute: () => {
          browser.executeScript(`wtHolder.scrollTop = (step = step + ${SCROLL_STEP});`);
        },
      });
    });

    it('scroll right starting from the top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        ${wtHolderInjection('master', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.master.top-left',
        execute: () => {
          browser.executeScript(`wtHolder.scrollLeft = (step = step + ${SCROLL_STEP});`);
        },
      });
    });

    xit('scroll right starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        var __rows = parseInt(hot.countRows() / 2, 10);
        var __cols = parseInt(hot.countCols() / 2, 10);

        hot.selectCell(__rows, __cols);
        ${wtHolderInjection('master', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.master.middle',
        execute: () => {
          browser.executeScript(`wtHolder.scrollLeft = (step = step + ${SCROLL_STEP});`);
        },
      });
    });
  });

  xdescribe('top overlay', () => {
    it('scroll down starting from the most top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(20, 20);
        ${wtHolderInjection('clone_top', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.top-overlay.most-top-left',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaY': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });

    it('scroll down starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        var __rows = parseInt(hot.countRows() / 2, 10);
        var __cols = parseInt(hot.countCols() / 2, 10);

        hot.selectCell(__rows, __cols);
        ${wtHolderInjection('clone_top', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.top-overlay.middle',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaY': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });

    it('scroll right starting from the top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(20, 20);
        ${wtHolderInjection('clone_top', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.top-overlay.top-left',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaX': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });

    it('scroll right starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        var __rows = parseInt(hot.countRows() / 2, 10);
        var __cols = parseInt(hot.countCols() / 2, 10);

        hot.selectCell(__rows, __cols);
        ${wtHolderInjection('clone_top', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.top-overlay.top-left',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaX': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });
  });

  xdescribe('left overlay', () => {
    it('scroll down starting from the most top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(20, 20);
        ${wtHolderInjection('clone_left', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.left-overlay.most-top-left',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaY': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });

    it('scroll down starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        var __rows = parseInt(hot.countRows() / 2, 10);
        var __cols = parseInt(hot.countCols() / 2, 10);

        hot.selectCell(__rows, __cols);
        ${wtHolderInjection('clone_left', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.left-overlay.most-top-left',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaY': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });

    it('scroll right starting from the top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(20, 20);
        ${wtHolderInjection('clone_left', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.left-overlay.most-top-left',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaX': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });

    it('scroll right starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        var __rows = parseInt(hot.countRows() / 2, 10);
        var __cols = parseInt(hot.countCols() / 2, 10);

        hot.selectCell(__rows, __cols);
        ${wtHolderInjection('clone_left', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.left-overlay.middle',
        execute: () => {
          browser.executeScript(`wtHolder.dispatchEvent(new WheelEvent('wheel', {'deltaX': ${SCROLL_STEP / 2.5}, 'deltaMode': 0}));`);
        },
      });
    });
  });
});
