const addTodo = async (root, { task }, { db }) => {
	return {
		_id: 3,
		task: task,
		timestamp: 3
	};
}

export default addTodo;