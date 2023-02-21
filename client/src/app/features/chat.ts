import { removeDuplicates } from '../../utils/removeDuplicates';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types/Message';
import { IContactListItem } from '../../components/messaging/MessageContactList';
import { sortContacts } from '../../utils/sort-contacts';

interface chatState {
	messages: IMessage[];
	contacts: IContactListItem[];
	selectedContact: IContactListItem | null;
	messageContent: string;
}

const initialState: chatState = {
	messages: [],
	contacts: [],
	selectedContact: null,
	messageContent: ''
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers:
		{
			setMessages:
				(state, action: PayloadAction<IMessage[]>) => {
					state.messages = removeDuplicates(action.payload);
				},
			addMessage:
				(state, action: PayloadAction<IMessage>) => {
					state.messages = removeDuplicates([
						action.payload,
						...state.messages
					]);
				},
			setContacts:
				(state, action: PayloadAction<IContactListItem[]>) => {
					state.contacts = sortContacts(action.payload);
				},
			updateLatestMessage:
				(state, action: PayloadAction<{ contactId: string; message: IMessage }>) => {
					const contactIdx = state.contacts.findIndex((c) => c._id === action.payload.contactId);
					if (contactIdx === -1) return;
					const contact = state.contacts[contactIdx];
					Object.assign(contact, { latestMessage: action.payload.message });
					state.contacts[contactIdx] = contact;
					state.contacts = sortContacts(state.contacts);
				},
			setSelectedContact:
				(state, action: PayloadAction<IContactListItem>) => {
					state.selectedContact = action.payload;
				},
			setMessageContent:
				(state, action: PayloadAction<string>) => {
					state.messageContent = action.payload;
				}
		}
});

export const {
	addMessage,
	setMessages,
	setContacts,
	updateLatestMessage,
	setSelectedContact,
	setMessageContent
} = chatSlice.actions;

export default chatSlice.reducer;
