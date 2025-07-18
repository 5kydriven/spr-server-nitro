import { H3Error } from 'h3';

export function handleError(event: any, error: unknown) {
	console.error('API error:', error);

	if (error instanceof H3Error) {
		return sendErrorResponse({
			event,
			statusCode: error.statusCode,
			message: error.message,
		});
	}

	// Map Firebase errors
	if (error instanceof Error && 'code' in error) {
		const firebaseError = error as any;
		if (firebaseError.code === 'permission-denied') {
			return sendErrorResponse({
				event,
				statusCode: 403,
				message: 'Insufficient permissions',
			});
		}
		if (firebaseError.code === 'not-found') {
			return sendErrorResponse({
				event,
				statusCode: 404,
				message: 'Resource not found',
			});
		}
	}

	// Default server error
	return sendErrorResponse({
		event,
		statusCode: 500,
		message: 'Internal server error',
	});
}
