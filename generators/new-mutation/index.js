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
  description: 'Add new graphql mutation',
  prompts: [
    {
      type: 'list',
      name: 'routeLevelOne',
      message: 'Select the module where you want to put the mutation',
      choices: () => getAllParentContainers(),
    },
    {
      type: 'input',
      name: 'mutationName',
      message: 'What should this mutation be called?',
      default: 'updateUser',
      validate: (value, data) => {
        if (/.+/.test(value)) {
          return containerExists(data.routeLevelOne, value)
            ? 'A mutation with this name already exists in this module'
            : true;
        }

        return 'The name is required';
      },
    }
  ],
  actions: data => {
    /*-- ADDING MUTATION_RESOLVER FILE --*/
    actions.push({
      type: 'add',
      path: `../src/{{camelCase routeLevelOne}}/mutations/{{camelCase mutationName}}`,
      templateFile: './new-mutation/mutation-resolver.hbs',
      abortOnFail: true,
    });

    /* INSERT import statement @ <routeLevelOne>/mutations/index.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/mutations/index.js`,
      pattern: '// import_new_mutation (Do not modify/delete this line)',
      templateFile: './new-mutation/import-new-mutation.hbs',
      abortOnFail: true,
    });

    /* INSERT key and value inside Mutation Object @ <routeLevelOne>/mutations/index.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/mutations/index.js`,
      pattern: '// add_new_mutation (Do not modify/delete this line)',
      templateFile: './new-mutation/add-new-mutation.hbs',
      abortOnFail: true,
    });

    /* INSERT model definition @ <routeLevelOne>/model.js */
    actions.push({
      type: 'modify',
      path: `../src/{{camelCase routeLevelOne}}/model.js`,
      pattern: '# new_mutation (Do not remove this line)',
      templateFile: './new-mutation/new-mutation-in-model.hbs',
      abortOnFail: true,
    });

    return actions;
  },
};
