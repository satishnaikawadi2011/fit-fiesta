import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../../types/Group';

interface groupState {
	groupDetails: IGroup | null;
}

const initialState: groupState = {
	groupDetails: null
};

export const groupSlice = createSlice({
	name: 'group',
	initialState,
	reducers:
		{
			setGroupDetails:
				(state, action: PayloadAction<IGroup>) => {
					state.groupDetails = action.payload;
				}
		}
});

export const { setGroupDetails } = groupSlice.actions;

export default groupSlice.reducer;
