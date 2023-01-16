import { createGroup, joinGroup } from './../controllers/group';
import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/', isAuthenticated, createGroup);

router.post('/join/:groupId', isAuthenticated, joinGroup);

export default router;
