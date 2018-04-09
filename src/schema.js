import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import resolvers from './resolvers';
import AccountsEthereumModels from './accounts-ethereum/models';
// import AccountsPasswordModels from './accounts-password/models';
// import LandsModels from './lands/models';
// import LeasesModels from './leases/models';

const typeDefs = "".concat(
  AccountsEthereumModels,
  // AccountsPasswordModels,
  // LandsModels,
  // LeasesModels
  );

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
