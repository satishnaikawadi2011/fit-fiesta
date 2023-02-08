import { Flex, Avatar, Heading, Box, Text } from '@chakra-ui/react';
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
	return (
		<Flex
			ref={refe}
			p={2}
			justifyContent={'space-between'}
			bgColor={

					!read ? 'primary.50' :
					''
			}
			cursor="pointer"
			_hover={{
				bgColor:

						!read ? 'primary.100' :
						'gray.200'
			}}
			transition={'all 0.5s'}
		>
			<Flex alignItems={'center'}>
				<Avatar src={image} size="lg" mr={4} />
				<Text fontSize={'md'} fontWeight={'normal'}>
					{message}
				</Text>
			</Flex>
			<Text fontSize="sm" color="gray.500">
				{dayjs(createdAt).fromNow(true)}
			</Text>
		</Flex>
	);
};

export default NotificationListItem;
