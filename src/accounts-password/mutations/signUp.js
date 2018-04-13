import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const signUp = async (root, { name, email, password }, { db }) => {
	// check if user exists
	const user = await db.collection('users').findOne({'email': email});
	if (user) throw "User already exists";
	// bcrypt password
	const salt = bcrypt.genSaltSync(10);
	const pwHash = bcrypt.hashSync(password, salt);
	// insert new user
	await db.collection('users').insertOne({
		name,
		email,
		pwHash
	});
	// return user with jwt
	const newUser = await db.collection('users').findOne({'email': email});
	const token = await jwt.sign(newUser, 'test-password', {expiresIn: "7d"});
	
	return {
		name: newUser.name,
		email: newUser.email,
		password: newUser.pwHash,
		_id: newUser._id,
		jwt: token
	};
}

export default signUp;