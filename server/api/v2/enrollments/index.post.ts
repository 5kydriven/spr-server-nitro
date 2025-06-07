import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const formData = await readFormData(event);

	if (!formData) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Missing form data',
		});
	}

	const file1 = formData.get('file1') as File;
	const file2 = formData.get('file2') as File;
	const studentJson = formData.get('student') as string;
	const student = JSON.parse(studentJson);
	console.log(student);
	const timestamp = new Date().toISOString().replace(/[-:.]/g, '');

	let file1Url = '';
	let file2Url = '';

	if (file1) {
		const uniqueFile1Name = `forms/${timestamp}_${file1.name}`;
		const { error } = await supabase.storage
			.from('images')
			.upload(uniqueFile1Name, file1, {
				contentType: file1.type,
				upsert: true,
			});
		if (error) {
			throw createError({
				statusCode: 500,
				message: `File1 upload error: ${error.message}`,
			});
		}
		file1Url = supabase.storage.from('images').getPublicUrl(uniqueFile1Name)
			.data.publicUrl;
	}

	if (file2) {
		const uniqueFile2Name = `forms/${timestamp}_${file2.name}`;
		const { error } = await supabase.storage
			.from('images')
			.upload(uniqueFile2Name, file2, {
				contentType: file2.type,
				upsert: true,
			});
		if (error) {
			throw createError({
				statusCode: 500,
				message: `File2 upload error: ${error.message}`,
			});
		}
		file2Url = supabase.storage.from('images').getPublicUrl(uniqueFile2Name)
			.data.publicUrl;
	}

	const curriculum = await prisma.curriculum.findFirst({
		where: {
			courseId: formData.get('courseId')?.toString(),
			majorId: formData.get('majorId')?.toString(),
		},
	});

	if (!curriculum) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Curriculum not found for selected course and major',
		});
	}

	const enrollment = await prisma.enrollment.create({
		data: {
			academicYear: formData.get('academicYear')?.toString(),
			semester: formData.get('semester')?.toString(),
			curriculumId: curriculum.id,
			studentId: formData.get('id')?.toString(),
			generalAverage: formData.get('generalAverage')?.toString(),
			gwaUrl1: file1Url,
			gwaUrl2: file2Url,
		},
		include: {
			student: true,
		},
	});

	const studentRes = await prisma.student.update({
		where: { id: enrollment.studentId },
		data: {
			...student,
		},
		include: {
			enrollment: {
				include: { curriculum: { include: { course: true } } },
			},
		},
	});

	return {
		event,
		message: 'Successfully updated student and uploaded files.',
		data: studentRes,
	};
});
