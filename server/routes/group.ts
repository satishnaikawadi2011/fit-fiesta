import { setupCloudinary } from './../utils/setupCloudinary';
import { createGroup, joinGroup } from './../controllers/group';
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
	createGroup
);

router.post('/join/:groupId', isAuthenticated, joinGroup);

export default router;
