import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface commonState {
	searchTerm: string;
}

const initialState: commonState = {
	searchTerm: ''
};

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers:
		{
			setSearchTerm:
				(state, action: PayloadAction<string>) => {
					state.searchTerm = action.payload;
				}
		}
});

export const { setSearchTerm } = commonSlice.actions;

export default commonSlice.reducer;
