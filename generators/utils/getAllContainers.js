/**
 * getAllContainers
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

function getAllContainers(parentContainer) {
  const arr = fs
    .readdirSync(path.join(__dirname, `../../src/ui/${parentContainer}`))
    .filter(folder => ['.DS_Store', 'common', 'index.js', 'messages.js'].indexOf(folder) < 0);
  arr.unshift('.');
  return arr;
}

module.exports = getAllContainers;
