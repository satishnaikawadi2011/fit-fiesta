import { Avatar, Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import useApiUpdated from '../hooks/useApiUpdated';
import { IGroup } from '../types/Group';
import { numberToString } from '../utils/numberToString';
import groupApi from '../api/group';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../app/features/auth';
import { setActiveMyNetworkOption } from '../app/features/common';
import { userLog } from '../utils/swal/userLog';

interface Props {
	group: IGroup;
	refe?: any;
}

const GroupCard: React.FC<Props> = ({ group, refe }) => {
	const { profileImg, description, name, members, _id } = group;
	const { user: authUser } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { data, error, loading: joinLoad, request: joinReq } = useApiUpdated(groupApi.makeRequestToJoinGroup);

	const isMember = authUser!.groups!.includes(group._id);
	const isPending =
		authUser!.receivedGroupJoinRequests!.findIndex(
			(r) => r.group === group._id && r.requestingUser === authUser!._id
		) !== -1;
	const isSentReq = authUser!.sentGroupJoinRequests!.includes(group._id);

	const joinHandler = async () => {
		await joinReq(_id);
	};

	useEffect(
		() => {
			if (data && !error) {
				userLog('success', 'Sent request to join group successfully!').then(() => {
					const updatedSentGrpReqs = [
						_id,
						...authUser!.sentGroupJoinRequests!
					];
					dispatch(updateUser({ sentGroupJoinRequests: updatedSentGrpReqs }));
					dispatch(setActiveMyNetworkOption('sent_group_requests'));
					navigate('/my-network/sent_group_requests');
				});
			}
		},
		[
			data,
			error
		]
	);

	return (
		<Grid bg={'gray.100'} boxShadow={'lg'} mb={5} py={5} templateColumns="60px 1fr 100px" ref={refe}>
			<Flex justifyContent={'center'}>
				<Avatar src={profileImg} name={name} />
			</Flex>
			<Box ml={3}>
				<Heading fontSize={'md'} fontWeight="medium">
					{name}
				</Heading>
				<Text fontSize={'sm'}>{`${numberToString(members.length)} members`}</Text>
				<Text
					cursor={'pointer'}
					height={10}
					overflow="hidden"
					fontSize="xs"
					textOverflow={'ellipsis'}
					fontWeight="light"
				>
					{description}
				</Text>
			</Box>
			<Box>
				{!isMember &&
				!isPending &&
				!isSentReq && (
					<Button
						onClick={joinHandler}
						isLoading={joinLoad}
						rounded={'full'}
						my={4}
						variant={'outline'}
						colorScheme="primary"
					>
						Join
					</Button>
				)}

				{isSentReq && (
					<Button rounded={'full'} isDisabled my={4} variant={'outline'} colorScheme="primary">
						Pending
					</Button>
				)}
			</Box>
		</Grid>
	);
};

export default GroupCard;
