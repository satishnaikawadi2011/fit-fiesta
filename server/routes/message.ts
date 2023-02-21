import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { getMessages, sendMessage } from '../controllers/message';

const router = express.Router();

router.post('/send', isAuthenticated, sendMessage);

router.get('/:contactId', isAuthenticated, getMessages);

export default router;
