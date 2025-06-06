// import { prisma } from '~~/prisma/client';

// export default wrapHandler(async (event) => {
// 	const formData = await readFormData(event);

// 	if (!formData) {
// 		throw createError({
// 			statusCode: 400,
// 			statusMessage: 'Bad Request',
// 			message: 'Missing form data or ID',
// 		});
// 	}

// 	const file1 = formData.get('file1') as File;
// 	const file2 = formData.get('file2') as File;
// 	const studentJson = formData.get('student') as string;
// 	const student = JSON.parse(studentJson);
// 	console.log(student);
// 	const timestamp = new Date().toISOString().replace(/[-:.]/g, '');

// 	let file1Url = '';
// 	let file2Url = '';

// 	if (file1) {
// 		const uniqueFile1Name = `forms/${timestamp}_${file1.name}`;
// 		const { error } = await supabase.storage
// 			.from('images')
// 			.upload(uniqueFile1Name, file1, {
// 				contentType: file1.type,
// 				upsert: true,
// 			});
// 		if (error) {
// 			throw createError({
// 				statusCode: 500,
// 				message: `File1 upload error: ${error.message}`,
// 			});
// 		}
// 		file1Url = supabase.storage.from('images').getPublicUrl(uniqueFile1Name)
// 			.data.publicUrl;
// 	}

// 	if (file2) {
// 		const uniqueFile2Name = `forms/${timestamp}_${file2.name}`;
// 		const { error } = await supabase.storage
// 			.from('images')
// 			.upload(uniqueFile2Name, file2, {
// 				contentType: file2.type,
// 				upsert: true,
// 			});
// 		if (error) {
// 			throw createError({
// 				statusCode: 500,
// 				message: `File2 upload error: ${error.message}`,
// 			});
// 		}
// 		file2Url = supabase.storage.from('images').getPublicUrl(uniqueFile2Name)
// 			.data.publicUrl;
// 	}

// 	await prisma.student.update({
// 		where: { userId: formData.get('userId').toString() },
// 		data: {
// 			sex: formData.get('sex')?.toString(),
// 			birthDate: formData.get('birthDate')?.toString(),
// 			address: formData.get('address')?.toString(),
// 			birthPlace: formData.get('birthPlace')?.toString(),
// 			civilStatus: formData.get('civilStatus')?.toString(),
// 			parentMobileNumber: formData.get('parentMobileNumber')?.toString(),
// 			parentName: formData.get('parentName')?.toString(),
// 			mobileNumber: formData.get('mobileNumber')?.toString(),
// 			firstName: formData.get('firstName')?.toString(),
// 			middleName: formData.get('middleName')?.toString(),
// 			lastName: formData.get('lastName')?.toString(),
// 			enrollment: {
// 				create: {
// 					academicYear: formData.get('academicYear')?.toString(),
// 					semester: formData.get('semester')?.toString(),
// 					curriculumId: formData.get('curriculumId')?.toString(),
// 					generalAverage: formData.get('generalAverage')?.toString(),
// 					gwaUrl1: file1Url,
// 					gwaUrl2: file2Url,
// 				},
// 			},
// 		},
// 	});

// 	return {
// 		event,
// 		message: 'Successfully updated student and uploaded files.',
// 	};
// });
