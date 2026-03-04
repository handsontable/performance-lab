# Performance Lab

JavaScript performance tests for Handsontable.

## Install

Requires Node.js 20 or higher.

Install dependencies:

```sh
$ npm install
```

Results are stored in MongoDB. With [Docker](https://www.docker.com/) and [docker-compose](https://github.com/docker/compose) you can start the required services with:

```sh
docker-compose -f docker/docker-compose.yml up
```

## Run It

Run performance tests and persist results to the database:

```sh
$ ./bin/hot-perf run
```

or

```sh
$ npm run start
```

Tests live in `test/spec`. Each spec sets up Handsontable and runs a measured block repeatedly (see `SAMPLE_SIZE` in `lib/config.js`). After each run, metrics are collected; when the number of iterations reaches `SAMPLE_SIZE`, the result is written to the database.

To inspect reports, start the benchmark viewer:

```sh
$ ./bin/hot-perf local-server benchmark-viewer
```

The viewer lets you compare results across Handsontable versions and test cases.

## Usage

##### `./bin/hot-perf run` (or `./bin/hot-perf r`)

Runs the full benchmark suite from `test/spec` and saves results to the database.

##### `./bin/hot-perf local-server benchmark-viewer` (or `./bin/hot-perf ls bv`)

Starts a local server for viewing saved benchmark results.

Arguments:

- `test-runner` (or `tr`) — Serves the test-runner page used by Protractor to execute benchmarks.
- `benchmark-viewer` (or `bv`) — Serves the page for viewing and comparing results from the `run` command.

### Global options

- **`--hot-version`** — Handsontable version to test. Must be available on [jsDelivr](https://www.jsdelivr.com/). Defaults to `latest`. Accepts:
  - Exact semver: `--hot-version=6.2.2`
  - Tag: `--hot-version=latest`, `--hot-version=rc`, `--hot-version=experimental`
  - Prerelease versions: `--hot-version=17.0.0-rc12`, `--hot-version=17.0.0-beta.3`, `--hot-version=17.0.0-alpha`. Use a specific prerelease (e.g. `17.0.0-rc12`) to pin the build; the tag `latest` resolves to the current stable release.
- **`--hot-server`** — URL of a server that serves Handsontable assets (e.g. `--hot-server=http://localhost:8082`). When set, assets are loaded from that host (e.g. `http://localhost:8082/dist/handsontable.full.css`) instead of the CDN.
- **`--test-name`** — Label for this run in the database (e.g. `--test-name=my-feature`). If the name already exists, existing results are overwritten.
- **`--cpu-throttle-rate`** — Browser CPU throttle multiplier. Slows the simulated CPU to surface performance differences that are hard to see on fast hardware. A value of `4` is a common choice, e.g. `--cpu-throttle-rate=4`.

## License

[MIT License](https://opensource.org/licenses/MIT)
