import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../../types/User';
import UserListItem from '../user/UserListItem';

interface Props {
	members: IUser[];
	admin: IUser;
}

const MembersSection: React.FC<Props> = ({ admin, members }) => {
	const filteredMembers = members.filter((m) => m._id !== admin._id);
	return (
		<Box maxW={'300px'} w={'full'} bg={'gray.100'} boxShadow={'2xl'} rounded={'md'} overflow={'hidden'}>
			<Heading>Admin</Heading>
			<UserListItem user={admin} />
			<Heading>Members</Heading>
			{filteredMembers.map((m) => {
				return <UserListItem user={m} />;
			})}
		</Box>
	);
};

export default MembersSection;
