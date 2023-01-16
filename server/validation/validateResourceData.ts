import { IResource } from '../models/Resource';

export const validateResourceData = async (data: Partial<IResource>) => {
	const { name, description, category, url } = data;
	if (!name || name!.trim() == '') {
		return 'name is required field!';
	}
	else if (!description || description!.trim() == '') {
		return 'description is required field!';
	}
	else if (!category || category!.trim() == '') {
		return 'category is required field!';
	}
	else if (!url || url!.trim() == '') {
		return 'url is required field!';
	}

	if (!isValidURL(url)) {
		return 'Please provide valid url!';
	}
};

function isValidURL(url: string) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return !!pattern.test(url);
}
