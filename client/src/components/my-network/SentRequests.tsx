import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import userApi from '../../api/user';
import { setSentConnetionRequests } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import useBlockBgColor from '../../hooks/useBlockBgColor';
import { IUser } from '../../types/User';
import SentRequestsListItem from './SentRequestListItem';

const SentRequests = () => {
	const { sentConnetionRequests } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const blockBg = useBlockBgColor();
	const { data, error, loading, request: getSentConnsReq } = useApiUpdated<{ sentConnections: IUser[] }>(
		userApi.getSentConnectionsRequests
	);

	useEffect(() => {
		getSentConnsReq();
	}, []);

	useEffect(
		() => {
			if (data) {
				dispatch(setSentConnetionRequests(data.sentConnections));
			}
		},
		[
			data
		]
	);

	if (loading)
		return (
			<Center>
				<Spinner colorScheme={'primary'} size={'lg'} />
			</Center>
		);

	return (
		<Box boxShadow="md" bg={blockBg} width={'100%'} mb={5} roundedTop={'lg'}>
			<Text p={5}>Sent Connection Requests</Text>
			<Divider />
			<Box p={5}>
				{sentConnetionRequests.map((req) => {
					return (
						<React.Fragment key={req._id}>
							<SentRequestsListItem
								_id={req._id}
								name={req.fullName}
								profileImg={req.profileImg!}
								username={req.username}
							/>
							<Divider my={2} />
						</React.Fragment>
					);
				})}
			</Box>
			{sentConnetionRequests.length === 0 && (
				<Box height={'calc(100vh - 15rem)'} width={'100%'}>
					<Center height={'100%'}>No sent connection requests</Center>
				</Box>
			)}
		</Box>
	);
};

export default SentRequests;
