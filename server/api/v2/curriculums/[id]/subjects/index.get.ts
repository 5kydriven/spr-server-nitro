import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const curriculumId = getRouterParam(event, 'id');

	if (!curriculumId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	const subjects = await prisma.subjectOffering.findMany({
		where: { curriculumId },
		include: {
			subject: true,
		},
	});

	return {
		event,
		data: subjects,
	};
});
