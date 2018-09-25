/**
 * parentContainerExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const parentContainers = fs.readdirSync(path.join(__dirname, '../../src'));

function parentContainerExists(comp) {
  return parentContainers.indexOf(comp) >= 0;
}

module.exports = parentContainerExists;
