import { IUser } from '../types/User';
import client from './client';

const endpoint = '/group';

const makeRequestToJoinGroup = (groupId: string) => {
	return client.post(`${endpoint}/join/${groupId}`);
};

const acceptReceivedGroupRequest = (groupId: string, userId: string) => {
	return client.post(`${endpoint}/accept/${groupId}/${userId}`);
};

const rejectReceivedGroupRequest = (groupId: string, userId: string) => {
	return client.post(`${endpoint}/reject/${groupId}/${userId}`);
};

export default {
	makeRequestToJoinGroup,
	acceptReceivedGroupRequest,
	rejectReceivedGroupRequest
};
