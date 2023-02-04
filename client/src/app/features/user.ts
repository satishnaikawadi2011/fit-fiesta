import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';

interface userState {
	sentConnetionRequests: IUser[];
	invitations: IUser[];
	connections: IUser[];
}

const initialState: userState = {
	sentConnetionRequests: [],
	connections: [],
	invitations: []
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers:
		{
			setSentConnetionRequests:
				(state, action: PayloadAction<IUser[]>) => {
					state.sentConnetionRequests = action.payload;
				},
			withdrawRequest:
				(state, action: PayloadAction<string>) => {
					state.sentConnetionRequests = state.sentConnetionRequests.filter((r) => r._id !== action.payload);
				},
			setConnections:
				(state, action: PayloadAction<IUser[]>) => {
					state.connections = action.payload;
				},
			removeConnection:
				(state, action: PayloadAction<string>) => {
					state.connections = state.connections.filter((c) => c._id !== action.payload);
				},
			setInvitations:
				(state, action: PayloadAction<IUser[]>) => {
					state.invitations = action.payload;
				},
			removeInvitation:
				(state, action: PayloadAction<string>) => {
					state.invitations = state.invitations.filter((inv) => inv._id !== action.payload);
				}
		}
});

export const {
	setSentConnetionRequests,
	withdrawRequest,
	setConnections,
	removeConnection,
	setInvitations,
	removeInvitation
} = userSlice.actions;

export default userSlice.reducer;
