const origIt = global.it;

global.it = function (name, cb) {
  origIt.call(this, name, function (done) {
    cb().then(done, done.fail);
  });
};
