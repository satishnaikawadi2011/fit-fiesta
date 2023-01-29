import { removeDuplicates } from './../../utils/removeDuplicates';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { IEvent } from '../../types/Event';

interface eventState {
	events: IEvent[];
}

const initialState: eventState = {
	events: []
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers:
		{
			setEvents:
				(state, action: PayloadAction<IEvent[]>) => {
					state.events = removeDuplicates(action.payload);
				},
			addEvent:
				(state, action: PayloadAction<IEvent>) => {
					state.events = removeDuplicates([
						action.payload,
						...state.events
					]);
				}
		}
});

export const { setEvents, addEvent } = eventSlice.actions;

export default eventSlice.reducer;
