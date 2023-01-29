import { removeDuplicates } from './../../utils/removeDuplicates';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IResource } from '../../types/Resource';

interface resourceState {
	resources: IResource[];
}

const initialState: resourceState = {
	resources: []
};

export const resourceSlice = createSlice({
	name: 'resource',
	initialState,
	reducers:
		{
			setResources:
				(state, action: PayloadAction<IResource[]>) => {
					state.resources = removeDuplicates(action.payload);
				},
			addResource:
				(state, action: PayloadAction<IResource>) => {
					state.resources = removeDuplicates([
						action.payload,
						...state.resources
					]);
				}
		}
});

export const { setResources, addResource } = resourceSlice.actions;

export default resourceSlice.reducer;
