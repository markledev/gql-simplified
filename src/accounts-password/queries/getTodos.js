const getTodos = async (root, args, { db, headers }) => {
	return [
		{
			_id: 1,
			task: 'viet is handsome',
			timestamp: 1
		}, {
			_id: 2,
			task : 'mark is handsome',
			timestamp: 2
		}
	];
}

export default getTodos;