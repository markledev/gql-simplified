import { merge } from 'lodash'

import AccountsEthereumResolvers from './accounts-ethereum/resolvers';
// import AccountsPasswordResolvers from './accounts-password/resolvers';
// import LandsResolvers from './lands/resolvers';
// import LeasesResolvers from './leases/resolvers';

export default merge(
  AccountsEthereumResolvers,
  // AccountsPasswordResolvers,
  // LandsResolvers,
  // LeasesResolvers
);


