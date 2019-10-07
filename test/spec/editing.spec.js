const { runSample, openPage } = require('./../runner');
const { waitUntilHotIsInitialized, sleep } = require('./../utils');

describe('editing a cell', () => {
  it('started from the most top-left position', async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    browser.executeScript(`
      hot.selectCell(2, 2);
      hot.scrollViewportTo(20, 20, false, true);
      `);

    await runSample({
      id: 'editing-cell.most-top-left',
      execute: () => {
        browser.actions()
          .sendKeys(protractor.Key.ENTER)
          .perform();
      },
    });
  });

  it('started from the middle position', async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    browser.executeScript(`
      var __rows = parseInt(hot.countRows() / 2, 10);
      var __cols = parseInt(hot.countCols() / 2, 10);

      hot.selectCell(__rows, __cols);
      hot.scrollViewportTo(__rows, __cols, false, true);
      `);

    await runSample({
      id: 'editing-cell.middle',
      execute: () => {
        browser.actions()
          .sendKeys(protractor.Key.ENTER)
          .perform();
      },
    });
  });

  it('started from the bottom-right position', async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    browser.executeScript(`
      var __rows = hot.countRows() - 1;
      var __cols = hot.countCols() - 1;

      hot.selectCell(__rows, __cols);
      hot.scrollViewportTo(__rows, __cols, true, true);
      `);

    await runSample({
      id: 'editing-cell.bottom-right',
      execute: () => {
        browser.actions()
          .sendKeys(protractor.Key.ENTER)
          .sendKeys(protractor.Key.SHIFT)
          .perform();
      },
    });
  });
});
