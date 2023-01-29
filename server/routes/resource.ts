import { setupCloudinary } from './../utils/setupCloudinary';
import { addResource, getResources } from './../controllers/resource';
import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

const { upload } = setupCloudinary();
router.post(
	'/',
	[
		isAuthenticated,
		upload.single('image')
	],
	addResource
);

router.get('/', isAuthenticated, getResources);

export default router;
