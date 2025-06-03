import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const formData = await readFormData(event);
	const studentId = formData.get('studentId') as string;
	const curriculumId = formData.get('curriculumId') as string;
	const majorId = formData.get('majorId') as string;
	const academicYear = formData.get('academicYear') as string;
	const semester = formData.get('semester') as string;
	const generalAverage = formData.get('generalAverage') as string;
	const file = formData.get('file') as File;

	if (!formData) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'Data is required',
		});
	}

	const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Remove any characters that could cause issues in filenames
	const uniqueFileName = `payments/${timestamp}_${file.name}`;

	const { data, error } = await supabase.storage
		.from('images')
		.upload(uniqueFileName, file, {
			contentType: file.type,
			upsert: true,
		});

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			message: `Failed to upload file: ${error.message}`,
		});
	}

	const { data: publicUrlData } = supabase.storage
		.from('images')
		.getPublicUrl(`cards/${file.name}`);

	const res = await prisma.enrollment.create({
		data: {
			studentId,
			curriculumId,
			majorId,
			academicYear,
			semester,
			generalAverage,
			gwaUrl: publicUrlData.publicUrl,
		},
	});

	return {
		event,
		message: 'Enrollment created successfully',
		statusCode: 201,
		data: res,
	};
});
