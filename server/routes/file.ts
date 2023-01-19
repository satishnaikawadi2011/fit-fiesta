import { isAuthenticated } from './../middlewares/isAuthenticated';
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
import express from 'express';

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params:
		{
			folder: 'fit-fiesta'
		}
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
	'/upload',
	[
		isAuthenticated,
		upload.single('image')
	],
	async (req: any, res: any) => {
		console.log(req.file);
		return res.json({ picture: req.file.path });
	}
);

export default router;
