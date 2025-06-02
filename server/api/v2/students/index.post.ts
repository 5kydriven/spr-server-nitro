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

	const { data, error } = await supabase.auth.admin.createUser({
		email: student.email,
		password: student.password,
		email_confirm: true,
		user_metadata: { name },
	});

	if (error) {
		throw createError({ statusCode: 400, statusMessage: error.message });
	}

	const supabaseUser = data.user;

	const result = await prisma.user.create({
		data: {
			id: supabaseUser.id,
			email: student.email,
			name,
			role: 'STUDENT',
			student: {
				create: {
					status: 'PENDING',
					firstName: student.firstName,
					middleName: student.middleName,
					lastName: student.lastName,
				},
			},
		},
	});

	return {
		event,
		message: 'Signup successfully',
		statusCode: 201,
		data: result,
	};
});
