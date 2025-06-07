import { SubjectOffering } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const curriculumId = getRouterParam(event, 'id');
	const subject = await readBody<SubjectOffering>(event);

	if (!curriculumId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	if (!subject) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Data input is missing',
		});
	}

	await prisma.subjectOffering.create({
		data: {
			curriculumId,
			semester: subject.semester,
			yearLevel: subject.yearLevel,
			subjectId: subject.id,
		},
	});

	return {
		event,
		statusCode: 201,
		message: 'Successfully added subjects',
	};
});
