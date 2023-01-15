import { likePost, createComment } from './../controllers/post';
import express from 'express';
import { createPost } from '../controllers/post';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/', isAuthenticated, createPost);

router.patch('/like/:postId', isAuthenticated, likePost);

router.post('/comment/:postId', isAuthenticated, createComment);

export default router;
