import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const { page = '1', limit = '10', search = '' } = getQuery(event);

	const pageNumber = parseInt(page as string);
	const limitNumber = parseInt(limit as string);
	const skip = (pageNumber - 1) * limitNumber;

	const [majors, total] = await prisma.$transaction([
		prisma.major.findMany({
			where: {
				OR: [{ name: { contains: search as string, mode: 'insensitive' } }],
			},
			skip,
			take: limitNumber,
			orderBy: {
				name: 'asc',
			},
		}),
		prisma.major.count({
			where: {
				OR: [{ name: { contains: search as string, mode: 'insensitive' } }],
			},
		}),
	]);

	return sendSuccess({
		event,
		statusCode: 200,
		data: majors,
		meta: {
			total,
			page: pageNumber,
			limit: limitNumber,
			totalPages: Math.ceil(total / limitNumber),
		},
	});
});
