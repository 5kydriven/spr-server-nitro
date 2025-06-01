import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const data = await prisma.subject.delete({
		where: {
			id,
		},
	});

	return {
		event,
		message: 'Subject deleted successfully',
		data,
	};
});
