const getCurrentUser = async (root, args, { db, headers }) => {
	const user = await db.collection("users").findOne({});
	return user.email;
}

export default getCurrentUser;