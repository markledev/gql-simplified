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
  description: 'Add new graphql query',
  prompts: [
    {
      type: 'list',
      name: 'routeLevelOne',
      message: 'Select the module where you want to put the query',
      choices: () => getAllParentContainers(),
    },
    {
      type: 'input',
      name: 'queryName',
      message: 'What should this query be called?',
      default: 'getUserById',
      validate: (value, data) => {
        if (/.+/.test(value)) {
          return containerExists(data.routeLevelOne, value)
            ? 'A query with this name already exists in this module'
            : true;
        }

        return 'The name is required';
      },
    }
  ],
  actions: data => {
    const actions = [];
    /*-- ADDING query_RESOLVER FILE --*/
    actions.push({
      type: 'add',
      path: `../src/{{camelCase routeLevelOne}}/queries/{{camelCase queryName}}.js`,
      templateFile: './new-query/query-resolver.hbs',
      abortOnFail: true,
    });

    /* INSERT import statement @ <routeLevelOne>/queries/index.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/queries/index.js`,
      pattern: '// import_new_query (Do not modify/delete this line)',
      templateFile: './new-query/import-new-query.hbs',
      abortOnFail: true,
    });

    /* INSERT key and value inside query Object @ <routeLevelOne>/queries/index.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/queries/index.js`,
      pattern: '// add_new_query (Do not modify/delete this line)',
      templateFile: './new-query/add-new-query.hbs',
      abortOnFail: true,
    });

    /* INSERT model definition @ <routeLevelOne>/model.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/models.js`,
      pattern: '# new_query (Do not remove this line)',
      templateFile: './new-query/new-query-in-model.hbs',
      abortOnFail: true,
    });

    return actions;
  },
};
