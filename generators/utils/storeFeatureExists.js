/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const storeFeatures = fs.readdirSync(path.join(__dirname, '../../src/store/features'));

function storeFeatureExists(feature) {
  return storeFeatures.indexOf(feature) >= 0;
}

module.exports = storeFeatureExists;
