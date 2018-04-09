export default `
	type User {
		id: ID!
		name: String
		email: String
	}

	type Query {
		AccountsEthereumGetCurrentUser: String
	}

	type Mutation {
		AccountsEthereumLogin: String
	}

	type Subscription {
		AccountsEthereumGetTenUsers: String
	}
`;