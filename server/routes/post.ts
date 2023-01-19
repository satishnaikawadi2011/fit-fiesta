import { setupCloudinary } from './../utils/setupCloudinary';
import { likePost, createComment } from './../controllers/post';
import express from 'express';
import { createPost } from '../controllers/post';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

// const multer = require('multer');
// https://codex.so/handling-any-post-data-in-express
const { upload } = setupCloudinary();

router.post(
	'/',
	[
		isAuthenticated,
		upload.single('image')
	],
	createPost
);

router.patch('/like/:postId', isAuthenticated, likePost);

router.post('/comment/:postId', isAuthenticated, createComment);

export default router;
