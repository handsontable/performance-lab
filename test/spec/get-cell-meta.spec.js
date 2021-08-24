const { runSample, openPage, SAMPLE_SIZE } = require('./../runner');
const { waitUntilHotIsInitialized, sleep } = require('./../utils');

describe('getCellMeta()', () => {
  it('get cell meta', async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    await runSample({
      id: 'get-cell-meta.get',
      execute: () => {
        browser.actions()
          .sendKeys(protractor.Key.ENTER)
          .perform();
      },
    });
  });
});
