import { merge } from 'lodash'

import AccountsPasswordResolvers from './accounts-password/resolvers';
import SkillsResolvers from './skills/resolvers';
import jobRolesResolvers from './jobRoles/resolvers';
// import-new-resolver (Do not remove/modify this line)

export default merge(
  AccountsPasswordResolvers,
  SkillsResolvers,
  // add-new-resolver (Do not remove/modify this line)
);


