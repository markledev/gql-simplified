import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';

const getTenUsers = {
	subscribe: () => pubsub.asyncIterator('likeSubscription')
};

// const getTenUsers = {
// 	subscribe: withFilter(
// 		() => pubsub.asyncIterator('AccountsEthereumGetTenUsers'),
// 		(payloads, variables) => {
// 			return "who cares";
// 		}
// 	)
// };

export default getTenUsers;