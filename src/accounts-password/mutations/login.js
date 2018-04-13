import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../pubsub';

const login = (root, args) => {
	pubsub.publish('AccountsEthereumGetTenUsers', {hihi: "hihi", AccountsEthereumGetTenUsers: "hihi"});
	return "login mutation";
}

export default login;