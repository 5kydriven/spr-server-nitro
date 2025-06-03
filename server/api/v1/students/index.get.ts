import { getFirestore } from 'firebase-admin/firestore';
import { Student } from '~/types/student';
import { wrapHandler } from '~/utils/wrapHandler';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const { page = '1', limit = '10', q, course, status } = getQuery(event);

	const pageNum = Math.max(1, parseInt(page as string));
	const limitNum = Math.max(1, Math.min(100, parseInt(limit as string)));
	const offset = (pageNum - 1) * limitNum;

	let query = db
		.collection('users')
		.where('role', '==', 'student')
		.orderBy('createdAt', 'desc');

	// Apply additional filters if provided
	if (course) {
		query = query.where('course', '==', course);
	}
	if (status) {
		query = query.where('status', '==', status);
	}

	// Get total count
	const countSnapshot = await query.count().get();
	const total = countSnapshot.data().count;

	// Apply pagination
	const snapshot = await query.offset(offset).limit(limitNum).get();

	const students: Student[] = snapshot.empty
		? []
		: (snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
		  })) as Student[]);

	return {
		event,
		data: students,
		message: 'Students retrieved successfully',
		meta: {
			total,
			page: pageNum,
			limit: limitNum,
			totalPages: Math.ceil(total / limitNum),
		},
	};
});
