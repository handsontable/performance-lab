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
        hot.selectCell(20, 20);
        ${wtHolderInjection('master', 'scrollTop')}
        `);

      await runSample({
        id: 'scroll-down.master.most-top-left',
        execute: () => {
          browser.executeScript(`wtHolder.scrollTop = (step = step + ${SCROLL_STEP});`);
        },
      });
    });

    it('scroll down starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(500, 500);
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
        hot.selectCell(20, 20);
        ${wtHolderInjection('master', 'scrollLeft')}
        `);

      await runSample({
        id: 'scroll-right.master.top-left',
        execute: () => {
          browser.executeScript(`wtHolder.scrollLeft = (step = step + ${SCROLL_STEP});`);
        },
      });
    });

    it('scroll right starting from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(500, 500);
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

  describe('top overlay', () => {
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
        hot.selectCell(500, 500);
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
        hot.selectCell(500, 500);
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

  describe('left overlay', () => {
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
        hot.selectCell(500, 500);
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
        hot.selectCell(500, 500);
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
