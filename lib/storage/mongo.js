const MongoClient = require('mongodb').MongoClient;
const config = require('./../config');

const dbName = config.DB_NAME;

let currentConnection = null;

async function connect() {
  if (currentConnection === null) {
    currentConnection = await MongoClient.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  return currentConnection;
}

async function close() {
  if (currentConnection !== null) {
    currentConnection.close();
    currentConnection = null;
  }
}

async function insertMany(collectionName, items) {
  const collection = currentConnection.db(dbName).collection(collectionName);

  const queryResult = await collection.insertMany(items);

  return queryResult;
}

async function findAll(collectionName) {
  const collections = await currentConnection.db(dbName).collections();
  const queryResult = new Map();

  for (collection of collections) {
    const collectionName = collection.collectionName;

    if (!queryResult.has(collectionName)) {
      queryResult.set(collectionName, []);
    }

    const collectionResults = await collection.find().toArray();

    queryResult.get(collectionName).push(...collectionResults);
  }

  return queryResult;
}

async function dropIfExists(collectionName) {
  let queryResult = null;

  if (await isCollectionExists(collectionName)) {
    const collection = currentConnection.db(dbName).collection(collectionName);

    queryResult = await collection.drop();
  }

  return queryResult;
}

async function isCollectionExists(collectionName) {
  const collections = await currentConnection.db(dbName).listCollections().toArray();

  return collections.some((collection) => collection.name === collectionName);
}

module.exports = {
  isCollectionExists,
  dropIfExists,
  findAll,
  insertMany,
  close,
  connect,
}
