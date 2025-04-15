import { getFirestore } from 'firebase-admin/firestore';
import { Curriculum } from '~/types/curriculum';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const curriculum = await readBody<Curriculum>(event);

	if (!curriculum) {
		throw new Error('No curriculum passed');
	}

	const docRef = await db
		.collection('curriculums')
		.add({ ...curriculum, createdAt: new Date().toISOString() });

	return sendSuccess(
		event,
		{ uid: docRef.id, ...curriculum, createdAt: new Date().toISOString() },
		'Successfully created curriculum',
		201,
	);
});
