import login from './login';
import signUp from './signUp';
import addTodo from './addTodo';
// import_new_mutation (Do not modify/delete this line)

export default {
	Mutation: {
		AccountsPasswordLogin: login,
		AccountsPasswordSignUp: signUp,
		addTodo: addTodo,
		// add_new_mutation (Do not modify/delete this line)
	}
}