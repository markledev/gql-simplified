import login from './login';
import signUp from './signUp';

export default {
	Mutation: {
		AccountsPasswordLogin: login,
		AccountsPasswordSignUp: signUp
	}
}