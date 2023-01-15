import { IPost } from '../models/Post';

export const validatePostData = async (data: Partial<IPost>) => {
	const { content } = data;
	if (!content || content!.trim() == '') {
		return 'content is required field!';
	}
};
