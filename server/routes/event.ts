import { addEvent, searchEvent } from './../controllers/event';
import { setupCloudinary } from './../utils/setupCloudinary';
import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

const { upload } = setupCloudinary();
router.post(
	'/',
	[
		isAuthenticated,
		upload.single('image')
	],
	addEvent
);

router.get('/search/:query', isAuthenticated, searchEvent);

export default router;
