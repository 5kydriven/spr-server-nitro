import { H3Event } from 'h3';
import ExcelJS from 'exceljs';
import { prisma } from '~~/prisma/client';

export default eventHandler(async (event: H3Event) => {
	const { filename } = getQuery(event);

	try {
		const students = await prisma.student.findMany({
			where: {
				status: 'PENDING',
			},
			select: {
				lastName: true,
				firstName: true,
				middleName: true,
				enrollment: {
					select: {
						curriculum: {
							select: {
								course: {
									select: { name: true },
								},
								major: {
									select: { name: true },
								},
							},
						},
						academicYear: true,
						generalAverage: true,
					},
				},
			},
		});

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Students');

		// Define header columns
		worksheet.columns = [
			{ header: 'Lastname', key: 'lastname', width: 30 },
			{ header: 'Firstname', key: 'firstname', width: 30 },
			{ header: 'Middlename', key: 'middlename', width: 30 },
			{ header: 'Course', key: 'course', width: 30 },
			{ header: 'Major', key: 'major', width: 30 },
			{ header: 'Year', key: 'year', width: 30 },
			{ header: 'GWA', key: 'gwa', width: 30 },
		];

		// Add rows
		students.forEach((student) => {
			const courseName = student.enrollment?.curriculum?.course?.name || '';
			const majorName = student.enrollment?.curriculum?.major?.name || '';
			const academicYear = student.enrollment?.academicYear || '';
			const generalAverage = student.enrollment?.generalAverage || '';

			worksheet.addRow({
				lastname: student.lastName,
				firstname: student.firstName,
				middlename: student.middleName,
				course: courseName,
				major: majorName,
				year: academicYear,
				gwa: generalAverage,
			});
		});

		const safeFilename =
			typeof filename === 'string' && filename.endsWith('.xlsx')
				? filename
				: 'students_export.xlsx';

		setHeader(
			event,
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		);
		setHeader(
			event,
			'Content-Disposition',
			`attachment; filename="${safeFilename}"`,
		);

		const buffer = await workbook.xlsx.writeBuffer();
		event.node.res.writeHead(200);
		event.node.res.end(buffer);
	} catch (error) {
		console.error('Excel Export Backend Error:', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to export student data to Excel',
			data: error instanceof Error ? error.message : String(error),
		});
	}
});
