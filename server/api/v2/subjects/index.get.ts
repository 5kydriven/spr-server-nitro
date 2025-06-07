import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const { page = '0', limit = '10', search = '' } = getQuery(event);

	const pageNumber = parseInt(page as string);
	const limitNumber = parseInt(limit as string);
	const skip = pageNumber * limitNumber;

	const [subjects, total] = await prisma.$transaction([
		prisma.subject.findMany({
			where: {
				OR: [
					{ name: { contains: search as string, mode: 'insensitive' } },
					{ code: { contains: search as string, mode: 'insensitive' } },
				],
			},
			skip,
			take: limitNumber,
			orderBy: {
				name: 'asc',
			},
		}),
		prisma.subject.count({
			where: {
				OR: [
					{ name: { contains: search as string, mode: 'insensitive' } },
					{ code: { contains: search as string, mode: 'insensitive' } },
				],
			},
		}),
	]);

	return {
		event,
		statusCode: 200,
		data: subjects,
		meta: {
			total,
			page: pageNumber,
			limit: limitNumber,
			totalPages: Math.ceil(total / limitNumber),
		},
	};
});
