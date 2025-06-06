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

	const result = await prisma.user.findUnique({
		where: { id },
		include: {
			student: {
				include: {
					enrollment: {
						include: {
							curriculum: {
								include: { course: { include: { majors: true } } },
							},
						},
					},
				},
			},
		},
	});

	return {
		event,
		data: result,
	};
});
