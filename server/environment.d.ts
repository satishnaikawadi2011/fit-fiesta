declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URI: string;
			JWT_SECRET: string;
			CLOUD_NAME: string;
			CLOUDINARY_API_KEY: string;
			CLOUDINARY_API_SECRET: string;
		}
	}
}
export {};
