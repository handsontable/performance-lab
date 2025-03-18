const program = require("caporal");
const semver = require("semver");
const config = require("./config");
const { version: packageVersion, engines } = require("./../package");

const appToServeMap = new Map([
  ["tr", "test-runner"],
  ["bv", "benchmark-viewer"],
]);
const hotVersionRegExp = /^((\d{1,3}\.\d{1,3}\.\d{1,3}|latest)(\-next\-([a-z0-9]){7}\-[0-9]{8})?)$/;

function parseArgs() {
  program
    .version(packageVersion)
    .description("JavaScript performance tests for Handsontable")
    .command(
      "local-server",
      'Run a local server ("test-runner", "tr" or "benchmark-viewer", "bv").',
    )
    .alias("ls")
    .argument(
      "<app_to_serve>",
      'Type of the application to serve ("test-runner" or "benchmark-viewer")',
      /^(test\-runner|tr|benchmark\-viewer|bv)$/,
      "test-runner",
    )
    .option(
      "--hot-version <version>",
      "The Handsontable <version> which will be used for running a benchmark.",
      hotVersionRegExp,
    )
    .option(
      "--hot-server <url>",
      "The server <url> which will be used to serve Handsontable assets from.",
    )
    .action((args, options) => {
      require("./commands/local-server")(
        appToServeMap.get(args.appToServe) ?? args.appToServe,
        parseInt(config.SERVER_PORT, 10) + 1,
        options,
      );
    })
    .command("run", "Run a benchmark.")
    .alias("r")
    .option(
      "--hot-version <version>",
      "The Handsontable <version> which will be used for running a benchmark.",
      hotVersionRegExp,
    )
    .option(
      "--hot-server <url>",
      "The server <url> which will be used to serve Handsontable assets from.",
    )
    .option(
      "--test-name <name>",
      "The <name> name under which the test will be saved.",
    )
    .option("--cpu-throttle-rate <number>", "The <number> CPU throttle rate.")
    .action(async (args, options) => {
      await require("./commands/local-server")(
        "test-runner",
        config.SERVER_PORT,
        options,
      );

      const statsGenerator = require("./commands/protractor")(options);

      await require("./storage").saveByReplace(statsGenerator);

      process.exit(0);
    });

  program.parse(process.argv);
}

(function main() {
  try {
    if (!semver.satisfies(process.versions.node, engines.node)) {
      throw Error(
        `The project requires Node.js${engines.node} for running. You've currently installed version ${process.versions.node}.`,
      );
    }

    parseArgs();
  } catch (ex) {
    /* eslint-disable no-console */
    console.log(ex.message);
    console.log("");
    process.exit(2);
  }
})();
