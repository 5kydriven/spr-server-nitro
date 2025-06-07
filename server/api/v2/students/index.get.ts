import { prisma } from '~~/prisma/client';

export default defineEventHandler(async (event) => {
	const {
		page = '1',
		limit = '10',
		search = '',
		course,
		major,
		status,
	} = getQuery(event);

	const pageNumber = parseInt(page as string);
	const limitNumber = parseInt(limit as string);
	const skip = (pageNumber - 1) * limitNumber;

	const filterConditions: any = {
		AND: [
			{
				OR: [
					{ firstName: { contains: search as string, mode: 'insensitive' } },
					{ middleName: { contains: search as string, mode: 'insensitive' } },
					{ lastName: { contains: search as string, mode: 'insensitive' } },
				],
			},
		],
	};

	if (status) {
		filterConditions.AND.push({
			status: { equals: status as string },
		});
	}

	if (course || major) {
		filterConditions.AND.push({
			enrollments: {
				some: {
					AND: [
						course
							? {
									curriculum: {
										course: {
											name: { equals: course as string, mode: 'insensitive' },
										},
									},
							  }
							: {},
						major
							? {
									major: {
										name: { equals: major as string, mode: 'insensitive' },
									},
							  }
							: {},
					],
				},
			},
		});
	}

	const [students, total] = await prisma.$transaction([
		prisma.student.findMany({
			where: filterConditions,
			skip,
			take: limitNumber,
			orderBy: {
				lastName: 'asc',
			},
			include: {
				enrollment: {
					include: { curriculum: { include: { course: true, major: true } } },
				},
			},
		}),
		prisma.student.count({
			where: filterConditions,
		}),
	]);

	return sendSuccess({
		event,
		statusCode: 200,
		data: students,
		meta: {
			total,
			page: pageNumber,
			limit: limitNumber,
			totalPages: Math.ceil(total / limitNumber),
		},
	});
});
