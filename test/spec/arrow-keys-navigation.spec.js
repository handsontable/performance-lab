const { runSample, openPage } = require('./../runner');
const { waitUntilHotIsInitialized, sleep } = require('./../utils');

describe('navigating by arrow key', () => {
  describe('arrow down', () => {
    it('started from the most top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript('hot.selectCell(25, 0)');

      await runSample({
        id: 'arrow-down.most-top-left',
        execute: () => {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        },
      });
    });

    it('started from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript('hot.selectCell(500, 500)');

      await runSample({
        id: 'arrow-down.middle',
        execute: () => {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_DOWN);
        },
      });
    });
  });

  describe('arrow up', () => {
    it('started from the most bottom-right position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(979, 979);
        hot.scrollViewportTo(979, 979, false, true);
        `);

      await runSample({
        id: 'arrow-down.most-bottom-right',
        execute: () => {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_UP);
        },
      });
    });
  });

  describe('arrow right', () => {
    it('started from the most top-left position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(20, 20);
        `);

      await runSample({
        id: 'arrow-right.most-top-left',
        execute: () => {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        },
      });
    });

    it('started from the middle position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(500, 500);
        `);

      await runSample({
        id: 'arrow-right.middle',
        execute: () => {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_RIGHT);
        },
      });
    });
  });

  describe('arrow left', () => {
    it('started from the most bottom-right position', async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(979, 979);
        hot.scrollViewportTo(979, 979, true, false);
        `);

      await runSample({
        id: 'arrow-left.most-bottom-right',
        execute: () => {
          $(browser.rootEl).sendKeys(protractor.Key.ARROW_LEFT);
        },
      });
    });
  });
});
