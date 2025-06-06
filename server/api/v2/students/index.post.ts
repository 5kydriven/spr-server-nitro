// import { getAuth } from 'firebase-admin/auth';
// import { prisma } from '~~/prisma/client';

// export default wrapHandler(async (event) => {
// 	const student = await readBody(event);
// 	const auth = getAuth();

// 	if (!student) {
// 		throw createError({
// 			statusCode: 400,
// 			statusMessage: 'Bad Request',
// 			message: 'No data provided',
// 		});
// 	}

// 	const name =
// 		student.firstName + ' ' + student.middleName + ' ' + student.lastName;

// 	const user = await auth.createUser({
// 		email: student.email,
// 		password: student.password,
// 		displayName: name,
// 	});

// 	const result = await prisma.student.create({
// 		data: {

// 		},
// 	});

// 	return {
// 		event,
// 		message: 'Signup successfully',
// 		statusCode: 201,
// 		data: result,
// 	};
// });
