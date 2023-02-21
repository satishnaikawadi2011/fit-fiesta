import client from './client';

const endpoint = '/message';

const getMessages = (contactId: string) => {
	return client.get(`${endpoint}/${contactId}`);
};

export default {
	getMessages
};
