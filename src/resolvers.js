import { merge } from 'lodash'

import AccountsPasswordResolvers from './accounts-password/resolvers';
// import SkillsResolvers from './skills/resolvers';

export default merge(
  AccountsPasswordResolvers,
  // SkillsResolvers,
);


