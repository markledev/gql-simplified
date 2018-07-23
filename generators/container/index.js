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
const routeTemplates = require('../../src/ui/common/routes/templates');

const originalText = fs.readFileSync(
  path.join(__dirname, '../../src/ui/common/routes/templates.js'),
  'utf8'
);
module.exports = {
  description: 'Add a new container/page (with or without redux form)',
  prompts: [
    {
      type: 'list',
      name: 'routeLevelOne',
      message: 'Select TOP ROUTE LEVEL where you will put the container inside',
      choices: () => getAllParentContainers(),
    },
    {
      type: 'list',
      name: 'routeLevelTwo',
      message: 'Select INNER ROUTE LEVEL where you would like to put component in',
      choices: data => getAllContainers(data.routeLevelOne),
    },
    {
      type: 'input',
      name: 'containerName',
      message: 'What should this container be called?',
      default: 'Form',
      validate: (value, data) => {
        if (/.+/.test(value)) {
          return containerExists(data.routeLevelOne, data.routeLevelTwo, value)
            ? 'A container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantReduxForm',
      default: true,
      message: 'Do you want to use redux form for this container?',
    },
    {
      type: 'list',
      name: 'storeFeature',
      message: 'Select existing REDUX STORE which will be used in this container',
      choices: () => getAllStoreFeatures(),
    },
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

    actions.push({
      type: 'modify',
      path: `../src/ui/common/routes/templates.js`,
      pattern: originalText,
      template: `module.exports = ${JSON.stringify(newJson, null, 2)}`,
      abortOnFail: true,
    });

    return actions;
  },
};
