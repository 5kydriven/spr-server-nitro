import { Major } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const major = await readBody<Major>(event);

	if (!major) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Major is required',
		});
	}

	await prisma.major.create({
		data: {
			name: major.name.toLowerCase(),
			courseId: major.courseId,
		},
	});

	return {
		event,
		message: 'Major created successfully',
		statusCode: 201,
	};
});
