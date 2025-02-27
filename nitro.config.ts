//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: 'server',
	compatibilityDate: '2025-02-27',
	runtimeConfig: {
		email: process.env.NITRO_EMAIL,
		password: process.env.NITRO_PASSWORD,
	},
});
