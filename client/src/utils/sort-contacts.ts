import { IContactListItem } from '../components/messaging/MessageContactList';

export const sortContacts = (contacts: IContactListItem[]) => {
	const newArr = [
		...contacts
	];
	newArr.sort((a, b) => {
		if (!a.latestMessage) {
			return 1;
		}

		if (!b.latestMessage) {
			return -1;
		}

		const dateA = +new Date(a.latestMessage.createdAt);
		const dateB = +new Date(b.latestMessage.createdAt);
		return dateB - dateA;
	});

	return newArr;
};
