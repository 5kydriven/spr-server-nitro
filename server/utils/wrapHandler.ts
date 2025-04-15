import { defineEventHandler, H3Event } from 'h3';
import { sendSuccess } from './response';
import { handleError } from './errorHandler';

type Handler<T> = (event: H3Event) => Promise<T>;

export function wrapHandler<T>(handler: Handler<T>) {
	return defineEventHandler(async (event) => {
		try {
			const result = await handler(event);
			return sendSuccess(event, result);
		} catch (error) {
			return handleError(event, error);
		}
	});
}
