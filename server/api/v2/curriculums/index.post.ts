import { Curriculum } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const curriculum = await readBody<Curriculum>(event);

	if (!curriculum) {
		throw new Error('No curriculum passed');
	}

	await prisma.curriculum.create({
		data: {
			name: curriculum.name.toLowerCase(),
			description: curriculum.description,
			courseId: curriculum.courseId,
		},
	});

	return sendSuccess({
		event,
		message: 'Curriculum created successfully',
		statusCode: 201,
	});
});
