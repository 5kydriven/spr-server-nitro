import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const student = await readBody(event);

	if (!student) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'No data provided',
		});
	}

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is rquired',
		});
	}

	await prisma.student.update({
		where: { userId: id },
		data: {
			sex: student.sex,
			birthDate: student.birthDate,
			address: student.address,
			birthPlace: student.birthPlace,
			civilStatus: student.civilStatus,
			parentMobileNumber: student.parentMobileNumber,
			parentName: student.parentName,
			mobileNumber: student.mobileNumber,
			firstName: student.firstName,
			middleName: student.middleName,
			lastName: student.lastName,
		},
	});

	return {
		event,
	};
});
