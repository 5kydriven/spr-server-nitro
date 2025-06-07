import { ApprovalStatus } from '@prisma/client';
import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const body = await readBody<ApprovalStatus>(event);

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	if (!body) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'No data passed',
		});
	}

	await prisma.student.update({
		where: { id },
		data: {
			status: body,
		},
	});
	return {
		event,
		message: 'Successfully updated queue',
	};
});
