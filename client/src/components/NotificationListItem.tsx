import { Flex, Avatar, Heading, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { INotification } from '../types/Notification';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
	notification: INotification;
}

dayjs.extend(relativeTime);

const NotificationListItem: React.FC<Props> = ({ notification }) => {
	const { createdAt, image, message, read, type } = notification;
	return (
		<Flex m={1} p={2} justifyContent={'space-between'} bgColor={'primary.50'} cursor="pointer">
			<Flex alignItems={'center'}>
				<Avatar src={image} size="lg" mr={4} />
				<Text fontSize={'md'} fontWeight={'normal'} maxW={'80%'}>
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
