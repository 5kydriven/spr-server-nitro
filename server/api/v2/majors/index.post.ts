import { Major } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const major = await readBody<Major>(event);

	if (!major) {
		throw new Error('No major passed');
	}

	await prisma.major.create({
		data: {
			name: major.name.toLowerCase(),
			courseId: major.courseId,
		},
	});

	return sendSuccess({
		event,
		message: 'Major created successfully',
		statusCode: 201,
	});
});
