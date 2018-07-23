/**
 * parentContainerExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

function containerExists(routeLevelOne, routeLevelTwo, comp) {
  const containers = fs.readdirSync(
    path.join(
      __dirname,
      `../../src/ui/${routeLevelOne}${routeLevelTwo !== '.' ? '/' + routeLevelTwo : ''}`
    )
  );
  return containers.indexOf(comp) >= 0;
}

module.exports = containerExists;
