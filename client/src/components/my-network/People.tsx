import { Box, Center, Flex, Grid, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/user';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IUser } from '../../types/User';
import ConnectUserCard from './ConnectUserCard';

const People = () => {
	const { data, error, errorMsg, loading, request: getSuggestedUsersReq } = useApiUpdated<{
		suggestedUsers: IUser[];
	}>(userApi.getSuggestedUsers);
	const [
		suggestedUsers,
		setSuggestedUsers
	] = useState<IUser[]>([]);

	useEffect(
		() => {
			if (data) {
				setSuggestedUsers(data.suggestedUsers);
			}
		},
		[
			data
		]
	);

	useEffect(() => {
		getSuggestedUsersReq();
	}, []);

	if (loading)
		return (
			<Center>
				<Spinner colorScheme={'primary'} size={'lg'} />
			</Center>
		);

	return (
		<React.Fragment>
			<Grid templateColumns={{ base: '1fr', md: 'repeat(auto-fit, minmax(230px, 1fr))' }} gap={6}>
				{suggestedUsers.map((u) => {
					return (
						<Box key={u._id}>
							<ConnectUserCard user={u} />
						</Box>
					);
				})}
			</Grid>
			{suggestedUsers.length === 0 && (
				<Box height={'calc(100vh - 15rem)'} width={'100%'}>
					<Center height={'100%'}>No users</Center>
				</Box>
			)}
		</React.Fragment>
	);
};

export default People;
