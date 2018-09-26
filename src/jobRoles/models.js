export default `
	type Query {
		jobRoles_getById(arg1: String, arg2: String): String
		# new_query (Do not remove this line)
	}

	type Mutation {
		jobRoles_updateByName(arg1: String, arg2: String): String
		# new_mutation (Do not remove this line)
	}

	type Subscription {
		jobRoles_statusChange(arg1: String, arg2: String): String
	}
`;