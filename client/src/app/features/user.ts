import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../../types/Group';
import { INotification } from '../../types/Notification';
import { IReceivedGroupJoinRequest, IUser } from '../../types/User';
import { removeDuplicates } from '../../utils/removeDuplicates';

interface userState {
	sentConnetionRequests: IUser[];
	invitations: IUser[];
	connections: IUser[];
	receivedGroupRequests: IReceivedGroupJoinRequest[];
	sentGroupRequests: IGroup[];
	notifications: INotification[];
	unreadNotificationsCount: number;
}

const initialState: userState = {
	sentConnetionRequests: [],
	connections: [],
	invitations: [],
	notifications: [],
	receivedGroupRequests: [],
	sentGroupRequests: [],
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
				},
			setReceivedGroupRequests:
				(state, action: PayloadAction<IReceivedGroupJoinRequest[]>) => {
					state.receivedGroupRequests = action.payload;
				},
			setSentGroupRequests:
				(state, action: PayloadAction<IGroup[]>) => {
					state.sentGroupRequests = action.payload;
				},
			removeReceivedGroupRequest:
				(state, action: PayloadAction<IReceivedGroupJoinRequest>) => {
					const { group, requestingUser } = action.payload;
					state.receivedGroupRequests = state.receivedGroupRequests.filter((req: any) => {
						return req.group._id !== group || req.requestingUser._id !== requestingUser;
					});
				},
			withdrawSentGroupRequest:
				(state, action: PayloadAction<string>) => {
					state.sentGroupRequests = state.sentGroupRequests.filter((r) => r._id !== action.payload);
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
	increaseUnreadNotificationsCount,
	removeReceivedGroupRequest,
	setReceivedGroupRequests,
	setSentGroupRequests,
	withdrawSentGroupRequest
} = userSlice.actions;

export default userSlice.reducer;
