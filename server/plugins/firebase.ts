import initFirebase from '~/utils/initFirebase';

export default defineNitroPlugin(() => {
	const firebaseConfig = {
		type: 'service_account',
		project_id: 'capstone-9a90b',
		private_key_id: '6fb01d590adfdd24be03a668c05cf5ee0f8ee4bf',
		private_key:
			'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCda5agCPmuS0Wy\nqtvnpKJLULbKRVwR1Vby48nvKFs36bB5B9ccH6u1/d2wvtsGpCSwowkKbgaxzXnl\n2RSfjxuiIeo3D5lJVBItfAK37UiAHYlaMepAjQPNW6ffr0MPhRTIUpBKhF6DOua2\nZ4p7juk3Q/5G1GP7Fg06ulimPT+nM4mwJDNWXAETeXvTztRQnt3AA290F/YsBxe/\ntsuNTnvafkSMayrAYWlEm1wDePwiM1OUHe+sEqKo6/tvVZIWXplZqZoDgF9JmokL\n20RfVKZ6sWp/6sZKKCVPWPuq8GflnkqhM9NXmpqwGiCot42zlzyLGBPAOBG0yhN/\nurzsu0N5AgMBAAECggEACqiGbAL3jsC7cRem6HXp5CIMokDUdUOlza+1FCt+E5jP\nsT4h5x5Q1LNhz234q+gwsMH1In7lFqREINcUEaKRmyZjMoOsm/2kdm5rS7M14bC+\nRDxVcTXrADw4r0kxR+t5hv+qE9WHBakXBloX0vpP2YVRwc9vDojFcAi+aFEEzofw\nNDMrflsbXoZhkLv1KnVdbgWXukZS1iK1hy9eUftrylsemFn8yyMSqGd2EsuUtVMh\nliEDRqMKMh6sE7kkDbdOlEBg64Z2YH8G5+PEH90j4ecZKbsfQdHwu7zUItFb9Iwu\nRW7VxwJ9tiQoa1D96wCWY2ro7GanHyS2bjYSCDTowQKBgQDd7eVDogThqV3xzpzf\n02qrMGEmy2CSGeftY3DxNdM7rqZIxFMlRX6FLSmTl63JaeddRDKMVDtG+nK+062C\nUL1Hig+Awo9FxQRQMb9qY4iRKsNtWpz3L3OpJgAwd3Y2A2/+U4MGBa8khqgwFlRA\nBVfkqAjXqDaZg43obbrCA7haoQKBgQC1lmf5Wijltqb6ln6e8vRO+0nas/4SxMuo\nxdQyVTBKjfTcpK4EDzHilBWMAFS1ylIck6VTLiscGB4oCC37GOAWXnQGiagb16u7\noh8yZ9d2pyYT1D4hqrmlPkzm20sSjAW4oXSO2NWvGP7d5SPIruzOBz6yXJlJ0Y9i\n/nh80dnR2QKBgBDJNqcX8SCUa+unQgxX9GCAZ0jE50gFt5ooBFnqRVDlU+R7HQLb\nr8co9FUaiuWKIhrW1q/wiw9CUD2Iyz3pF3f6xFNr4+RWE45xRNYqMyEvx9pUmTzF\nFQ19N1RzJLjPJ8Bn1qg089tiaARDHBo/jTdZUlnlekPARJKJAjA8kcwhAoGAdruV\n2LFfNHSt0gQ9Xuk1Xb9plxtB8jvDfuN70D1rihQwG2WCcx0MXT6+qAA/Y26bKhxQ\naYcyoPgUH9DZX+nv/DBeZTf1N99ZZyKmi2ris66vcx/AUHs1UBrgZcLV35a21vab\nJBwb/JW3cJe3Qi0+oaiTEkUB5gakXvJNDjCY4GECgYEA1aW/fSy7MEYVnMgzr7CO\njiqmLBxb8b6y69Jilm8NAu9ueoYsSsjWSbUbLcRd3onqUEg5dCVpvpNGTa4Po9xr\nPNDhny5wG70dNM7w1YhwNUZ3pMt4PTZMm2zM6iySTYua+H0HvNrQKFfn544O2pbj\nee+AzSeBlVK1nHiNMFs23Eg=\n-----END PRIVATE KEY-----\n',
		client_email:
			'firebase-adminsdk-3sdlb@capstone-9a90b.iam.gserviceaccount.com',
		client_id: '115562882387448950280',
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url:
			'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3sdlb%40capstone-9a90b.iam.gserviceaccount.com',
		universe_domain: 'googleapis.com',
	};

	initFirebase(firebaseConfig);
});
