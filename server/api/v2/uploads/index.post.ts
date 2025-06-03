import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const formData = await readFormData(event);
	const file = formData.get('file') as File;

	if (!file) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'No file provided',
		});
	}

	const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
	const uniqueFileName = `forms/${timestamp}_${file.name}`;

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
		.getPublicUrl(`payments/${file.name}`);
});
