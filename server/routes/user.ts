import { isAuthenticated } from './../middlewares/isAuthenticated';
import {
	register,
	login,
	makeConnectionRequest,
	acceptConnection,
	searchUser,
	editProfileImage,
	editCoverImage,
	editUser,
	rejectConnection,
	getConnections,
	getPendingConnections,
	getSentConnections,
	getMutualConnections,
	removeConnection,
	withdrawSentConnectionRequest,
	suggestConnections,
	getNotifications,
	markNotifictionsAsRead,
	getUser,
	getUnreadNotificationsCount,
	markAllNotifictionsAsRead,
	getMyGroups,
	getPendingRequestsToJoinMyGroups,
	getSentRequestsToJoinGroups,
	getUserProfile,
	getContacts,
	getContactsWithUnreadMsgs
} from './../controllers/user';
import express from 'express';
import { setupCloudinary } from '../utils/setupCloudinary';

const router = express.Router();

// const multer = require('multer');
// https://codex.so/handling-any-post-data-in-express
const { upload } = setupCloudinary();

router.post('/register', register);

router.post('/login', login);

router.get('/', isAuthenticated, getUser);

router.post('/connect/:connectionId', isAuthenticated, makeConnectionRequest);

router.post('/accept/:connectionId', isAuthenticated, acceptConnection);

router.delete('/reject/:connectionId', isAuthenticated, rejectConnection);

router.get('/connections', isAuthenticated, getConnections);

router.get('/pendingConnections', isAuthenticated, getPendingConnections);

router.get('/sentConnections', isAuthenticated, getSentConnections);

router.get('/mutualConnections/:otherUserId', isAuthenticated, getMutualConnections);

router.delete('/remove/:otherUserId', isAuthenticated, removeConnection);

router.delete('/withdraw/:otherUserId', isAuthenticated, withdrawSentConnectionRequest);

router.get('/suggest', isAuthenticated, suggestConnections);

router.get('/search/:searchTerm', isAuthenticated, searchUser);

router.get('/notifications', isAuthenticated, getNotifications);

router.patch('/notifications/read', isAuthenticated, markNotifictionsAsRead);

router.patch('/notifications/read-all', isAuthenticated, markAllNotifictionsAsRead);

router.get('/notifications/unread', isAuthenticated, getUnreadNotificationsCount);

router.post(
	'/profileImg',
	[
		isAuthenticated,
		upload.single('image')
	],
	editProfileImage
);

router.post(
	'/coverImg',
	[
		isAuthenticated,
		upload.single('image')
	],
	editCoverImage
);

router.post('/edit', isAuthenticated, editUser);

router.get('/groups', isAuthenticated, getMyGroups);

router.get('/groupPendingRequests', isAuthenticated, getPendingRequestsToJoinMyGroups);

router.get('/groupSentRequests', isAuthenticated, getSentRequestsToJoinGroups);

router.get('/contacts', isAuthenticated, getContacts);

router.get('/:username', isAuthenticated, getUserProfile);

router.get('/contacts/unread', isAuthenticated, getContactsWithUnreadMsgs);

export default router;
