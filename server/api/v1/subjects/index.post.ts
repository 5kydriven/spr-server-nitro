import { getFirestore } from 'firebase-admin/firestore';
import { Subject } from '~/types/subject';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const subject = await readBody<Subject>(event);

	if (!subject) {
		throw new Error('No subject passed');
	}

	const docRef = db.collection('subjects').doc(subject.code);

	const existing = await docRef.get();
	if (existing.exists) {
		throw new Error('Subject with this code already exists');
	}

	const subjectData: Subject = {
		...subject,
		createdAt: new Date().toISOString(),
	};

	await docRef.set(subjectData);

	return sendSuccess({
		event,
		data: subjectData,
		message: 'Successfully created subject',
		statusCode: 201,
	});
});
