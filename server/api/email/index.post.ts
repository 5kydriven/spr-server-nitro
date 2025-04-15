// import { H3Event } from 'h3';

// export default defineEventHandler(async (event: H3Event) => {
// 	const { to, subject, message } = await readBody(event);
// 	if (!to) {
// 		createError({
// 			statusCode: 400,
// 			statusMessage: 'bad request',
// 			message: 'Email is required!',
// 		});
// 	}
// 	try {
// 		console.log(to, subject, message);
// 		const info = await transporter.sendMail({
// 			to: to,
// 			subject: subject,
// 			text: message,
// 			// html: '<b>Hello world?</b>',
// 		});

// 		console.log(info);
// 		return successResponse({ message: 'Email sent successfully!', data: info });
// 	} catch (error: any) {
// 		console.log(error);
// 		return errorResponse(error);
// 	}
// });
