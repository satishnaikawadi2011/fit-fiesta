import { addResource } from './../controllers/resource';
import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/', isAuthenticated, addResource);

export default router;
