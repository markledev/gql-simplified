export default `
	type User {
		_id: String
		username: String
		email: String
		role: String
		name: String
	}

	type Query {
		getUser(email: String!): User
	}

	type Mutation {
		updateUser(email: String!, name: String!): User
	}

	type Subscription {
		userUpdatedSub(email: String!): User
	}
`;