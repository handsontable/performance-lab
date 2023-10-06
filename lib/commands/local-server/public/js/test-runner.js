/**
 * Parse Handsontable settings from query string
 *
 * @returns {Object}
 */
function getHotSettings() {
  var settings = parseQueryString(location.search.substr(1));

  for (var i in settings) {
    if (!settings.hasOwnProperty(i)) {
      continue;
    }
    if (i === "data") {
      settings[i] = Handsontable.helper.createSpreadsheetData(
        settings[i].split(",")[0],
        settings[i].split(",")[1],
      );
    } else {
      settings[i] = parseSetting(settings[i]);
    }
  }
  if (!settings.data) {
    settings.data = Handsontable.helper.createSpreadsheetData(1000, 1000);
  }

  return settings;
}

/**
 * Parse query string to object
 *
 * @param {String} queryString
 * @returns {Object}
 */
function parseQueryString(queryString) {
  var params = {},
    queries,
    temp,
    i,
    l;

  queries = queryString.split("&");
  l = queries.length;

  for (i = 0; i < l; i++) {
    temp = queries[i].split("=");
    params[temp[0]] = temp[1];
  }

  return params;
}

/**
 * Parse single Handsontable setting
 *
 * @param {*} value
 * @returns {*}
 */
function parseSetting(value) {
  try {
    value = JSON.parse(value);
  } catch (ex) {}

  return value;
}
