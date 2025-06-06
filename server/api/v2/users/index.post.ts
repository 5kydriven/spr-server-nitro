import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const student = await readBody(event);

	if (!student) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'No data provided',
		});
	}

	const name =
		student.firstName + ' ' + student.middleName + ' ' + student.lastName;

	const result = await prisma.user.create({
		data: {
			id: student.studentId,
			email: student.email,
			name,
			role: 'STUDENT',
			// student: {
			// 	create: {
			// 		status: 'PENDING',
			// 		firstName: student.firstName,
			// 		middleName: student.middleName,
			// 		lastName: student.lastName,
			// 	},
			// },
		},
	});

	return {
		event,
		message: 'Signup successfully',
		statusCode: 201,
		data: result,
	};
});
