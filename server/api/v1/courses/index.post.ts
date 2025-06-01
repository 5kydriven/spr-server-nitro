import { getFirestore } from 'firebase-admin/firestore';
import { Course } from '~/types/course';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const course = await readBody<Course>(event);

	if (!course) {
		throw new Error('No course passed');
	}

	const docRef = db.collection('courses').doc(course.abbreviation);

	const existing = await docRef.get();
	if (existing.exists) {
		throw new Error('Course with this abbreviation already exists');
	}

	const courseData: Course = {
		...course,
		createdAt: new Date().toISOString(),
	};

	await docRef.set(courseData);

	return sendSuccess({
		event,
		data: courseData,
		message: 'Successfully created course',
		statusCode: 201,
	});
});
