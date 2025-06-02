//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: 'server',
	compatibilityDate: '2025-02-27',

	runtimeConfig: {
		email: process.env.NITRO_EMAIL,
		password: process.env.NITRO_PASSWORD,
		type: process.env.NITRO_TYPE,
		projectId: process.env.NITRO_PROJECT_ID,
		privateKeyId: process.env.NITRO_PRIVATE_KEY_ID,
		privateKey: process.env.NITRO_PRIVATE_KEY,
		clientEmail: process.env.NITRO_CLIENT_EMAIL,
		clientId: process.env.NITRO_CLIENT_ID,
		authUri: process.env.NITRO_AUTH_URI,
		tokenUri: process.env.NITRO_TOKEN_URI,
		authProviderX509CertUrl: process.env.NITRO_AUTH_PROVIDER_X509_CERT_URL,
		clientX509CertUrl: process.env.NITRO_CLIENT_X509_CERT_URL,
		universeDomain: process.env.NITRO_UNIVERSE_DOMAIN,
		supabaseUrl: process.env.NITRO_SUPABASE_URL,
		supabaseAnonKey: process.env.NITRO_SUPABASE_ANON_KEY,
	},
});
