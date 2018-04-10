import addNewSkill from './addNewSkill';
import removeSkillById from './removeSkillById';

export default {
	Mutation: {
		SkillsAddNewSkill: addNewSkill,
		SkillsRemoveSkillById: removeSkillById
	}
}