import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../types/Notification';
import { IUser } from '../../types/User';
import { removeDuplicates } from '../../utils/removeDuplicates';

interface userState {
	sentConnetionRequests: IUser[];
	invitations: IUser[];
	connections: IUser[];
	notifications: INotification[];
	unreadNotificationsCount: number;
}

const initialState: userState = {
	sentConnetionRequests: [],
	connections: [],
	invitations: [],
	notifications: [],
	unreadNotificationsCount: 0
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
				},
			setNotifications:
				(state, action: PayloadAction<INotification[]>) => {
					state.notifications = removeDuplicates(action.payload);
				},
			markNotificationsAsRead:
				(state, action: PayloadAction<INotification[]>) => {
					for (let i = 0; i < state.notifications.length; i++) {
						state.notifications[i].read = true;
					}
				},
			setUnreadNotificationsCount:
				(state, action: PayloadAction<number>) => {
					state.unreadNotificationsCount = action.payload;
				},
			increaseUnreadNotificationsCount:
				(state, action: PayloadAction<number>) => {
					state.unreadNotificationsCount += action.payload;
				}
		}
});

export const {
	setSentConnetionRequests,
	withdrawRequest,
	setConnections,
	removeConnection,
	setInvitations,
	removeInvitation,
	setNotifications,
	markNotificationsAsRead,
	setUnreadNotificationsCount,
	increaseUnreadNotificationsCount
} = userSlice.actions;

export default userSlice.reducer;
