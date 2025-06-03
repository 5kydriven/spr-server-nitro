import { getFirestore } from 'firebase-admin/firestore';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const query = getQuery(event);

	return {
		event,
		data: [],
		meta: {},
	};
});
