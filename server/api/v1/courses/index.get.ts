import { getFirestore } from 'firebase-admin/firestore';
import { Course } from '~/types/course';
import { sendSuccess } from '~/utils/response';
import { wrapHandler } from '~/utils/wrapHandler';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const { page = '1', limit = '10', q } = getQuery(event);

	const pageNum = Math.max(1, parseInt(page as string));
	const limitNum = Math.max(1, Math.min(100, parseInt(limit as string)));
	const offset = (pageNum - 1) * limitNum;

	const countQuery = await db.collection('courses').count().get();
	const total = countQuery.data().count;

	const snapshot = await db
		.collection('courses')
		.offset(offset)
		.limit(limitNum)
		.get();

	const products: Course[] = snapshot.empty
		? []
		: (snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
		  })) as Course[]);

	return sendSuccess(event, products, 'Courses retrieved successfully', 200, {
		total,
		page: pageNum,
		limit: limitNum,
		totalPages: Math.ceil(total / limitNum),
	});
});
