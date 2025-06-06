import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const [students, courses, curriculums, subjects] = await Promise.all([
		prisma.student.count({ where: { status: { equals: 'APPROVED' } } }),
		prisma.course.count(),
		prisma.curriculum.count(),
		prisma.subject.count(),
	]);

	return {
		event,
		data: {
			courses,
			students,
			curriculums,
			subjects,
		},
	};
});
