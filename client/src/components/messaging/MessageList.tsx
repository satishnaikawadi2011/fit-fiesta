import { Avatar, Box, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { setMessageContent } from '../../app/features/chat';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IMessage } from '../../types/Message';
import Message from './Message';

interface Props {
	messages: IMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
	const { messageContent } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();
	const fullName = 'Jane Doe';
	const profileImg = 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png';
	const bottomRef: any = useRef();
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
	return (
		<Box width={'full'}>
			<Flex
				width={'full'}
				height={'70px'}
				p={2}
				position="sticky"
				top={0}
				zIndex={2}
				alignItems={'center'}
				bgColor={'red.100'}
			>
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
							<div key={message._id}>
								<Message message={message} />
							</div>
						);
					}
					else if (index === messages.length - 1) {
						return (
							<div key={message._id}>
								<Message message={message} />
							</div>
						);
					}
					return <Message key={message._id} message={message} />;
				})}
			</Flex>
			<Flex
				width={'full'}
				alignItems={'center'}
				bgColor={'gray.100'}
				height={'55px'}
				position="sticky"
				bottom={0}
				p={1}
				zIndex={2}
			>
				<Input
					width={'90%'}
					my={'auto'}
					placeholder="Type a message"
					bgColor={'white'}
					ml={3}
					mr={2}
					border="none"
					_focus={{ outline: 'none', border: 'none' }}
					type="text"
					value={messageContent}
					onChange={(event) => dispatch(setMessageContent(event.target.value))}
				/>
				<IconButton colorScheme={'primary'} aria-label="Send" icon={<MdSend />} />
			</Flex>
		</Box>
	);
};

export default MessageList;
