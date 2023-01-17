const prefix = '52U82V5C00'.toLowerCase();
const suffix = 'RI0GPZMYOR'.toLowerCase();

const setItem = (key: string, value: any) => {
	localStorage.setItem(prefix + key + suffix, JSON.stringify(value));
};

const getItem = (key: string) => {
	const data = localStorage.getItem(prefix + key + suffix) as any;
	if (data) {
		return JSON.parse(data);
	}

	return null;
};

const clear = () => {
	localStorage.clear();
};

export default {
	setItem,
	getItem,
	clear
};
