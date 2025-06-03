import { firestore } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

export default wrapHandler(async (event) => {
	const db = firestore();
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
