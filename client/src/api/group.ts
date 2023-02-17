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

const withdrawSentGroupRequest = (groupId: string) => {
	return client.delete(`${endpoint}/withdraw/${groupId}`);
};

const getMutualConnsFromGroup = (groupId: string) => {
	return client.get(`${endpoint}/mutualConnections/${groupId}`);
};

const getGroupDetails = (groupId: string) => {
	return client.get(`${endpoint}/${groupId}`);
};

export default {
	makeRequestToJoinGroup,
	acceptReceivedGroupRequest,
	rejectReceivedGroupRequest,
	withdrawSentGroupRequest,
	getMutualConnsFromGroup,
	getGroupDetails
};
