import { IEvent } from '../models/Event';

export const validateEventData = async (data: Partial<IEvent>) => {
	const { date, name, description } = data;
	if (!name || name!.trim() == '') {
		return 'name is required field!';
	}
	else if (!description || description!.trim() == '') {
		return 'description is required field!';
	}
	else if (!date || (date as any).trim() == '') {
		return 'date is required field!';
	}
};
