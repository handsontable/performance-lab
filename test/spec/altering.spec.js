const { runSample, openPage } = require("./../runner");
const { waitUntilHotIsInitialized, sleep } = require("./../utils");

describe("altering a table", () => {
  it("started creating row", async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    await runSample({
      id: "altering.creating-row-top",
      execute: () => {
        browser.executeScript(`hot.alter('insert_row_above', 1, 5)`);
      },
    });
  });

  it("started creating column", async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    await runSample({
      id: "altering.creating-column-top",
      execute: () => {
        browser.executeScript(`hot.alter('insert_col_start', 1, 5)`);
      },
    });
  });

  it("started loading new data", async () => {
    await openPage();
    await waitUntilHotIsInitialized();

    await runSample({
      id: "altering.loading-data",
      execute: () => {
        browser.executeScript(
          `hot.loadData(Handsontable.helper.createSpreadsheetData(400, 100))`,
        );
      },
    });
  });
});
