import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import userApi from '../../api/user';
import { setReceivedGroupRequests } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import useBlockBgColor from '../../hooks/useBlockBgColor';
import { IReceivedGroupJoinRequest } from '../../types/User';
import GroupReceivedRequestItem from './GroupReceivedRequestItem';

const ReceivedGroupJoinRequests = () => {
	const dispatch = useAppDispatch();
	const blockBg = useBlockBgColor();
	const { receivedGroupRequests } = useAppSelector((state) => state.user);
	const { data: receivedGroupRequestsData, error, errorMsg, loading, request } = useApiUpdated<{
		receivedGroupJoinRequests: IReceivedGroupJoinRequest[];
	}>(userApi.getReceivedRequestsToJoinGroups);

	useEffect(() => {
		request();
	}, []);

	useEffect(
		() => {
			if (receivedGroupRequestsData) {
				dispatch(setReceivedGroupRequests(receivedGroupRequestsData.receivedGroupJoinRequests));
			}
		},
		[
			receivedGroupRequestsData
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
			<Text p={5}>Invitations</Text>
			<Divider />
			<Box p={5}>
				{receivedGroupRequests.map((req: any) => {
					return (
						<React.Fragment key={`${req.group._id}${req.requestingUser._id}`}>
							<GroupReceivedRequestItem group={req.group} user={req.requestingUser} />
							<Divider />
						</React.Fragment>
					);
				})}
			</Box>
			{receivedGroupRequests.length === 0 && (
				<Box height={'calc(100vh - 15rem)'} width={'100%'}>
					<Center height={'100%'}>No requests</Center>
				</Box>
			)}
		</Box>
	);
};

export default ReceivedGroupJoinRequests;
