import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const id = getRouterParam(event, 'id');
	const auth = getAuth();

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const data = await db.collection('users').doc(id).delete();

	await auth.deleteUser(id);

	return {
		event,
		data,
		message: 'Student deleted successfully',
	};
});
