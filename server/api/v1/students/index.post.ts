import { getFirestore } from 'firebase-admin/firestore';
import { Student } from '~/types/student';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const student = await readBody<Student>(event);

	if (!student) {
		throw new Error('No student data passed');
	}

	const docRef = await db
		.collection('users')
		.add({ ...student, createdAt: new Date().toISOString(), role: 'student' });

	return sendSuccess(
		event,
		{ uid: docRef.id, ...student, createdAt: new Date().toISOString() },
		'Successfully created student',
		201,
	);
});
