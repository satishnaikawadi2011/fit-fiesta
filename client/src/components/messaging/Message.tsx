import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { PRIMARY } from '../../constants/colors';
import { IMessage } from '../../types/Message';
import dayjs from 'dayjs';

interface Props {
	message: IMessage;
}

const Message: React.FC<Props> = ({ message }) => {
	const { user } = useAppSelector((state) => state.auth);
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
			<Box
				width={'max-content'}
				maxWidth={'60%'}
				m={'10px'}
				ml={

						sendByMe ? 'auto' :
						''
				}
				position={'relative'}
			>
				<Text ml={1} fontSize={'sm'} fontWeight={'semibold'} color={PRIMARY}>
					{senderName}
				</Text>
				<Box
					p={'10px'}
					bgColor={

							sendByMe ? PRIMARY :
							'gray.100'
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
		</React.Fragment>
	);
};

export default Message;
