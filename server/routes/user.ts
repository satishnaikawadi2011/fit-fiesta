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
	getSentConnections
} from './../controllers/user';
import express from 'express';
import { setupCloudinary } from '../utils/setupCloudinary';

const router = express.Router();

// const multer = require('multer');
// https://codex.so/handling-any-post-data-in-express
const { upload } = setupCloudinary();

router.post('/register', register);

router.post('/login', login);

router.post('/connect/:connectionId', isAuthenticated, makeConnectionRequest);

router.post('/accept/:connectionId', isAuthenticated, acceptConnection);

router.delete('/reject/:connectionId', isAuthenticated, rejectConnection);

router.get('/connections', isAuthenticated, getConnections);

router.get('/pendingConnections', isAuthenticated, getPendingConnections);

router.get('/sentConnections', isAuthenticated, getSentConnections);

router.get('/search/:searchTerm', isAuthenticated, searchUser);

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

export default router;
