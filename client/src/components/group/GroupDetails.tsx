import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	Divider,
	Heading,
	Image,
	Skeleton,
	SkeletonCircle,
	Text,
	useColorMode
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IGroup } from '../../types/Group';
import groupApi from '../../api/group';
import useApiUpdated from '../../hooks/useApiUpdated';
import { userLog } from '../../utils/swal/userLog';
import { updateUser } from '../../app/features/auth';
import { setActiveMyNetworkOption } from '../../app/features/common';
import { IUser } from '../../types/User';
import MutualConnsModel from '../my-network/MutualConnsModel';
import useBlockBgColor from '../../hooks/useBlockBgColor';

interface Props {
	group: IGroup;
}

const GroupDetails: React.FC<Props> = ({ group }) => {
	const { _id, admin, coverImg, description, members, name, profileImg } = group;

	const { user: authUser } = useAppSelector((state) => state.auth);

	// const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { data, error, loading: joinLoad, request: joinReq } = useApiUpdated(groupApi.makeRequestToJoinGroup);
	const {
		data: mutualConnsData,
		error: mutualConnsErr,
		loading: mutualConnsLoad,
		request: getMutualConnsReq
	} = useApiUpdated<IUser[]>(groupApi.getMutualConnsFromGroup);

	const [
		mutualConns,
		setMutualConns
	] = useState<IUser[]>([]);

	const [
		showConnsModal,
		setShowConnsModal
	] = useState(false);

	const blockBg = useBlockBgColor();
	const { colorMode } = useColorMode();

	const isMember = authUser!.groups!.includes(group._id);
	const isPending =
		authUser!.receivedGroupJoinRequests!.findIndex(
			(r) => r.group === group._id && r.requestingUser === authUser!._id
		) !== -1;
	const isSentReq = authUser!.sentGroupJoinRequests!.includes(group._id);

	const joinHandler = async () => {
		await joinReq(_id);
	};

	useEffect(() => {
		getMutualConnsReq(_id);
	}, []);

	useEffect(
		() => {
			if (mutualConnsData && !mutualConnsErr) {
				console.log(mutualConnsData);
				setMutualConns(mutualConnsData);
			}
		},
		[
			mutualConnsData,
			mutualConnsErr
		]
	);

	useEffect(
		() => {
			if (data && !error) {
				userLog('success', 'Sent request to join group successfully!', colorMode).then(() => {
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
			<MutualConnsModel
				isOpen={showConnsModal}
				onClose={() => setShowConnsModal(false)}
				name={name}
				mutualConns={mutualConns}
				withGroup
			/>
			<Box boxShadow="md" bg={blockBg} width={'100%'} mb={5} position={'relative'}>
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
				/>

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
			{
				mutualConnsLoad ? <MutualConnsSkeletonComponent /> :
				<Box p={5} boxShadow="md" bg={blockBg} width={'100%'} mb={5} position={'relative'}>
					<Heading fontSize={'2xl'}>{mutualConns.length} connections in this group</Heading>
					<AvatarGroup mt={3} size="md" max={4}>
						{mutualConns.map((c) => {
							return <Avatar name={c.fullName} src={c.profileImg} />;
						})}
					</AvatarGroup>
					<Text mt={2} fontSize={'sm'}>
						{getMutualConnsString(mutualConns)}
					</Text>
					<Divider mt={2} />
					<Button my={2} width={'100%'} bgColor={'transparent'} onClick={() => setShowConnsModal(true)}>
						Show All
					</Button>
				</Box>}
			<Box p={5} boxShadow="md" bg={blockBg} width={'100%'} mb={5} position={'relative'}>
				<Heading fontSize={'2xl'} mb={2}>
					Description
				</Heading>
				<Text fontWeight="light">{description}</Text>
			</Box>
		</React.Fragment>
	);
};

const MutualConnsSkeletonComponent = () => {
	const blockBg = useBlockBgColor();
	return (
		<React.Fragment>
			<Box p={5} boxShadow="md" bg={blockBg} width={'100%'}>
				<Skeleton height={5} my={2} width="100%" maxWidth={'400px'} />
				<Box>
					<AvatarGroup mt={3} size="md">
						<SkeletonCircle width={50} height={50} />
						<SkeletonCircle width={50} height={50} />
						<SkeletonCircle width={50} height={50} />
						<SkeletonCircle width={50} height={50} />
					</AvatarGroup>
				</Box>
				<Skeleton height={3} my={2} width="100%" maxWidth={'600px'} />
			</Box>
		</React.Fragment>
	);
};

const getMutualConnsString = (conns: IUser[]) => {
	if (conns.length == 0) return '';
	if (conns.length == 1) {
		return `${conns[0].fullName} is in this group`;
	}
	else if (conns.length == 2) {
		return `${conns[0].fullName} and ${conns[1].fullName} are in this group`;
	}
	else {
		return `${conns[0].fullName} and ${conns.length - 1} other connections are in this group`;
	}
};

export default GroupDetails;
