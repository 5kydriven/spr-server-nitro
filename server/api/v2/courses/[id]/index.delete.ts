import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		return createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const data = await prisma.course.delete({
		where: {
			id,
		},
	});

	return sendSuccess({
		event,
		message: 'Course deleted successfully',
		data,
	});
});
