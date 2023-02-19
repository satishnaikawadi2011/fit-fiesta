import { isValidObjectId } from './../utils/isValidId';
import { IMessage } from '../models/Message';
import User from '../models/User';
import Group from '../models/Group';

export const validateMessageData = async (req: any) => {
	const { content, receiver, group } = req.body as Partial<IMessage>;
	const user = await User.findById(req.id);
	if (!content || content.trim() == '') {
		return 'content is required field!';
	}
	else if ((!receiver || receiver.trim() == '') && (!group || group.trim() == '')) {
		return 'Either group or receiver is required!';
	}
	else if (receiver && !isValidObjectId(receiver)) {
		return 'Please provide valid objectId for receiver';
	}
	else if (group && !isValidObjectId(group)) {
		return 'Please provide valid objectId for group';
	}
	else if (receiver) {
		const rec = await User.findById(receiver);
		if (!rec) {
			return 'No user found for provided receiver ID';
		}

		if (!user!.connections.includes(receiver as any)) {
			return 'You cannot send message to a user which is not in your connections';
		}
	}
	else if (group) {
		const grp = await Group.findById(group);
		if (!grp) {
			return 'No group found for provided group ID';
		}

		if (!user!.groups.includes(group as any)) {
			return 'You are not a member of this group';
		}
	}
};
