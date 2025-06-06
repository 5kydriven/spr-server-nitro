import { Subject } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const subject = await readBody<Subject>(event);

	if (!subject) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Subject is required',
		});
	}

	await prisma.subject.create({
		data: {
			name: subject.name.toLowerCase(),
			code: subject.code.toLowerCase(),
			unit: Number(subject.unit),
		},
	});

	return {
		event,
		message: 'Subject created successfully',
		statusCode: 201,
	};
});
