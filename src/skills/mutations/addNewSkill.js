import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';
import { skills } from '../localdb';

const addNewSkill = (root, { companyId, locationDetails }, { db, headers }) => {
	skills.push({
		id: 3,
		text: args.text
	});

	return {
		id: 3,
		text: args.text
	}
}

export default addNewSkill;