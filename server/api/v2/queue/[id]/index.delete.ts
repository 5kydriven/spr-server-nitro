import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const body = await readBody(event);

	await prisma.student.update({
		where: { id },
		data: {
			status: 'REJECTED',
		},
	});
	return {
		event,
		message: 'Successfully updated queue',
	};
});
