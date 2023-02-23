import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { getMessages, markAllMsgsOfContactAsRead, sendMessage } from '../controllers/message';

const router = express.Router();

router.post('/send', isAuthenticated, sendMessage);

router.get('/:contactId', isAuthenticated, getMessages);

router.post('/read/:contactId', isAuthenticated, markAllMsgsOfContactAsRead);

export default router;
