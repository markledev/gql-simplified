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
    return actions;
  },
};
