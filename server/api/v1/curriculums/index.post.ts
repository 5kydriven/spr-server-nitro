import { getFirestore } from 'firebase-admin/firestore';
import { Curriculum } from '~/types/curriculum';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const curriculum = await readBody<Curriculum>(event);

	if (!curriculum) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Curriculum is required',
		});
	}

	const docRef = await db
		.collection('curriculums')
		.add({ ...curriculum, createdAt: new Date().toISOString() });

	return {
		event,
		data: {
			uid: docRef.id,
			...curriculum,
			createdAt: new Date().toISOString(),
		},
		message: 'Successfully created curriculum',
		statusCode: 201,
	};
});
