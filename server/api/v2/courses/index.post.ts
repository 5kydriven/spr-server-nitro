import { Course } from '~/types/course';
import { Major } from '~/types/major';
import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const course = await readBody<Course>(event);

	if (!course || !course.name || !course.abbreviation) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Course name and abbreviation are required',
		});
	}

	try {
		const result = await prisma.course.create({
			data: {
				name: course.name.toLowerCase(),
				abbreviation: course.abbreviation.toLowerCase(),
			},
		});

		if (course.majors?.length > 0) {
			await prisma.major.createMany({
				data: course.majors.map((majorName: any) => ({
					name: majorName.toLowerCase(),
					courseId: result.id,
				})),
			});
		}

		return sendSuccess({
			event,
			message: 'Course created successfully',
			statusCode: 201,
		});
	} catch (error) {
		console.error('Error creating course:', error);
		return sendErrorResponse({
			event,
			statusCode: 400,
			message: error.message,
		});
	}
});
