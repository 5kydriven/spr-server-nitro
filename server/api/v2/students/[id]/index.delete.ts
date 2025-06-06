import { getAuth } from 'firebase-admin/auth';
import { prisma } from '~~/prisma/client';

export default wrapHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const auth = getAuth();

	const student = await prisma.student.delete({
		where: { id },
		include: {
			user: true,
		},
	});

	await auth.deleteUser(student.userId);

	return {
		event,
		message: 'Successfully deleted student',
	};
});
