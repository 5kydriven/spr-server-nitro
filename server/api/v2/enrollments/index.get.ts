import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const enrollments = await prisma.enrollment.findMany({
		include: { student: true, curriculum: true },
	});
	return { event, data: enrollments };
});
