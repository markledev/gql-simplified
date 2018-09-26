/**
 * Graphql module Generator
 */
const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');

const moduleExists = require('../utils/moduleExists');
const containerExists = require('../utils/containerExists');
const getAllParentContainers = require('../utils/getAllParentContainers');
const getAllContainers = require('../utils/getAllContainers');
const getAllStoreFeatures = require('../utils/getAllStoreFeatures');
const generateNewRouteTemplates = require('../utils/generateNewRouteTemplates');

module.exports = {
  description: 'Add new graphql module with new query, mutation and subscription',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of new module?',
      validate: (value, data) => {
        if (/.+/.test(value)) {
          return moduleExists(value)
            ? 'A module with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'firstQuery',
      message: 'What is the name of first query?',
    },
    {
      type: 'input',
      name: 'firstMutation',
      message: 'What is the name of first mutation?',
    },
    {
      type: 'input',
      name: 'firstSub',
      message: 'What is the name of first subscription?',
    },
  ],
  actions: data => {
    const actions = [];

    /* CREATE new <moduleName>/mutations/index.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/mutations/index.js`,
      templateFile: './new-module/mutations-index.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/mutations/<firstMutation>.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/mutations/{{camelCase firstMutation}}.js`,
      templateFile: './new-module/mutations-firstMutation.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/queries/index.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/queries/index.js`,
      templateFile: './new-module/queries-index.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/queries/<firstQuery>.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/queries/{{camelCase firstQuery}}.js`,
      templateFile: './new-module/queries-firstQuery.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/subscriptions/index.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/subscriptions/index.js`,
      templateFile: './new-module/subscriptions-index.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/subscriptions/<firstSub>.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/subscriptions/{{camelCase firstSub}}.js`,
      templateFile: './new-module/subscriptions-firstSub.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/resolvers.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/resolvers.js`,
      templateFile: './new-module/resolvers.hbs',
      abortOnFail: true,
    });

    /* CREATE new <moduleName>/models.js */
    actions.push({
      type: 'add',
      path: `../src/{{camelCase moduleName}}/models.js`,
      templateFile: './new-module/models.hbs',
      abortOnFail: true,
    });

    /* INSERT new schema in ./schema.js */
    actions.push({
      type: 'modify',
      path: `../src/schema.js`,
      pattern: '// import-new-schema (Do not remove/modify this line)',
      templateFile: './new-module/import-new-schema.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: `../src/schema.js`,
      pattern: '// add-new-schema (Do not remove/modify this line)',
      templateFile: './new-module/add-new-schema.hbs',
      abortOnFail: true,
    });

    /* INSERT new resolver in ./resolver.js */
    actions.push({
      type: 'modify',
      path: `../src/resolvers.js`,
      pattern: '// import-new-resolver (Do not remove/modify this line)',
      templateFile: './new-module/import-new-resolver.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: `../src/schema.js`,
      pattern: '// add-new-resolver (Do not remove/modify this line)',
      templateFile: './new-module/add-new-resolver.hbs',
      abortOnFail: true,
    });

    return actions;
  },
};
