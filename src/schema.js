import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import resolvers from './resolvers';
import { mergeTypes } from 'merge-graphql-schemas';
import AccountsPasswordModels from './accounts-password/models';
import SkillsModels from './skills/models';
// import AccountsPasswordModels from './accounts-password/models';
// import LandsModels from './lands/models';
// import LeasesModels from './leases/models';

const typeDefs = mergeTypes([
  AccountsPasswordModels,
  SkillsModels,
  // AccountsPasswordModels,
  // LandsModels,
  // LeasesModels
  ], { all: true });

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
