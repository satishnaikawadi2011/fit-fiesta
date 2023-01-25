import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UIState {
    isAddEventModalOpen: boolean;
    isAddPostModalOpen: boolean;
    isAddResourceModalOpen: boolean;
    isCreateGroupModalOpen: boolean;
}


const initialState: UIState = {
    isAddEventModalOpen: false,
    isAddPostModalOpen: false,
    isAddResourceModalOpen: false,
    isCreateGroupModalOpen: false
}

export const UISlice = createSlice({
  name: 'ui',
  initialState,
    reducers: {
      setIsAddEventModalOpen:(state, action: PayloadAction<boolean>) => {
        state.isAddEventModalOpen = action.payload
        },
        setIsAddPostModalOpen:(state, action: PayloadAction<boolean>) => {
        state.isAddPostModalOpen = action.payload
        },
        setIsAddResourceModalOpen:(state, action: PayloadAction<boolean>) => {
        state.isAddResourceModalOpen = action.payload
        },
        setIsCreateGroupModalOpen:(state, action: PayloadAction<boolean>) => {
        state.isCreateGroupModalOpen = action.payload
    },
  },
})




export const { setIsAddEventModalOpen,setIsAddPostModalOpen,setIsAddResourceModalOpen,setIsCreateGroupModalOpen } = UISlice.actions

export default UISlice.reducer