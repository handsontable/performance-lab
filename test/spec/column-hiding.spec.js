const { runSample, openPage } = require('./../runner');
const { waitUntilHotIsInitialized, sleep } = require('./../utils');

describe('column hidding', () => {
  it('started creating row', async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    browser.executeScript(`
      window.__columnIncrement = 0;
      `);

    await runSample({
      id: 'column-hidding.creating-row-top',
      execute: () => {
        browser.executeScript(`
          hot.getPlugin('trimRows').trimRow(++ __columnIncrement);
          hot.render();
          `);
        // browser.executeScript(`hot.alter('insert_col', 1, 5)`);

          // browser.executeScript(`wtHolder.scrollTop = (step = step + ${SCROLL_STEP});`);
      },
    });
  });
});
