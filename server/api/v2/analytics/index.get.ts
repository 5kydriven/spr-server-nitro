import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const students = prisma.student.count({
		where: { status: { equals: 'APPROVED' } },
	});

	const courses = prisma.course.count();
	const curriculums = prisma.curriculum.count();
	const subjects = prisma.subject.count();

	return {
		event,
		data: [courses, students, curriculums, subjects],
	};
});
