import { Course } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const course = await readBody<Course>(event);

	if (!course) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Course is required',
		});
	}

	await prisma.course.create({
		data: {
			name: course.name.toLowerCase(),
			abbreviation: course.abbreviation.toLowerCase(),
		},
	});

	return sendSuccess({
		event,
		message: 'Course created successfully',
		statusCode: 201,
	});
});
