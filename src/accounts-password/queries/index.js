import getCurrentUser from './getCurrentUser';
import getTodos from './getTodos';

export default {
	Query: {
		AccountsPasswordGetCurrentUser: getCurrentUser,
		getTodos: getTodos
	}
}