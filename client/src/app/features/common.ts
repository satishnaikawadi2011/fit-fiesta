import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type SearchOptionType = 'people' | 'posts' | 'groups' | 'events' | 'resources';

interface commonState {
	searchTerm: string;
	activeSearchOption: SearchOptionType;
}

const initialState: commonState = {
	searchTerm: '',
	activeSearchOption: 'posts'
};

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers:
		{
			setSearchTerm:
				(state, action: PayloadAction<string>) => {
					state.searchTerm = action.payload;
				},
			setActiveSearchOption:
				(state, action: PayloadAction<SearchOptionType>) => {
					state.activeSearchOption = action.payload;
				}
		}
});

export const { setSearchTerm, setActiveSearchOption } = commonSlice.actions;

export default commonSlice.reducer;
