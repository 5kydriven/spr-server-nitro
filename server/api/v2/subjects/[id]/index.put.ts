import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const subject = await readBody(event);
	const id = getRouterParam(event, 'id');

	await prisma.subject.update({
		where: { id },
		data: {
			...subject,
			unit: Number(subject.unit),
		},
	});

	return {
		event,
		message: 'Succesfully updated subjects',
	};
});
