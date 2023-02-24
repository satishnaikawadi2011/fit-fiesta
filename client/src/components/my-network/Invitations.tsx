import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import userApi from '../../api/user';
import { setInvitations } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApi from '../../hooks/useApi';
import useBlockBgColor from '../../hooks/useBlockBgColor';
import InvitationListItem from './InvitationListItem';

const Invitations = () => {
	const dispatch = useAppDispatch();
	const blockBg = useBlockBgColor();
	const { invitations } = useAppSelector((state) => state.user);
	const { data: invitationsData, error, errorMsg, loading, request }: any = useApi(userApi.getInvitations);

	useEffect(() => {
		request();
	}, []);

	useEffect(
		() => {
			if (invitationsData) {
				dispatch(setInvitations(invitationsData.pendingConnections));
			}
		},
		[
			invitationsData
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
				{invitations.map((inv) => {
					return (
						<React.Fragment key={inv._id}>
							<InvitationListItem
								_id={inv._id}
								name={inv.fullName}
								profileImg={inv.profileImg!}
								username={inv.username}
								key={inv._id}
							/>
							<Divider />
						</React.Fragment>
					);
				})}
			</Box>
			{invitations.length === 0 && (
				<Box height={'calc(100vh - 15rem)'} width={'100%'}>
					<Center height={'100%'}>No invitations</Center>
				</Box>
			)}
		</Box>
	);
};

export default Invitations;
