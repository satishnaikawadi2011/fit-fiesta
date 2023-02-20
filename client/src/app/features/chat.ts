import { removeDuplicates } from '../../utils/removeDuplicates';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types/Message';

interface ILatestMessages {
	[key: string]: IMessage;
}

interface chatState {
	messages: IMessage[];
	latestMessages: ILatestMessages;
}

const initialState: chatState = {
	messages: [],
	latestMessages: {}
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
			setLatestMessages:
				(state, action: PayloadAction<ILatestMessages>) => {
					state.latestMessages = action.payload;
				},
			updateLatestMessage:
				(state, action: PayloadAction<{ key: string; msg: IMessage }>) => {
					state.latestMessages[action.payload.key] = action.payload.msg;
				}
		}
});

export const { addMessage, setMessages, setLatestMessages } = chatSlice.actions;

export default chatSlice.reducer;
