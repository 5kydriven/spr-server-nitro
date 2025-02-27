import nodemailer from 'nodemailer';

const config = useRuntimeConfig();

export const transporter = nodemailer.createTransport({
	from: 'Christian Mahinay <christianslow.cpsu@gmail.com>',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: config.email,
		pass: config.password,
	},
});
