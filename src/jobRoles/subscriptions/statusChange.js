import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';

const statusChange = {
	subscribe: () => pubsub.asyncIterator('likeSubscription')
};

// const statusChange = {
// 	subscribe: withFilter(
// 		() => pubsub.asyncIterator('likeSubscription'),
// 		(payloads, variables) => {
// 			return payloads.likeSubscription.id === variables.id;
// 		}
// 	)
// };

export default statusChange;