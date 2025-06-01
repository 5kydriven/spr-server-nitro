import { Subject } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const subject = await readBody<Subject>(event);

	if (!subject) {
		throw new Error('No subject passed');
	}

	await prisma.subject.create({
		data: {
			name: subject.name.toLowerCase(),
			code: subject.code.toLowerCase(),
			unit: subject.unit,
		},
	});

	return sendSuccess({
		event,
		message: 'Subject created successfully',
		statusCode: 201,
	});
});
