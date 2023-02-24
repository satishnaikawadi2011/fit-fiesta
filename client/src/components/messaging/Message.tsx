import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { PRIMARY } from '../../constants/colors';
import { IMessage } from '../../types/Message';
import dayjs from 'dayjs';
import useBlockBgColor from '../../hooks/useBlockBgColor';

interface Props {
	message: IMessage;
	refe?: any;
}

const Message: React.FC<Props> = ({ message, refe }) => {
	const { user } = useAppSelector((state) => state.auth);
	const blockBg = useBlockBgColor();
	const sendByMe = user!._id === (message.sender as any)._id;
	let senderName;
	if (user!._id === (message.sender as any)._id) {
		senderName = 'You';
	}
	else {
		senderName = (message.sender as any).fullName;
	}
	return (
		<React.Fragment>
			<Flex
				ref={refe}
				alignItems={'center'}
				width={'max-content'}
				maxWidth={'60%'}
				m={'10px'}
				ml={

						sendByMe ? 'auto' :
						''
				}
				position={'relative'}
			>
				{!sendByMe && (
					<Avatar
						mr={1}
						size={'xs'}
						src={(message.sender as any).profileImg}
						name={(message.sender as any).fullName}
					/>
				)}
				<Box>
					<Text ml={1} fontSize={'sm'} fontWeight={'semibold'} color={PRIMARY}>
						{senderName}
					</Text>
					<Box
						p={'10px'}
						bgColor={

								sendByMe ? PRIMARY :
								blockBg
						}
						borderTopRightRadius={'12px'}
						borderBottomLeftRadius={'12px'}
						borderBottomRightRadius={

								sendByMe ? 0 :
								'12px'
						}
						borderTopLeftRadius={

								sendByMe ? '12px' :
								0
						}
					>
						<Text textAlign={'justify'}>{message.content}</Text>
					</Box>
					<Text ml={1} fontSize={'xs'} fontWeight={'light'}>
						{dayjs(message.createdAt).format('h:mm A')}
					</Text>
				</Box>
				{sendByMe && (
					<Avatar
						ml={1}
						size={'xs'}
						src={(message.sender as any).profileImg}
						name={(message.sender as any).fullName}
					/>
				)}
			</Flex>
		</React.Fragment>
	);
};

export default Message;
