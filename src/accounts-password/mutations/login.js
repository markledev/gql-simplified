import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (root, { email, password }, { db }) => {
	// check if user exist
	const user = await db.collection('users').findOne({ email });
	if (!user) throw "This user does not exist";

	// check password
	const { pwHash } = user;
	if (!bcrypt.compareSync(password, pwHash)) throw "Wrong password";

	// get the user from db
	const token = await jwt.sign(user, 'test-password', {expiresIn: "7d"});
	//!TODO: Need to dynamically get data requested from graphQL query instead to save load.

	pubsub.publish('likeSubscription', { likeSubscription: 'Jae just likes your new status' });
	
	return {
		name: user.name,
		email: user.email,
		password: user.pwHash,
		_id: user._id,
		jwt: token
	};
}

export default login;