const fs = require('fs');
const path = require('path');
const newQueryGenerator = require('./new-query/index.js');
const newModuleGenerator = require('./new-module/index.js');
const newMutationGenerator = require('./new-mutation/index.js');
const newSubscriptionGenerator = require('./new-subscription/index.js');

module.exports = plop => {
  plop.setGenerator('new-query', newQueryGenerator);
  plop.setGenerator('new-module', newModuleGenerator);
  plop.setGenerator('new-mutation', newMutationGenerator);
  plop.setGenerator('new-subscription', newSubscriptionGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
