import { Box, Center, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import userApi from '../../api/user';
import { setConnections } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApi from '../../hooks/useApi';
import UserListItem from '../user/UserListItem';
import ConnectionMenu from './ConnectionMenu';

const Connections = () => {
	const dispatch = useAppDispatch();
	const { connections } = useAppSelector((state) => state.user);
	const { data: connectionsData, error, errorMsg, loading, request }: any = useApi(userApi.getConnections);

	useEffect(() => {
		request();
	}, []);

	useEffect(
		() => {
			if (connectionsData) {
				dispatch(setConnections(connectionsData.connections));
			}
		},
		[
			connectionsData
		]
	);

	if (loading)
		return (
			<Center>
				<Spinner colorScheme={'primary'} size={'lg'} />
			</Center>
		);

	return (
		<Box boxShadow="md" bg={'gray.100'} width={'100%'} mb={5} roundedTop={'lg'}>
			<Text p={5}>Connections</Text>
			<Divider />
			<Box p={5}>
				{connections.map((conn) => {
					return (
						<React.Fragment key={conn._id}>
							<Flex alignItems={'center'} justifyContent={'space-between'}>
								<UserListItem user={conn} />
								<ConnectionMenu user={conn} />
							</Flex>
							<Divider />
						</React.Fragment>
					);
				})}
			</Box>
			{connections.length === 0 && (
				<Box height={'calc(100vh - 15rem)'} width={'100%'}>
					<Center height={'100%'}>No Connections</Center>
				</Box>
			)}
		</Box>
	);
};

export default Connections;
