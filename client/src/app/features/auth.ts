import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';
import client from '../../api/client';
import storage from '../../services/storage';
interface AuthState {
	token: string | null;
	user: IUser | null;
	expiryDate: string | null;
}

const initialState: AuthState = {
	token: null,
	user: null,
	expiryDate: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers:
		{
			setToken:
				(state, action: PayloadAction<string>) => {
					state.token = action.payload;
				},
			setUser:
				(state, action: PayloadAction<IUser>) => {
					state.user = action.payload;
				},
			setExpiryDate:
				(state, action: PayloadAction<string>) => {
					state.expiryDate = action.payload;
				},
			logout:
				(state) => {
					state.expiryDate = null;
					state.token = null;
					state.token = null;
					storage.clear();
				},
			updateUser:
				(state, action: PayloadAction<Partial<IUser>>) => {
					const user = state.user!;
					Object.assign(user, action.payload);
					state.user = user;
					saveToLocalStorage(state.user, state.expiryDate as any, state.token as any);
				}
		}
});

export const userDataKey = 'userData';
export const tokenDataKey = 'tokenData';

export const saveToLocalStorage = (user: IUser, expiryDate: string, token: string) => {
	storage.setItem(userDataKey, user);
	storage.setItem(tokenDataKey, {
		token,
		expiryDate: expiryDate
	});
};

export const removeAuthDataFromStorage = () => {
	client.setHeader('Authorization', '');
	storage.removeItem(userDataKey);
	storage.removeItem(tokenDataKey);
};

export const getAuthDataFromStorage = () => {
	const tokenData: any = storage.getItem(tokenDataKey);
	const user: any = storage.getItem(userDataKey);
	if (user && tokenData) {
		return {
			tokenData,
			user
		};
	}
	return null;
};

export const { setExpiryDate, setToken, setUser, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
