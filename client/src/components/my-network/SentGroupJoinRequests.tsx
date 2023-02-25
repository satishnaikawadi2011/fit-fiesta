import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import userApi from '../../api/user';
import { setSentGroupRequests } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import useBlockBgColor from '../../hooks/useBlockBgColor';
import { IGroup } from '../../types/Group';
import SentGroupJoinRequestItem from './SentGroupJoinRequestItem';

const SentGroupJoinRequests = () => {
	const { sentGroupRequests } = useAppSelector((state) => state.user);
	const blockBg = useBlockBgColor();
	const dispatch = useAppDispatch();
	const { data, error, loading, request: getSentJoinGrpReqs } = useApiUpdated<{ sentGroupJoinRequests: IGroup[] }>(
		userApi.getSentRequestsToJoinGroups
	);

	useEffect(() => {
		getSentJoinGrpReqs();
	}, []);

	useEffect(
		() => {
			if (data) {
				dispatch(setSentGroupRequests(data.sentGroupJoinRequests));
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
			<Text p={5}>Sent Join Group Requests</Text>
			<Divider />
			<Box p={5}>
				{sentGroupRequests.map((req) => {
					return (
						<React.Fragment key={req._id}>
							<SentGroupJoinRequestItem group={req} />
							<Divider my={2} />
						</React.Fragment>
					);
				})}
			</Box>
			{sentGroupRequests.length === 0 && (
				<Box height={'calc(100vh - 15rem)'} width={'100%'}>
					<Center height={'100%'}>No requests</Center>
				</Box>
			)}
		</Box>
	);
};

export default SentGroupJoinRequests;
