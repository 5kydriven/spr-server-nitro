import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const subject = await readBody(event);
	if (!subject) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Subject is required',
		});
	}

	// Step 1: Check if subject exists by unique code
	let existingSubject = await prisma.subject.findUnique({
		where: { code: subject.code.toLowerCase() },
	});

	// Step 2: If not, create it
	if (!existingSubject) {
		existingSubject = await prisma.subject.create({
			data: {
				name: subject.name.toLowerCase(),
				code: subject.code.toLowerCase(),
				unit: Number(subject.unit),
			},
		});
	}

	// Step 3: For each curriculumId, check if already linked
	for (const curriculumId of subject.curriculumIds) {
		const alreadyOffered = await prisma.subjectOffering.findFirst({
			where: {
				subjectId: existingSubject.id,
				curriculumId,
			},
		});

		if (!alreadyOffered) {
			await prisma.subjectOffering.create({
				data: {
					subjectId: existingSubject.id,
					curriculumId,
				},
			});
		}
	}

	return {
		event,
		message: 'Subject created successfully',
		statusCode: 201,
	};
});
