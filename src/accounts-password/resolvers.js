// import { merge } from 'lodash';

// import mutations from './mutations';
// import queries from './queries';
// import subscriptions from './subscriptions';

// export default merge(mutations, queries, subscriptions);

import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';
export default {
	Query: {
		getUser: async (_, { email }, {req, res, db, headers }) => {
			const user = await db.collection('users').findOne({ email });

			return user;
		}
	},

	Mutation: {
		updateUser: async (_, { email, name }, {req, res, db, headers }) => {
			const updateObj = await db.collection('users').update({ email }, { $set: { name }});
			const updatedUser = await db.collection('users').findOne({ email });
			pubsub.publish('USER_UPDATED_SUBS', { userUpdatedSub: updatedUser });
			return updatedUser;
		}
	},

	Subscription: {
		userUpdatedSub: {
			subscribe: withFilter(
				() => pubsub.asyncIterator('USER_UPDATED_SUBS'),
				(payloads, variables) => {
					return payloads.userUpdatedSub.email === variables.email;
				}
				) 
		}
	}
}