const { runSample, openPage, SAMPLE_SIZE } = require("./../runner");
const { waitUntilHotIsInitialized, sleep } = require("./../utils");

describe("navigating by arrow key", () => {
  describe("arrow down", () => {
    it("started from the most top-left position", async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript("hot.selectCell(25, 0)");

      await runSample({
        id: "arrow-down.most-top-left",
        execute: () => {
          browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
        },
      });
    });

    it("started from the middle position", async () => {
      await openPage();
      await waitUntilHotIsInitialized();

      browser.executeScript(`
        hot.selectCell(parseInt(hot.countRows() / 2, 10), parseInt(hot.countCols() / 2, 10))
        `);

      await runSample({
        id: "arrow-down.middle",
        execute: () => {
          browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
        },
      });
    });
  });

  // describe("arrow up", () => {
  //   it("started from the most bottom-right position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript(`
  //       var __rows = hot.countRows() - 1;
  //       var __cols = hot.countCols() - 1;

  //       hot.selectCell(__rows, __cols);
  //       hot.scrollViewportTo(__rows, __cols, false, true);
  //       `);

  //     await runSample({
  //       id: "arrow-up.most-bottom-right",
  //       execute: () => {
  //         browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
  //       },
  //     });
  //   });
  // });

  // describe("arrow right", () => {
  //   it("started from the most top-left position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript(`
  //       hot.selectCell(20, 20);
  //       `);

  //     await runSample({
  //       id: "arrow-right.most-top-left",
  //       execute: () => {
  //         browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
  //       },
  //     });
  //   });

  //   it("started from the middle position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript(`
  //       hot.selectCell(parseInt(hot.countRows() / 2, 10), parseInt(hot.countCols() / 2, 10))
  //       `);

  //     await runSample({
  //       id: "arrow-right.middle",
  //       execute: () => {
  //         browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
  //       },
  //     });
  //   });
  // });

  // describe("arrow left", () => {
  //   it("started from the most bottom-right position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript(`
  //       var __rows = hot.countRows() - 1;
  //       var __cols = hot.countCols() - 1;

  //       hot.selectCell(__rows, __cols);
  //       hot.scrollViewportTo(__rows, __cols, true, false);
  //       `);

  //     await runSample({
  //       id: "arrow-left.most-bottom-right",
  //       execute: () => {
  //         browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
  //       },
  //     });
  //   });
  // });

  // describe("arrow down and arrow up", () => {
  //   it("started from the middle position and back to the initial position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript(`
  //       hot.selectCell(parseInt(hot.countRows() / 2, 10), parseInt(hot.countCols() / 2, 10))
  //       `);

  //     let sampleSize = SAMPLE_SIZE;
  //     let currentSampleSize = 0;

  //     await runSample({
  //       id: "arrow-down-up.middle",
  //       execute: () => {
  //         if (currentSampleSize > sampleSize / 2) {
  //           browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
  //           browser.actions().sendKeys(protractor.Key.ARROW_UP).perform();
  //         } else {
  //           browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
  //           browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
  //         }

  //         currentSampleSize++;
  //       },
  //     });
  //   });
  // });

  // describe("page down", () => {
  //   it("started from the most top-left position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript("hot.selectCell(0, 0)");

  //     await runSample({
  //       id: "page-down.most-top-left",
  //       execute: () => {
  //         browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
  //       },
  //     });
  //   });
  // });

  // describe("page down and page up", () => {
  //   it("started from the middle position and back to the initial position", async () => {
  //     await openPage();
  //     await waitUntilHotIsInitialized();

  //     browser.executeScript(`hot.selectCell(0, 0)`);

  //     let sampleSize = SAMPLE_SIZE;
  //     let currentSampleSize = 0;

  //     await runSample({
  //       id: "page-down-up.most-top-left",
  //       execute: () => {
  //         if (currentSampleSize > sampleSize / 2) {
  //           browser.actions().sendKeys(protractor.Key.PAGE_UP).perform();
  //         } else {
  //           browser.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
  //         }

  //         currentSampleSize++;
  //       },
  //     });
  //   });
  // });
});
