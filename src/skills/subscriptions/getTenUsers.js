import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';

const SkillsGetNewlyAddedSkill = {
	subscribe: () => pubsub.asyncIterator('SkillsGetNewlyAddedSkill')
};

// const getTenUsers = {
// 	subscribe: withFilter(
// 		() => pubsub.asyncIterator('AccountsEthereumGetTenUsers'),
// 		(payloads, variables) => {
// 			return "who cares";
// 		}
// 	)
// };

export default SkillsGetNewlyAddedSkill;