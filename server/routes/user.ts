import { isAuthenticated } from './../middlewares/isAuthenticated';
import { register, login, makeConnectionRequest, acceptConnection, searchUser } from './../controllers/user';
import express from 'express';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/connect/:connectionId', isAuthenticated, makeConnectionRequest);

router.post('/accept/:connectionId', isAuthenticated, acceptConnection);

router.get('/search/:searchTerm', isAuthenticated, searchUser);

export default router;
