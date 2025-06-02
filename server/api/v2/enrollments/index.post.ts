import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const enrollment = await readBody(event);

	if (!enrollment) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Data is required',
		});
	}

	const data = await prisma.enrollment.create({
		data: {
			studentId: enrollment.studentId,
			curriculumId: enrollment.curriculumId,
			majorId: enrollment.majorId || null,
			academicYear: enrollment.academicYear,
			semester: enrollment.semester,
		},
	});

	return {
		event,
		message: 'Enrollment created successfully',
		statusCode: 201,
		data,
	};
});
