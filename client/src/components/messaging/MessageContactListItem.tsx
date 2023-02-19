import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { IMessage } from '../../types/Message';
import dayjs from 'dayjs';
import { getDiff } from '../../utils/date-diff';

interface Props {
	latestMessage?: IMessage;
	name: string;
	profileImg: string;
}

const MessageContactListItem: React.FC<Props> = ({ name, profileImg, latestMessage }) => {
	const { user } = useAppSelector((state) => state.auth);
	let senderName;
	let content;
	let formatedDate;

	if (latestMessage) {
		const latestMessageCreatedAt = dayjs(latestMessage.createdAt);

		if (getDiff(new Date().toISOString(), latestMessageCreatedAt.toISOString()) < 1) {
			formatedDate = latestMessageCreatedAt.format('hh:mm a');
		}
		else if (getDiff(new Date().toISOString(), latestMessageCreatedAt.toISOString()) > 7) {
			formatedDate = latestMessageCreatedAt.format('DD/MM/YYYY');
		}
		else {
			formatedDate = latestMessageCreatedAt.format('dddd');
		}
	}

	if (latestMessage) {
		content = latestMessage.content;
		if (user!._id === (latestMessage.sender as any)._id) {
			senderName = 'You';
		}
		else {
			senderName = (latestMessage.sender as any).fullName.split()[0];
		}
	}
	else {
		content = 'Send your first message to this connection!';
	}

	return (
		<Flex width={'full'} height={'92px'} maxWidth={'624px'} alignItems={'center'} pl={3} pr={2}>
			<Avatar mr={2} src={profileImg} name={name} />
			<Box width={'full'}>
				<Flex flexWrap="wrap" overflow="hidden" alignItems={'baseline'} justifyContent="space-between">
					<Text
						textOverflow={'ellipsis'}
						whiteSpace={'nowrap'}
						overflow={'hidden'}
						flex="1"
						fontWeight={'semibold'}
					>
						{name}
					</Text>
					<Text flexShrink={1} fontSize={'sm'}>
						{formatedDate}
					</Text>
				</Flex>
				<Flex flexGrow={1}>
					<Box flexGrow={1}>
						{
							latestMessage ? <Text
								fontSize={'sm'}
								maxHeight={'50px'}
								fontWeight={'light'}
								overflow={'hidden'}
								textOverflow={'ellipsis'}
								noOfLines={2}
							>{`${senderName}: ${content}`}</Text> :
							<Text
								fontSize={'sm'}
								maxHeight={'50px'}
								fontWeight={'light'}
								overflow={'hidden'}
								textOverflow={'ellipsis'}
								noOfLines={2}
							>
								{content}
							</Text>}
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default MessageContactListItem;
