const fs = require('fs');
const path = require('path');
const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const routeContainerGenerator = require('./routeContainer/index.js');
const storeFeatureGenerator = require('./storeFeature/index.js');
const graphQlContainerGenerator = require('./graphql-container/index.js');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('graphql-container', graphQlContainerGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('route-container', routeContainerGenerator);
  plop.setGenerator('store-feature', storeFeatureGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
