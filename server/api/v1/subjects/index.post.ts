import { getFirestore } from 'firebase-admin/firestore';
import { Subject } from '~/types/subject';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const subject = await readBody<Subject>(event);

	if (!subject) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Subject is required',
		});
	}

	const docRef = db.collection('subjects').doc(subject.code);

	const existing = await docRef.get();
	if (existing.exists) {
		throw createError({
			statusCode: 409,
			statusMessage: 'Conflict',
			message: `Subject with code ${subject.code} already exists`,
		});
	}

	const subjectData: Subject = {
		...subject,
		createdAt: new Date().toISOString(),
	};

	await docRef.set(subjectData);

	return {
		event,
		data: subjectData,
		message: 'Successfully created subject',
		statusCode: 201,
	};
});
