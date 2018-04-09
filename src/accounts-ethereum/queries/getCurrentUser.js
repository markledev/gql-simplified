const getCurrentUser = async (root, args, { db }) => {
	const user = await db.collection("users").findOne()
	return user.email;
}

export default getCurrentUser;