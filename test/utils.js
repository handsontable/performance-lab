module.exports.waitUntilHotIsInitialized = async function() {
  return await browser.controlFlow().wait(async () => {
    const title = await browser.driver.getTitle();

    return title === 'ready';
  }, 5000);
}

module.exports.sleep = async function(delay = 1000) {
  return new Promise((r) => {
    setTimeout(() => r(), delay)
  })
}
