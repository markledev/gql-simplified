export default `
	type User {
		_id: ID!
		name: String
		email: String
		password: String
		jwt: String
	}

	type Query {
		AccountsPasswordGetCurrentUser: User
	}

	type Mutation {
		AccountsPasswordLogin: User
		AccountsPasswordSignUp(name: String, password: String, email: String): User
	}

	type Subscription {
		AccountsPasswordGetTenUsers: User
	}
`;