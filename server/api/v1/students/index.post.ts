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

	return sendSuccess({
		event,
		data: { uid: docRef.id, ...student, createdAt: new Date().toISOString() },
		message: 'Successfully created student',
		statusCode: 201,
	});
});
