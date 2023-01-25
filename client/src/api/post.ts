import { IUser } from '../types/User';
import client from './client';

const endpoint = '/post';

const fetchPosts = (queryString?: string) => {
	return client.get(`${endpoint}${queryString}`);
};

const likePost = (postId: string) => {
	return client.patch(`${endpoint}/like/${postId}`);
};

export default {
	fetchPosts,
	likePost
};
