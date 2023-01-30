import { RoutePathType } from './../../routes/authenticated-routes';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type ActiveLinkType = RoutePathType;

interface UIState {
	isAddEventModalOpen: boolean;
	isAddPostModalOpen: boolean;
	isAddResourceModalOpen: boolean;
	isCreateGroupModalOpen: boolean;
	activeLink: string;
}

const initialState: UIState = {
	isAddEventModalOpen: false,
	isAddPostModalOpen: false,
	isAddResourceModalOpen: false,
	isCreateGroupModalOpen: false,
	activeLink: '/'
};

export const UISlice = createSlice({
	name: 'ui',
	initialState,
	reducers:
		{
			setIsAddEventModalOpen:
				(state, action: PayloadAction<boolean>) => {
					state.isAddEventModalOpen = action.payload;
				},
			setIsAddPostModalOpen:
				(state, action: PayloadAction<boolean>) => {
					state.isAddPostModalOpen = action.payload;
				},
			setIsAddResourceModalOpen:
				(state, action: PayloadAction<boolean>) => {
					state.isAddResourceModalOpen = action.payload;
				},
			setIsCreateGroupModalOpen:
				(state, action: PayloadAction<boolean>) => {
					state.isCreateGroupModalOpen = action.payload;
				},
			setActiveLink:
				(state, action: PayloadAction<ActiveLinkType>) => {
					state.activeLink = action.payload;
				}
		}
});

export const {
	setIsAddEventModalOpen,
	setIsAddPostModalOpen,
	setIsAddResourceModalOpen,
	setIsCreateGroupModalOpen,
	setActiveLink
} = UISlice.actions;

export default UISlice.reducer;
