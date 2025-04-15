import { H3Error } from 'h3';

export function handleError(event: any, error: unknown) {
	console.error('API error:', error);

	if (error instanceof H3Error) {
		return sendErrorResponse(event, error.statusCode, error.message);
	}

	// Map Firebase errors
	if (error instanceof Error && 'code' in error) {
		const firebaseError = error as any;
		if (firebaseError.code === 'permission-denied') {
			return sendErrorResponse(event, 403, 'Insufficient permissions');
		}
		if (firebaseError.code === 'not-found') {
			return sendErrorResponse(event, 404, 'Resource not found');
		}
	}

	// Default server error
	return sendErrorResponse(event, 500, 'Internal server error');
}
