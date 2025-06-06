import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const { page = '1', limit = '10', search = '' } = getQuery(event);

	const pageNumber = parseInt(page as string);
	const limitNumber = parseInt(limit as string);
	const skip = (pageNumber - 1) * limitNumber;

	const filterConditions: any = {
		AND: [
			{
				OR: [{ name: { contains: search as string, mode: 'insensitive' } }],
			},
		],
	};

	const [users, total] = await prisma.$transaction([
		prisma.user.findMany({
			where: filterConditions,
			skip,
			take: limitNumber,
			orderBy: {
				name: 'asc',
			},
			include: {
				student: true,
			},
		}),
		prisma.user.count({
			where: filterConditions,
		}),
	]);

	return {
		event,
		statusCode: 200,
		data: users,
		meta: {
			total,
			page: pageNumber,
			limit: limitNumber,
			totalPages: Math.ceil(total / limitNumber),
		},
	};
});
