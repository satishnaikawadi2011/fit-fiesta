import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../types/User';

interface Props {
	user: IUser;
}

const UserListItem: React.FC<Props> = ({ user }) => {
	const { fullName, username, profileImg } = user;
	return (
		<Flex alignItems={'center'}>
			<Avatar src={profileImg} height={'60px'} width={'60px'} mr={4} />
			<Box>
				<Heading fontSize={'lg'}>{fullName}</Heading>
				<Text fontSize={'md'} fontWeight={'medium'} color="gray.400">
					@{username}
				</Text>
			</Box>
		</Flex>
	);
};

export default UserListItem;
