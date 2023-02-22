import { IUser } from '../types/User';
import client from './client';

const endpoint = '/post';

const fetchPosts = (queryString?: string) => {
	return client.get(`${endpoint}${queryString}`);
};

const likePost = (postId: string) => {
	return client.patch(`${endpoint}/like/${postId}`);
};

const getComments = (postId: string) => {
	return client.get(`${endpoint}/comments/${postId}`);
};

const addComment = (postId: string, content: string) => {
	return client.post(`${endpoint}/comment/${postId}`, { content });
};

const addPost = (postData: any) => {
	return client.post(`${endpoint}`, postData);
};

const getCommentCount = (postId: any) => {
	return client.get(`${endpoint}/${postId}/comment-count`);
};

export default {
	fetchPosts,
	likePost,
	getComments,
	addComment,
	addPost,
	getCommentCount
};
