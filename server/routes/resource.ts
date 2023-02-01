import { setupCloudinary } from './../utils/setupCloudinary';
import { addResource, getResources, searchResource } from './../controllers/resource';
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

router.get('/search/:query', isAuthenticated, searchResource);

router.get('/', isAuthenticated, getResources);

export default router;
