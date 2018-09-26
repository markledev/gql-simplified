import { pubsub } from '../../pubsub';

const updateByName = (root, { arg1, arg2 }, { db, headers }) => {
	/*
		In case you need to publish message for real-time reactivity feature
		pubsub.publish('likeSubscription', { likeSubscription: 'Jae just likes your new status' });
	*/

	/*
		In case you need to get/modify data from db
		const user = await db.collection('users').findOne({ email });
	*/

	/*
		In case you need to get authorization token to authenticate users
		const { authorization } = headers; // "Bearer <token>"
	*/
	
	return `${arg1}_${arg2}`
}

export default updateByName;