import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/User';

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

export const { setExpiryDate,setToken,setUser } = authSlice.actions

export default authSlice.reducer