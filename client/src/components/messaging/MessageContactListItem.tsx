import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IMessage } from '../../types/Message';
import dayjs from 'dayjs';
import { getDiff } from '../../utils/date-diff';
import { setSelectedContact, updateLatestMessage } from '../../app/features/chat';
import useBlockBgColor from '../../hooks/useBlockBgColor';

interface Props {
	_id: string;
	latestMessage?: IMessage;
	name: string;
	profileImg: string;
	type: 'group' | 'user';
}

const MessageContactListItem: React.FC<Props> = ({ _id, name, profileImg, latestMessage, type }) => {
	const { user } = useAppSelector((state) => state.auth);
	const { unreadContacts } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();
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

	const clickHandler = () => {
		dispatch(setSelectedContact({ _id, name, profileImg, latestMessage, type }));
	};

	const isUnreadContact = unreadContacts.includes(_id);
	const blockBg = useBlockBgColor();

	return (
		<Flex
			width={'full'}
			height={'92px'}
			alignItems={'center'}
			pl={3}
			pr={2}
			_hover={{ bgColor: blockBg }}
			cursor="pointer"
			transition={'all 0.5s'}
			onClick={clickHandler}
		>
			<Avatar
				borderColor={

						isUnreadContact ? 'green.400' :
						''
				}
				borderWidth={

						isUnreadContact ? 3 :
						0
				}
				mr={2}
				src={profileImg}
				name={name}
			/>
			<Box width={'full'}>
				<Flex flexWrap="wrap" overflow="hidden" alignItems={'baseline'} justifyContent="space-between">
					<Text
						textOverflow={'ellipsis'}
						whiteSpace={'nowrap'}
						overflow={'hidden'}
						flex="1"
						fontWeight={'semibold'}
						color={

								isUnreadContact ? 'green.400' :
								''
						}
					>
						{name}
					</Text>
					<Text
						flexShrink={1}
						color={

								isUnreadContact ? 'green.400' :
								''
						}
						fontSize={'sm'}
					>
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
								color={

										isUnreadContact ? 'green.500' :
										''
								}
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
