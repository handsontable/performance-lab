const { fork } = require('child_process');

module.exports = function ({ hotVersion = 'latest', cpuThrottleRate = 0, hotServer, testName } = {}) {
  console.log('Running protractor...');

  const env = process.env;

  env.HOT_VERSION = testName ? testName : (hotServer ? 'develop' : hotVersion);
  env.CPU_THROTTLE_RATE = cpuThrottleRate;
  const childProcess = fork('./node_modules/.bin/protractor', ['protractor.conf.js'], { env });

  let isDone = false;
  let promiseResolver = null;
  let pendingPromise = new Promise((resolve) => {
    promiseResolver = resolve;
  });

  childProcess.on('exit', function(code) {
    promiseResolver(null);
    isDone = true;
  });
  childProcess.on('message', function(sampleResults) {
    const samples = JSON.parse(sampleResults);

    promiseResolver(samples);
    pendingPromise = new Promise((resolve) => {
      promiseResolver = resolve;
    });
  });

  return async function* _resultsGenerator() {
    while (true) {
      if (isDone) {
        break;
      }

      yield pendingPromise;
    }
  }
}
