export default `
	type Skill {
		id: ID!
		text: String
	}

	type Query {
		SkillsGetAllSkills: [Skill]
		# new_query (Do not remove this line)
	}

	type Mutation {
		SkillsAddNewSkill(text: String): Skill
		SkillsRemoveSkillById(id: Int): Skill
		# new_mutation (Do not remove this line)
	}

	type Subscription {
		SkillsGetNewlyAddedSkill: Skill
		skills_hellyeah(arg1: String, arg2: String): String
		# new_subscription (Do not remove this line)
	}
`;