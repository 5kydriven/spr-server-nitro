import { Curriculum } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const curriculum = await readBody<Curriculum>(event);

	if (!curriculum) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Curriculum is required',
		});
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
