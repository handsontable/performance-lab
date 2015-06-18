
var argv = require('minimist')(process.argv.slice(2));
var dirTree = require('dir-tree');
var fs = require('fs-extra');
var hotBuilder = require('hot-builder');
var httpServer = require('http-server');
var merge = require('merge');
var path = require('path');
var Promise = require('promise');

var TESTS_DIR = 'test';
var RESULTS_DIR = 'benchmark/results';
var SAMPLE_SIZE = 100;
var SERVER_HOST = 'localhost';
var SERVER_PORT = '8080';

var BASE_URL = 'http://' + SERVER_HOST + ':' + SERVER_PORT + '/';
var hotVersion = null;
var hotBranch = argv['hot-branch'];
var runServer = argv['server'];
var genMapFile = argv['gen-map-file'];

if (runServer) {
  console.log('Running HTTP server (http://' + SERVER_HOST + ':' + 8080 + ')...');
  runHttpServer();

  return;
}
if (genMapFile) {
  console.log('Generating map file...');

  new Promise(function(resolve, reject) {
    fs.mkdirs(RESULTS_DIR, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  }).then(function() {
      return dirTree(RESULTS_DIR);

  }).then(function(tree) {
      return new Promise(function(resolve, reject) {
        fs.writeFile(path.resolve(RESULTS_DIR + '/map.json'), JSON.stringify(tree), function(err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
  }).then(function() {
      console.log('Generated map file in ' + RESULTS_DIR + '/map.json');
  }).catch(function(error) {
      console.error('Error generating map ->', error);
  });

  return;
}

buildHandsontable({
  hotBranch: hotBranch,
  outputDir: TESTS_DIR + '/public/lib/handsontable/disabled_plugins',
  include: ['SheetClip', 'autoResize', 'copyPaste', 'jsonpatch'],
  includeTypes: [] // without plugins
}).then(function() {
  return buildHandsontable({
    outputDir: TESTS_DIR + '/public/lib/handsontable/enabled_all_modules',
    includeTypes: ['all'] // all modules
  });
}).then(function(builder) {
  hotVersion = builder.entryFile.getFile('handsontable').package.version;

  if (hotBranch && ['latest', 'master', 'link'].indexOf(hotBranch) === -1) {
    hotVersion = hotBranch.replace(/\//g, '-');
  }
  fs.ensureDirSync('./' + RESULTS_DIR);

  runHttpServer();
  runCmd('./node_modules/.bin/protractor', ['protractor.conf.js']);
}).catch(function(error) {
  console.error(error.message);
});

/**
 * Build handsontable
 *
 * @returns {Promise}
 */
function buildHandsontable(options) {
  var defaultOptions = {
      disableUI: true,
      includeTypes: [],
      minify: false
    };

  options = merge(defaultOptions, options);

  return new Promise(function(resolve, reject) {
    var builder = new hotBuilder(null, options);

    builder.on('complete', function() {
      resolve(builder);
    });
    builder.on('error', reject);
  });
}

/**
 * Run HTTP Server
 */
function runHttpServer() {
  httpServer.createServer({
    showDir: false,
    root: './' + TESTS_DIR + '/public'
  }).listen(SERVER_PORT, SERVER_HOST);
}

/**
 * Run shell command
 *
 * @param {String} cmd
 * @param {Array} args
 */
function runCmd(cmd, args) {
  var
    fork = require('child_process').fork,
    toExport = {},
    child;

  toExport.BASE_URL = BASE_URL;
  toExport.TESTS_DIR = TESTS_DIR;
  toExport.RESULTS_DIR = RESULTS_DIR;
  toExport.SAMPLE_SIZE = SAMPLE_SIZE;
  toExport.SERVER_HOST = SERVER_HOST;
  toExport.SERVER_PORT = SERVER_PORT;
  toExport.hotVersion = hotVersion;

  child = fork(cmd, args);
  child.send({
    toExport: toExport
  });
  child.on('exit', function() {
    process.exit(0);
  });
}
