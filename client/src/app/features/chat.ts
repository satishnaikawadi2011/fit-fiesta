import { removeDuplicates } from '../../utils/removeDuplicates';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types/Message';
import { IGroup } from '../../types/Group';
import { IUser } from '../../types/User';
import { IContactListItem } from '../../components/messaging/MessageContactList';

interface chatState {
	messages: IMessage[];
	contacts: IContactListItem[];
}

const initialState: chatState = {
	messages: [],
	contacts: []
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
					state.contacts = action.payload;
				}
		}
});

export const { addMessage, setMessages, setContacts } = chatSlice.actions;

export default chatSlice.reducer;
