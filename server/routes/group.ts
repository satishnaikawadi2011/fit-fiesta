import { setupCloudinary } from './../utils/setupCloudinary';
import {
	acceptJoinRequest,
	createGroup,
	getConnectionsFromGroup,
	getGroupDetails,
	makeJoinRequest,
	rejectJoinRequest,
	searchGroup,
	withdrawSentJoinGroupRequest
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

router.delete('/withdraw/:groupId', isAuthenticated, withdrawSentJoinGroupRequest);

router.get('/search/:query', isAuthenticated, searchGroup);

router.get('/mutualConnections/:groupId', isAuthenticated, getConnectionsFromGroup);

router.get('/:groupId', isAuthenticated, getGroupDetails);

export default router;
