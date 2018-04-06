const getTenUsers = {
	subscribe: withFilter(
		() => pubsub.asyncIterator('getTenUsers'),
		(payloads, variables) => {

		}
	)
};

export default getTenUsers;