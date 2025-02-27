import { H3Response } from '~~/types/h3response';

export function errorResponse(error: Partial<H3Response>): H3Response {
	return {
		statusCode: error.statusCode ?? 500,
		statusMessage: error.statusMessage ?? 'internal server error',
		message: error.message ?? 'An unexpected error occurred',
	};
}

export function successResponse<T = any>({
	data,
	message = 'Success',
	total = 0,
}: Partial<H3Response<T>> = {}): H3Response<T> {
	return {
		statusCode: 200,
		statusMessage: 'ok',
		message,
		total,
		data,
	};
}
