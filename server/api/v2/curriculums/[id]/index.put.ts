import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const curriculum = await readBody(event);

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	if (!curriculum) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing data',
		});
	}

	await prisma.curriculum.update({
		where: { id },
		data: {
			name: curriculum.name,
		},
	});

	for (const subject of curriculum.subjects) {
		await prisma.subjectOffering.updateMany({
			where: {
				subjectId: subject.id,
				curriculumId: id,
			},
			data: {
				yearLevel: subject.year,
				semester: subject.semester,
			},
		});
	}

	return {
		event,
		message: 'Successfully updated curriculum',
	};
});
