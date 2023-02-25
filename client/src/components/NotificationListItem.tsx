import { Flex, Avatar, Heading, Box, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { INotification } from '../types/Notification';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
	notification: INotification;
	refe?: any;
}

dayjs.extend(relativeTime);

const NotificationListItem: React.FC<Props> = ({ notification, refe }) => {
	const { createdAt, image, message, read, type } = notification;
	const { colorMode } = useColorMode();
	const notReadHoverColor =

			colorMode === 'dark' ? '#454D52' :
			'#EDF2F7';
	return (
		<Flex
			ref={refe}
			p={2}
			justifyContent={'space-between'}
			cursor="pointer"
			_hover={{
				bgColor: notReadHoverColor
			}}
			transition={'all 0.5s'}
		>
			<Flex alignItems={'center'}>
				<Avatar
					src={image}
					size="lg"
					mr={4}
					borderWidth={

							!read ? 3 :
							0
					}
					borderColor={'primary.300'}
				/>
				<Text
					color={

							!read ? 'primary.300' :
							''
					}
					fontSize={'md'}
					fontWeight={

							!read ? 'semibold' :
							'normal'
					}
				>
					{message}
				</Text>
			</Flex>
			<Text
				fontSize="sm"
				color={

						!read ? 'primary.300' :
						'gray.500'
				}
			>
				{dayjs(createdAt).fromNow(true)}
			</Text>
		</Flex>
	);
};

export default NotificationListItem;
