import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { sendMessage } from '../controllers/message';

const router = express.Router();

router.post('/send', isAuthenticated, sendMessage);

export default router;
