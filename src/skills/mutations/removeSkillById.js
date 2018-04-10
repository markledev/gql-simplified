import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';
import { skills } from '../localdb';

const removeSkillById = (root, args, { db }) => {
	const { id } = args;
	// find position of the skill with specific id
	let daPosition = -1;
	for (let i = 0; i < skills.length; i++) {
		if (skills[i].id === id && daPosition === -1) {
			daPosition = i;
		}
	}

	// remove element by giving the position.
	const skillToRemove = Object.assign({}, skills[daPosition]);
	skills.splice(daPosition, 1);
	return skillToRemove;
}

export default removeSkillById;