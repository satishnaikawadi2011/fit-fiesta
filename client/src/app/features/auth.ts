import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/User';
import client from '../../api/client'
interface AuthState {
  token: string | null;
	user: IUser | null;
	expiryDate: Date | null;
}


const initialState: AuthState = {
  token: null,
  user: null,
  expiryDate:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload
    },
        setUser: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
    },
    setExpiryDate: (state,action: PayloadAction<Date>) => {
          state.expiryDate = action.payload
        },
  },
})


export const userDataKey = 'userData'
export const tokenDataKey = 'tokenData'

// export const saveToLocalStorage = (user: IUser, expiryDate: Date, token: string) => {
// 	secureLocalStorage.setItem(userDataKey, JSON.stringify(user));
// 	secureLocalStorage.setItem(
// 		tokenDataKey,
// 		JSON.stringify({
// 			token,
// 			expiryDate: expiryDate.toISOString()
// 		})
// 	);
// };

// export const removeAuthDataFromAsyncStorage = () => {
// 	client.setHeader('Authorization', '');
// 	secureLocalStorage.removeItem(tokenDataKey);
// 	secureLocalStorage.removeItem(tokenDataKey);
// };


export const { setExpiryDate,setToken,setUser } = authSlice.actions

export default authSlice.reducer