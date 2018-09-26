/**
 * Container Generator
 */
const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');

const componentExists = require('../utils/componentExists');
const containerExists = require('../utils/containerExists');
const getAllParentContainers = require('../utils/getAllParentContainers');
const getAllContainers = require('../utils/getAllContainers');
const getAllStoreFeatures = require('../utils/getAllStoreFeatures');
const generateNewRouteTemplates = require('../utils/generateNewRouteTemplates');

module.exports = {
  description: 'Add new graphql subscription',
  prompts: [
    {
      type: 'list',
      name: 'routeLevelOne',
      message: 'Select the module where you want to put the subscription',
      choices: () => getAllParentContainers(),
    },
    {
      type: 'input',
      name: 'subscriptionName',
      message: 'What should this subscription be called?',
      default: 'statusChange',
      validate: (value, data) => {
        if (/.+/.test(value)) {
          return containerExists(data.routeLevelOne, value)
            ? 'A subscription with this name already exists in this module'
            : true;
        }

        return 'The name is required';
      },
    }
  ],
  actions: data => {
    const actions = [];
    /*-- ADDING subscription_RESOLVER FILE --*/
    actions.push({
      type: 'add',
      path: `../src/{{camelCase routeLevelOne}}/subscriptions/{{camelCase subscriptionName}}.js`,
      templateFile: './new-subscription/subscription-resolver.hbs',
      abortOnFail: true,
    });

    /* INSERT import statement @ <routeLevelOne>/subscriptions/index.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/subscriptions/index.js`,
      pattern: '// import_new_subscription (Do not modify/delete this line)',
      templateFile: './new-subscription/import-new-subscription.hbs',
      abortOnFail: true,
    });

    /* INSERT key and value inside subscription Object @ <routeLevelOne>/subscriptions/index.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/subscriptions/index.js`,
      pattern: '// add_new_subscription (Do not modify/delete this line)',
      templateFile: './new-subscription/add-new-subscription.hbs',
      abortOnFail: true,
    });

    /* INSERT model definition @ <routeLevelOne>/model.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/models.js`,
      pattern: '# new_subscription (Do not remove this line)',
      templateFile: './new-subscription/new-subscription-in-model.hbs',
      abortOnFail: true,
    });

    return actions;
  },
};
