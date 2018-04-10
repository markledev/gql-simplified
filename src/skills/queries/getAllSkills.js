import { skills } from '../localdb';

const getAllSkills = async (root, args, { db }) => {
	return skills;
};

export default getAllSkills;