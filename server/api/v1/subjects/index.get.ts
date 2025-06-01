import { getFirestore } from 'firebase-admin/firestore';
import { sendSuccess } from '~/utils/response';
import { wrapHandler } from '~/utils/wrapHandler';
import { Subject } from '~/types/subject';

export default wrapHandler(async (event) => {
	const db = getFirestore();
	const { page = '1', limit = '10', q } = getQuery(event);

	const pageNum = Math.max(1, parseInt(page as string));
	const limitNum = Math.max(1, Math.min(100, parseInt(limit as string)));
	const offset = (pageNum - 1) * limitNum;

	const countQuery = await db.collection('subjects').count().get();
	const total = countQuery.data().count;

	const snapshot = await db
		.collection('subjects')
		.offset(offset)
		.limit(limitNum)
		.get();

	const subjects: Subject[] = snapshot.empty
		? []
		: (snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
		  })) as Subject[]);

	return sendSuccess(event, subjects, 'Subjects retrieved successfully', 200, {
		total,
		page: pageNum,
		limit: limitNum,
		totalPages: Math.ceil(total / limitNum),
	});
});
