import { H3Event } from 'h3';

export default defineEventHandler((event: H3Event) => {
	// List of available API endpoints
	const apis = [
		{
			path: '/api/v2/courses',
			methods: ['post', 'id:delete', 'get'],
		},
		{
			path: '/api/v2/students',
			methods: ['post', 'id:delete', 'get'],
		},
		{
			path: '/api/v2/subjects',
			methods: ['post', 'id:delete', 'get'],
		},
		{
			path: '/api/v2/course',
			methods: ['post', 'id:delete', 'get'],
		},
		{
			path: '/api/v2/enrollments',
			methods: ['post', 'id:delete', 'get'],
		},
		{
			path: '/api/v2/curriculums',
			methods: ['post', 'id:delete', 'get'],
		},
	];

	const apiList = apis
		.map(
			(api) => `
			<div style="margin-bottom: 20px;">
					<strong>${api.path}</strong>
					<ul style="margin-top: 5px;">
							${api.methods.map((method) => `<li>${method}</li>`).join('')}
					</ul>
			</div>
	`,
		)
		.join('');

	const htmlContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Tanon college API</title>
					<style>
							body { font-family: Arial, sans-serif; padding: 20px; }
							h1 { color: #007BFF; }
							strong { font-size: 16px; color: #333; display: block; margin-bottom: 5px; }
							ul { margin-top: 5px; padding-left: 20px; }
							li { margin-bottom: 3px; }
					</style>
			</head>
			<body>
					<h1>Tanon college API</h1>
					<p>List of available API endpoints:</p>
					${apiList}
			</body>
			</html>
	`;

	return send(event, htmlContent, 'text/html');
});
