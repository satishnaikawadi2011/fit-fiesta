import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type SearchOptionType = 'people' | 'posts' | 'groups' | 'events' | 'resources';
export type MyNetworkNavigationType = 'invitations' | 'connections' | 'sent requests' | 'people';

interface commonState {
	searchTerm: string;
	activeSearchOption: SearchOptionType;
	activeMyNetworkOption: MyNetworkNavigationType;
}

const initialState: commonState = {
	searchTerm: '',
	activeSearchOption: 'posts',
	activeMyNetworkOption: 'invitations'
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
				},
			setActiveMyNetworkOption:
				(state, action: PayloadAction<MyNetworkNavigationType>) => {
					state.activeMyNetworkOption = action.payload;
				}
		}
});

export const { setSearchTerm, setActiveSearchOption, setActiveMyNetworkOption } = commonSlice.actions;

export default commonSlice.reducer;
