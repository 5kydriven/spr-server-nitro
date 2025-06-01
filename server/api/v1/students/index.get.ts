import { getFirestore } from 'firebase-admin/firestore';
import { Student } from '~/types/student';
import { sendSuccess } from '~/utils/response';
import { wrapHandler } from '~/utils/wrapHandler';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const { page = '1', limit = '10', q } = getQuery(event);

	const pageNum = Math.max(1, parseInt(page as string));
	const limitNum = Math.max(1, Math.min(100, parseInt(limit as string)));
	const offset = (pageNum - 1) * limitNum;

	const countQuery = await db
		.collection('users')
		.where('role', '==', 'student')
		.count()
		.get();
	const total = countQuery.data().count;

	const snapshot = await db
		.collection('users')
		.where('role', '==', 'student')
		.offset(offset)
		.limit(limitNum)
		.get();

	const students: Student[] = snapshot.empty
		? []
		: (snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
		  })) as Student[]);

	return sendSuccess({
		event,
		data: students,
		message: 'Students retrieved successfully',
		meta: {
			total,
			page: pageNum,
			limit: limitNum,
			totalPages: Math.ceil(total / limitNum),
		},
	});
});
