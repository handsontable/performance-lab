const { connect, close, insertMany, findAll, dropIfExists } = require('./mongo');
const axios = require('axios');

module.exports.saveByReplace = async function(statsGenerator) {
  const stats = statsGenerator();
  const collections = new Map();
  let hotVersion;

  for await (const stat of stats) {
    if (stat === null) {
      continue;
    }
    const { id, metrics, description } = stat.description;
    const samples = stat.completeSample;

    hotVersion = description.hotVersion;

    // Convert "latest" tag to specific semver value
    if (hotVersion === 'latest') {
      const response = await axios.get('https://api.cdnjs.com/libraries/handsontable?fields=version');
      const data = response.data;

      hotVersion = data.version;
    }

    hotVersion = hotVersion.replace(/\./g, '_');

    if (!collections.has(hotVersion)) {
      collections.set(hotVersion, []);
    }

    collections.get(hotVersion).push({
      id,
      metrics,
      samples,
    });
  }

  await connect();
  await dropIfExists(hotVersion);

  for (const [name, items] of collections) {
    await insertMany(name, items);
  }

  await close();
}

module.exports.loadAll = async function() {
  await connect();
  const results = await findAll();
  await close();

  return results;
}
