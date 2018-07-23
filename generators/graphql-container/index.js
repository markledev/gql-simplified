/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

const getAllParentContainers = require('../utils/getAllParentContainers');
const getAllContainers = require('../utils/getAllContainers');

module.exports = {
  description: 'Add a standalone GRAPHQL container',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantReduxForm',
      default: false,
      message: 'Do you want to use redux form for this container?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [];
    if (data.container === '.') data.container = false;

    actions.push({
      type: 'add',
      path: `../src/ui/graphql/{{properCase name}}/index.js`,
      templateFile: './graphql-container/class.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/ui/graphql/{{properCase name}}/loadable.js`,
      templateFile: './graphql-container/loadable.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/ui/graphql/{{properCase name}}/messages.js`,
      templateFile: './graphql-container/messages.js.hbs',
      abortOnFail: true,
    });

    if (data.wantReduxForm) {
      actions.push({
        type: 'add',
        path: `../src/ui/graphql/{{properCase name}}/model.js`,
        templateFile: './graphql-container/model.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'add',
      path: `../src/ui/graphql/{{properCase name}}/tests/index.test.js`,
      templateFile: './graphql-container/test.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/store/graphql/{{properCase name}}/action-types.js`,
      templateFile: './graphql-container/action-types.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/store/graphql/{{properCase name}}/selectors.js`,
      templateFile: './graphql-container/selectors.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/store/graphql/{{properCase name}}/reducer.js`,
      templateFile: './graphql-container/reducers.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: '../src/store/graphql/reducer.js',
      pattern: '// new-reducer-import',
      templateFile: './graphql-container/new-reducer-import.hbs',
    });

    actions.push({
      type: 'modify',
      path: '../src/store/graphql/reducer.js',
      pattern: '// new-reducer-combine',
      templateFile: './graphql-container/new-reducer-combine.hbs',
    });

    return actions;
  },
};
