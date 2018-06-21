import login from './login';
import signUp from './signUp';
import addTodo from './addTodo';

export default {
	Mutation: {
		AccountsPasswordLogin: login,
		AccountsPasswordSignUp: signUp,
		addTodo: addTodo
	}
}