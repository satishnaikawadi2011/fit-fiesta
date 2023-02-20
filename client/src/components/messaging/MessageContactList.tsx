import { Box } from '@chakra-ui/react';
import React from 'react';
import { IMessage } from '../../types/Message';
import MessageContactListItem from './MessageContactListItem';

export interface IContactListItem {
	latestMessage?: IMessage;
	name: string;
	profileImg: string;
	_id: string;
}

interface Props {
	contacts: IContactListItem[];
}

const MessageContactList: React.FC<Props> = ({ contacts }) => {
	return (
		<Box width={'full'}>
			{contacts.map((c) => {
				return (
					<MessageContactListItem
						key={c._id}
						name={c.name}
						profileImg={c.profileImg}
						latestMessage={c.latestMessage}
					/>
				);
			})}
		</Box>
	);
};

export default MessageContactList;
