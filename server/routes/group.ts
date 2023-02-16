import { setupCloudinary } from './../utils/setupCloudinary';
import { acceptJoinRequest, createGroup, makeJoinRequest } from './../controllers/group';
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

router.post('/join/:groupId', isAuthenticated, makeJoinRequest);

router.post('/join/:groupId/:senderId', isAuthenticated, acceptJoinRequest);

export default router;
