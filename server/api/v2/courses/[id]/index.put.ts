import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const course = await readBody(event);
	const { name, abbreviation, majors } = course;

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'ID is required',
		});
	}

	if (!course) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing input data',
		});
	}

	await prisma.$transaction(async (tx) => {
		// 1. Update the course
		await tx.course.update({
			where: { id },
			data: { name, abbreviation },
		});

		// 2. Process existing & new majors
		const keptMajorIds: string[] = [];

		for (const major of majors) {
			if (major.id) {
				await tx.major.update({
					where: { id: major.id },
					data: { name: major.name },
				});
				keptMajorIds.push(major.id);
			} else {
				const created = await tx.major.create({
					data: {
						name: major.name,
						course: { connect: { id } },
					},
				});
				console.log('Created major:', created);
				keptMajorIds.push(created.id);
			}
		}

		// 3. Delete removed majors
		const currentMajors = await tx.major.findMany({
			where: { courseId: id },
		});

		const majorsToDelete = currentMajors.filter(
			(m) => !keptMajorIds.includes(m.id),
		);

		for (const major of majorsToDelete) {
			await tx.major.delete({
				where: { id: major.id },
			});
		}
	});

	return {
		event,
		message: 'Successfully edited course',
	};
});
