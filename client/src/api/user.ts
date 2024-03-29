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

const getConnections = () => {
	return client.get(`${endpoint}/connections`);
};

const getSuggestedUsers = () => {
	return client.get(`${endpoint}/suggest`);
};

const connect = (userId: string) => {
	return client.post(`${endpoint}/connect/${userId}`);
};

const acceptConnectionRequest = (userId: string) => {
	return client.post(`${endpoint}/accept/${userId}`);
};

const rejectConnectionRequest = (userId: string) => {
	return client.delete(`${endpoint}/reject/${userId}`);
};

const getSentConnectionsRequests = () => {
	return client.get(`${endpoint}/sentConnections`);
};

const removeConnection = (userId: string) => {
	return client.delete(`${endpoint}/remove/${userId}`);
};

const withdrawSentConnectionRequest = (userId: string) => {
	return client.delete(`${endpoint}/withdraw/${userId}`);
};

const getNotifications = () => {
	return client.get(`${endpoint}/notifications`);
};

const getUserDetails = () => {
	return client.get(`${endpoint}`);
};

const getUnreadNotificationsCount = () => {
	return client.get(`${endpoint}/notifications/unread`);
};

const markAllNotificationsAsRead = () => {
	return client.patch(`${endpoint}/notifications/read-all`);
};

const getSentRequestsToJoinGroups = () => {
	return client.get(`${endpoint}/groupSentRequests`);
};

const getReceivedRequestsToJoinGroups = () => {
	return client.get(`${endpoint}/groupPendingRequests`);
};

const getUserProfile = (username: string) => {
	return client.get(`${endpoint}/${username}`);
};

const getContacts = () => {
	return client.get(`${endpoint}/contacts`);
};

const getMyGroups = () => {
	return client.get(`${endpoint}/groups`);
};

const getContactsWithUnreadMsgs = () => {
	return client.get(`${endpoint}/contacts/unread`);
};

export default {
	editUserProfile,
	getMutualConnections,
	getInvitations,
	getConnections,
	getSuggestedUsers,
	connect,
	acceptConnectionRequest,
	withdrawSentConnectionRequest,
	removeConnection,
	getSentConnectionsRequests,
	rejectConnectionRequest,
	getNotifications,
	getUserDetails,
	getUnreadNotificationsCount,
	markAllNotificationsAsRead,
	getSentRequestsToJoinGroups,
	getReceivedRequestsToJoinGroups,
	getUserProfile,
	getContacts,
	getMyGroups,
	getContactsWithUnreadMsgs
};
