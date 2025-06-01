import { setResponseStatus } from 'h3';

interface ApiResponse<T> {
	statusCode: number;
	message: string;
	data?: T;
	meta?: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export function sendResponse<T>(
	event: any,
	statusCode: number,
	message: string,
	data?: T,
	meta?: ApiResponse<T>['meta'],
): ApiResponse<T> {
	setResponseStatus(event, statusCode);
	return { statusCode, message, data, meta };
}

export function sendSuccess<T>({
	event,
	data,
	message = 'Request successful',
	statusCode = 200,
	meta,
}: {
	event: any;
	data?: T;
	message?: string;
	statusCode?: number;
	meta?: ApiResponse<T>['meta'];
}): ApiResponse<T> {
	return sendResponse(event, statusCode, message, data, meta);
}

export function sendErrorResponse(
	event: any,
	statusCode: number,
	message: string,
): ApiResponse<never> {
	return sendResponse(event, statusCode, message);
}
