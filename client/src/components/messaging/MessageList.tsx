import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { IMessage } from '../../types/Message';
import Message from './Message';

interface Props {
	messages: IMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
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
				position="fixed"
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
							<div key={message._id} style={{ marginBottom: 60 }}>
								<Message message={message} />
							</div>
						);
					}
					else if (index === messages.length - 1) {
						return (
							<div key={message._id} style={{ marginTop: 80 }}>
								<Message message={message} />
							</div>
						);
					}
					return <Message key={message._id} message={message} />;
				})}
			</Flex>
		</Box>
	);
};

export default MessageList;
