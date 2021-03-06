/**
 * getAllParentContainers
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

function getAllParentContainers() {
  const arr = fs
    .readdirSync(path.join(__dirname, '../../src'))
    .filter(folder => ['.DS_Store', 'common', 'pubsub.js', 'resolvers.js', 'schema.js'].indexOf(folder) < 0);

  // arr.unshift('.');
  return arr;
}

module.exports = getAllParentContainers;
