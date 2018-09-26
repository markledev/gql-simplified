import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import resolvers from './resolvers';
import { mergeTypes } from 'merge-graphql-schemas';
import AccountsPasswordModels from './accounts-password/models';
import SkillsModels from './skills/models';
// import-new-schema (Do not remove/modify this line)

const typeDefs = mergeTypes([
  AccountsPasswordModels,
  SkillsModels,
  // add-new-schema (Do not remove/modify this line)
  ], { all: true });

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
