import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const { page = '1', limit = '10', search = '' } = getQuery(event);

	const pageNumber = parseInt(page as string);
	const limitNumber = parseInt(limit as string);
	const skip = (pageNumber - 1) * limitNumber;

	const [curriculums, total] = await prisma.$transaction([
		prisma.curriculum.findMany({
			where: {
				OR: [{ name: { contains: search as string, mode: 'insensitive' } }],
			},
			skip,
			take: limitNumber,
			orderBy: {
				name: 'asc',
			},
		}),
		prisma.curriculum.count({
			where: {
				OR: [{ name: { contains: search as string, mode: 'insensitive' } }],
			},
		}),
	]);

	return sendSuccess({
		event,
		statusCode: 200,
		data: curriculums,
		meta: {
			total,
			page: pageNumber,
			limit: limitNumber,
			totalPages: Math.ceil(total / limitNumber),
		},
	});
});
