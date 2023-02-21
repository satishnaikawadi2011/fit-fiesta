import client from './client';

const endpoint = '/message';

const getMessages = (receiver?: string, group?: string) => {
	let apiString = `${endpoint}`;
	if (receiver) {
		apiString = `${endpoint}?receiver=${receiver}`;
	}
	else if (group) {
		apiString = `${endpoint}?group=${group}`;
	}
	return client.get(apiString);
};

export default {
	getMessages
};
