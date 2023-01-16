import { IGroup } from './../models/Group';

export const validateGroupData = async (data: Partial<IGroup>) => {
	const { name, description } = data;
	if (!name || name!.trim() == '') {
		return 'name is required field!';
	}
	else if (!description || description!.trim() == '') {
		return 'description is required field!';
	}
};
