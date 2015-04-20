
module.exports = {
  prepareEnv: prepareEnv
};

var currentSpec;

function prepareEnv() {
  currentSpec = this;
}
