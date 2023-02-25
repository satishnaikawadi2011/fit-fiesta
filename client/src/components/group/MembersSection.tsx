import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import useBlockBgColor from '../../hooks/useBlockBgColor';
import { IUser } from '../../types/User';
import UserListItem from '../user/UserListItem';

interface Props {
	members: IUser[];
	admin: IUser;
}

const MembersSection: React.FC<Props> = ({ admin, members }) => {
	const blockBg = useBlockBgColor();
	const filteredMembers = members.filter((m) => m._id !== admin._id);
	return (
		<Box pb={5} w={'full'} bg={blockBg} boxShadow={'lg'} rounded={'md'} overflow={'auto'}>
			<Heading p={4} fontSize={'xl'}>
				Admin
			</Heading>
			<Box px={2}>
				<UserListItem user={admin} />
			</Box>
			<Divider mt={2} />
			<Heading p={4} fontSize={'xl'}>
				Members
			</Heading>
			<Box px={2}>
				{filteredMembers.map((m) => {
					return (
						<React.Fragment key={m._id}>
							<UserListItem user={m} />
							<Divider my={2} />
						</React.Fragment>
					);
				})}
			</Box>
		</Box>
	);
};

export default MembersSection;
