import { IUser } from '../types/User';
import client from './client';

const endpoint = '/user';

const editUserProfile = (userData: any) => {
	return client.post(`${endpoint}/edit`, userData);
};

export default {
	editUserProfile
};
