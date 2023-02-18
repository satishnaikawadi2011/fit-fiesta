import { Avatar, Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../types/User';

interface Props {
	user: IUser;
}

const UserListItem: React.FC<Props> = ({ user }) => {
	const { fullName, username, profileImg } = user;
	const navigate = useNavigate();
	return (
		<Flex alignItems={'center'}>
			<Avatar src={profileImg} height={'60px'} width={'60px'} mr={4} />
			<Box>
				<Heading fontSize={'lg'}>{fullName}</Heading>
				<Link
					fontSize={'md'}
					fontWeight={'medium'}
					color="gray.400"
					onClick={() => navigate(`/profile/${username}`)}
				>
					@{username}
				</Link>
			</Box>
		</Flex>
	);
};

export default UserListItem;
