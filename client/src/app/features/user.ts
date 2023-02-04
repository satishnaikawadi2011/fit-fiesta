import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';

interface userState {
	sentConnetionRequests: IUser[];
}

const initialState: userState = {
	sentConnetionRequests: []
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
				}
		}
});

export const { setSentConnetionRequests, withdrawRequest } = userSlice.actions;

export default userSlice.reducer;
