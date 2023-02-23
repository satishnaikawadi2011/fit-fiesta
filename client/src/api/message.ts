import client from './client';

const endpoint = '/message';

const getMessages = (contactId: string) => {
	return client.get(`${endpoint}/${contactId}`);
};

const sendMessage = (content: string, contactId: string, isGroup: boolean) => {
	let data: any = { content };
	if (isGroup) {
		data.group = contactId;
	}
	else {
		data.receiver = contactId;
	}
	return client.post(`${endpoint}/send`, data);
};

const markAllMsgsOfContactAsRead = (contactId: string) => {
	return client.post(`${endpoint}/read/${contactId}`);
};

export default {
	getMessages,
	sendMessage,
	markAllMsgsOfContactAsRead
};
