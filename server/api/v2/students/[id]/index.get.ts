import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'No ID provided',
		});
	}

	const result = await prisma.student.findUnique({
		where: { userId: id },
	});

	return {
		event,
		data: result,
	};
});
