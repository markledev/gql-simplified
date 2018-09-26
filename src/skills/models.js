export default `
	type Skill {
		id: ID!
		text: String
	}

	type Query {
		SkillsGetAllSkills: [Skill]
	}

	type Mutation {
		SkillsAddNewSkill(text: String): Skill
		SkillsRemoveSkillById(id: Int): Skill
		# new_mutation (Do not remove this line)
	}

	type Subscription {
		SkillsGetNewlyAddedSkill: Skill
	}
`;