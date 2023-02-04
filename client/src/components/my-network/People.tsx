import { Box, Flex, Grid } from '@chakra-ui/react';
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

	if (loading) return <h1>Loading ...</h1>;

	return (
		// <React.Fragment>
		<Grid templateColumns="repeat(auto-fit, minmax(230px, 1fr))" gap={6}>
			{suggestedUsers.map((u) => {
				return (
					<Box key={u._id}>
						<ConnectUserCard user={u} />
					</Box>
				);
			})}
		</Grid>
		// <Flex>

		// </Flex>
		// </React.Fragment>
	);
};

export default People;
