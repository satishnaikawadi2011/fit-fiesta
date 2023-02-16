import { setupCloudinary } from './../utils/setupCloudinary';
import {
	acceptJoinRequest,
	createGroup,
	makeJoinRequest,
	rejectJoinRequest,
	searchGroup
} from './../controllers/group';
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

router.post('/accept/:groupId/:senderId', isAuthenticated, acceptJoinRequest);

router.post('/reject/:groupId/:senderId', isAuthenticated, rejectJoinRequest);

router.get('/search/:query', isAuthenticated, searchGroup);

export default router;
