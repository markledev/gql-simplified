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
	}

	type Subscription {
		SkillsGetNewlyAddedSkill: Skill
	}
`;