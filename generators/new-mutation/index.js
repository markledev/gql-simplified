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
    // Generate index.js and index.test.js

    const actions = [];

    if (data.routeLevelTwo === '.') {
      data.routeLevelTwo = false;
    }

    /*-- ADDING REACT_RELATED FILES --*/
    actions.push({
      type: 'add',
      path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
        ? ''
        : '{{dashCase routeLevelTwo}}/'}/{{dashCase containerName}}/index.js`,
      templateFile: './container/class.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
        ? ''
        : '{{dashCase routeLevelTwo}}/'}/{{dashCase containerName}}/loadable.js`,
      templateFile: './container/loadable.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
        ? ''
        : '{{dashCase routeLevelTwo}}/'}/{{dashCase containerName}}/messages.js`,
      templateFile: './container/messages.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
        ? ''
        : '{{dashCase routeLevelTwo}}/'}/{{dashCase containerName}}/index.module.scss`,
      templateFile: './container/index.module.scss.hbs',
      abortOnFail: true,
    });

    if (data.wantReduxForm) {
      actions.push({
        type: 'add',
        path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
          ? ''
          : '{{dashCase routeLevelTwo}}/'}{{dashCase containerName}}/model.js`,
        templateFile: './container/model.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'modify',
      path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
        ? ''
        : '{{dashCase routeLevelTwo}}/'}index.js`,
      pattern: '// import-new-container',
      templateFile: './container/import-new-container.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: `../src/ui/{{dashCase routeLevelOne}}/${!data.routeLevelTwo
        ? ''
        : '{{dashCase routeLevelTwo}}/'}/index.js`,
      pattern: '{/* add-new-container */}',
      templateFile: './container/add-new-container.hbs',
      abortOnFail: true,
    });

    const routeArr = [];
    if (data.routeLevelOne) routeArr.push(camelCase(data.routeLevelOne));
    if (data.routeLevelTwo) routeArr.push(camelCase(data.routeLevelTwo));
    const newJson = generateNewRouteTemplates(
      routeArr,
      camelCase(data.containerName),
      routeTemplates
    );

    return actions;
  },
};
