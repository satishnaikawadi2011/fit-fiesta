import { Avatar, AvatarGroup, Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IGroup } from '../../types/Group';
import groupApi from '../../api/group';
import useApiUpdated from '../../hooks/useApiUpdated';
import { userLog } from '../../utils/swal/userLog';
import { updateUser } from '../../app/features/auth';
import { setActiveMyNetworkOption } from '../../app/features/common';

interface Props {
	group: IGroup;
}

const GroupDetails: React.FC<Props> = ({ group }) => {
	const { _id, admin, coverImg, description, members, name, profileImg } = group;

	const { user: authUser } = useAppSelector((state) => state.auth);

	// const navigate = useNavigate();
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
					// navigate('/my-network/sent_group_requests');
				});
			}
		},
		[
			data,
			error
		]
	);

	return (
		<React.Fragment>
			<Box boxShadow="md" bg={'gray.100'} width={'100%'} mb={5} position={'relative'}>
				<Image width={'100%'} height={200} src={coverImg} />
				<Avatar
					cursor={'pointer'}
					left={'10%'}
					top={100}
					position={'absolute'}
					size="2xl"
					name={name}
					src={profileImg}
					border={'4px'}
					color={'primary.200'}
					// onClick={() => setProfileImgModalOpen(true)}
				/>

				{/* <IconButton
					aria-label="Edit profile"
					position={'absolute'}
					m={3}
					right={0}
					icon={<Icon as={FaUserEdit} />}
					onClick={() => setEditProfileModalOpen(true)}
				/> */}

				{/* <IconButton
					aria-label="Edit cover image"
					position={'absolute'}
					m={3}
					right={0}
					top={0}
					icon={<Icon as={FaCamera} />}
					rounded={'full'}
					onClick={() => setCoverImgModalOpen(true)}
				/> */}

				<Box p={5} mt={5}>
					<Heading fontSize={'2xl'}>{name}</Heading>
					<Text fontSize={'sm'}>{`${members.length} members`}</Text>
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
			</Box>
			<Box p={5} boxShadow="md" bg={'gray.100'} width={'100%'} mb={5} position={'relative'}>
				<Heading fontSize={'2xl'}>5 connections in this group</Heading>
				<AvatarGroup mt={3} size="md" max={4}>
					<Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
					<Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
					<Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
					<Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
					<Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
				</AvatarGroup>
			</Box>
		</React.Fragment>
	);
};

export default GroupDetails;
