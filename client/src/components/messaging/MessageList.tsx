import { Avatar, Box, Flex, IconButton, Input, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { addMessage, setMessageContent, setSelectedContact, updateLatestMessage } from '../../app/features/chat';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IMessage } from '../../types/Message';
import Message from './Message';
import messageApi from '../../api/message';
import { ArrowBackIcon } from '@chakra-ui/icons';
import useBlockBgColor from '../../hooks/useBlockBgColor';

interface Props {
	messages: IMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
	const { messageContent, selectedContact } = useAppSelector((state) => state.chat);
	const { user: authUser } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const fullName = selectedContact!.name;
	const profileImg = selectedContact!.profileImg;
	const bottomRef: any = useRef();
	const blockBg = useBlockBgColor();
	const { colorMode } = useColorMode();
	const [
		isLargerScreen
	] = useMediaQuery('(min-width: 768px)');

	const { data: sendMessageData, error, loading: sendMsgLoad, request: sendMessage } = useApiUpdated<{
		message: IMessage;
	}>(messageApi.sendMessage);

	useEffect(
		() => {
			if (!error && sendMessageData) {
				dispatch(addMessage(sendMessageData.message));
				dispatch(updateLatestMessage({ contactId: selectedContact!._id, message: sendMessageData.message }));
			}
		},
		[
			sendMessageData,
			error
		]
	);

	useEffect(
		() => {
			if (bottomRef.current) {
				bottomRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		},
		[
			messages
		]
	);
	const sendHandler = async () => {
		if (messageContent === '' || messageContent.trim() === '' || selectedContact === null) return;
		await sendMessage(messageContent, selectedContact._id, selectedContact.type === 'group');
		dispatch(setMessageContent(''));
	};
	return (
		<Box width={'full'}>
			<Flex
				height={'70px'}
				p={2}
				position="fixed"
				width={

						isLargerScreen ? '70vw' :
						'full'
				}
				top={0}
				zIndex={2}
				alignItems={'center'}
				bgColor={blockBg}
			>
				{!isLargerScreen && (
					<ArrowBackIcon
						fontSize={'xl'}
						cursor={'pointer'}
						onClick={() => dispatch(setSelectedContact(null))}
						color="blackAlpha.500"
					/>
				)}
				<Avatar size={'md'} src={profileImg} name={fullName} mx={3} />
				<Text fontWeight={'bold'} fontSize={'lg'}>
					{fullName}
				</Text>
			</Flex>
			<Flex flexDirection={'column-reverse'}>
				<div id="bottom-reference" ref={bottomRef} />
				{messages.map((message, index) => {
					if (index === 0 && messages.length !== 1) {
						return (
							<div key={message._id} style={{ marginBottom: '60px' }}>
								<Message message={message} />
							</div>
						);
					}
					else if (index === messages.length - 1) {
						return (
							<React.Fragment key={message._id}>
								<div style={{ marginTop: '60px' }}>
									<Message message={message} />
								</div>
							</React.Fragment>
						);
					}
					return <Message key={message._id} message={message} />;
				})}
			</Flex>
			<Flex
				width={

						isLargerScreen ? '70vw' :
						'full'
				}
				alignItems={'center'}
				bgColor={blockBg}
				height={'55px'}
				position="fixed"
				bottom={0}
				p={1}
				zIndex={2}
			>
				<Input
					width={'90%'}
					my={'auto'}
					placeholder="Type a message"
					bgColor={

							colorMode === 'dark' ? '#454D52' :
							'#EDF2F7'
					}
					ml={3}
					mr={2}
					border="none"
					_focus={{ outline: 'none', border: 'none' }}
					type="text"
					value={messageContent}
					onChange={(event) => dispatch(setMessageContent(event.target.value))}
				/>
				<IconButton colorScheme={'primary'} aria-label="Send" icon={<MdSend />} onClick={sendHandler} />
			</Flex>
		</Box>
	);
};

export default MessageList;
