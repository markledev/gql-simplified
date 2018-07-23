/**
 * getAllContainers
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

function getAllStoreFeatures() {
  const arr = fs
    .readdirSync(path.join(__dirname, `../../src/store/features`))
    .filter(folder => ['.DS_Store', 'common', 'index.js', 'messages.js'].indexOf(folder) < 0);

  return arr;
}

module.exports = getAllStoreFeatures;
