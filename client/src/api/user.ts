import { IUser } from '../types/User';
import client from './client';

const endpoint = '/user';

const editUserProfile = (userData: any) => {
	return client.post(`${endpoint}/edit`, userData);
};

const getMutualConnections = (userId: string) => {
	return client.get(`${endpoint}/mutualConnections/${userId}`);
};

const getInvitations = () => {
	return client.get(`${endpoint}/pendingConnections`);
};

export default {
	editUserProfile,
	getMutualConnections,
	getInvitations
};
