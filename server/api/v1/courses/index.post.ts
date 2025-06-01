import { getFirestore } from 'firebase-admin/firestore';
import { Course } from '~/types/course';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const course = await readBody<Course>(event);

	if (!course) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Course is required',
		});
	}

	const docRef = db.collection('courses').doc(course.abbreviation);

	const existing = await docRef.get();
	if (existing.exists) {
		throw createError({
			statusCode: 409,
			statusMessage: 'Conflict',
			message: `Course with abbreviation ${course.abbreviation} already exists`,
		});
	}

	const courseData: Course = {
		...course,
		createdAt: new Date().toISOString(),
	};

	await docRef.set(courseData);

	return {
		event,
		data: courseData,
		message: 'Successfully created course',
		statusCode: 201,
	};
});
