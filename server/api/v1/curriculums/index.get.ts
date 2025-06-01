import { getFirestore } from 'firebase-admin/firestore';
import { Curriculum } from '~/types/curriculum';
import { sendSuccess } from '~/utils/response';
import { wrapHandler } from '~/utils/wrapHandler';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const { page = '1', limit = '10', q } = getQuery(event);

	const pageNum = Math.max(1, parseInt(page as string));
	const limitNum = Math.max(1, Math.min(100, parseInt(limit as string)));
	const offset = (pageNum - 1) * limitNum;

	const countQuery = await db.collection('curriculums').count().get();
	const total = countQuery.data().count;

	const snapshot = await db
		.collection('curriculums')
		.offset(offset)
		.limit(limitNum)
		.get();

	const products: Curriculum[] = snapshot.empty
		? []
		: (snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
		  })) as Curriculum[]);

	return {
		event,
		data: products,
		message: 'Curriculums retrieved successfully',
		meta: {
			total,
			page: pageNum,
			limit: limitNum,
			totalPages: Math.ceil(total / limitNum),
		},
	};
});
