import { getFirestore } from 'firebase-admin/firestore';
import { Student } from '~/types/student';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const student = await readBody<Student>(event);

	if (!student) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Student is required',
		});
	}

	const docRef = await db
		.collection('users')
		.add({ ...student, createdAt: new Date().toISOString(), role: 'student' });

	return {
		event,
		data: { uid: docRef.id, ...student, createdAt: new Date().toISOString() },
		message: 'Successfully created student',
		statusCode: 201,
	};
});
