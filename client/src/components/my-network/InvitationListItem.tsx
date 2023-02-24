import { Avatar, Box, Button, Flex, Heading, Link, Skeleton, Text, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import userApi from '../../api/user';
import { updateUser } from '../../app/features/auth';
import { removeInvitation } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApi from '../../hooks/useApi';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IUser } from '../../types/User';
import { userLog } from '../../utils/swal/userLog';
import MutualConnsModel from './MutualConnsModel';

interface Props {
	_id: string;
	name: string;
	username: string;
	profileImg: string;
}

const InvitationListItem: React.FC<Props> = ({ _id, name, profileImg, username }) => {
	const dispatch = useAppDispatch();
	const { user: authUser } = useAppSelector((state) => state.auth);
	const { data: mutualConnsData, error, errorMsg, loading, request: getMutualConnsReq }: any = useApi(
		userApi.getMutualConnections
	);

	const { data: accceptData, error: acceptErr, request: acceptConnReq } = useApiUpdated(
		userApi.acceptConnectionRequest
	);
	const { data: rejectData, error: rejecttErr, request: rejectConnReq } = useApiUpdated(
		userApi.rejectConnectionRequest
	);

	const { colorMode } = useColorMode();

	useEffect(
		() => {
			if (accceptData && !acceptErr) {
				userLog('success', 'Connection request accepted successfully!', colorMode).then(() => {
					dispatch(removeInvitation(_id));
					const updatedConns = [
						_id,
						...authUser!.connections!
					];
					const updatedInvitations = authUser!.pendingConnections!.filter((c) => c !== _id);
					dispatch(updateUser({ connections: updatedConns, pendingConnections: updatedInvitations }));
				});
			}
		},
		[
			accceptData,
			acceptErr
		]
	);

	useEffect(
		() => {
			if (rejectData && !rejecttErr) {
				userLog('success', 'Connection request rejected successfully!', colorMode).then(() => {
					dispatch(removeInvitation(_id));
					const updatedInvitations = authUser!.pendingConnections!.filter((c) => c !== _id);
					dispatch(updateUser({ pendingConnections: updatedInvitations }));
				});
			}
		},
		[
			rejectData,
			rejecttErr
		]
	);

	const ignoreHandler = async () => {
		await rejectConnReq(_id);
	};

	const acceptHandler = async () => {
		await acceptConnReq(_id);
	};

	const [
		mutualConns,
		setMutualConns
	] = useState<IUser[]>([]);

	const [
		showConnsModal,
		setShowConnsModal
	] = useState(false);

	useEffect(
		() => {
			if (mutualConnsData) {
				setMutualConns(mutualConnsData.mutualConnections);
			}
		},
		[
			mutualConnsData
		]
	);

	useEffect(() => {
		getMutualConnsReq(_id);
	}, []);

	if (loading) return <SkeletonComponent />;

	return (
		<React.Fragment>
			<MutualConnsModel
				isOpen={showConnsModal}
				onClose={() => setShowConnsModal(false)}
				name={name}
				mutualConns={mutualConns}
			/>
			<Flex alignItems={'center'} justifyContent="space-between">
				<Flex alignItems={'center'}>
					<Avatar src={profileImg} height={'80px'} width={'80px'} size="xl" mr={4} />
					<Box>
						<Heading fontSize={'lg'}>{name}</Heading>
						<Text fontSize={'md'} fontWeight={'medium'} color="gray.400">
							@{username}
						</Text>
						{mutualConns.length !== 0 && (
							<Link onClick={() => setShowConnsModal(true)} fontSize={'sm'} fontWeight={'light'}>
								{getMutualConnStr(mutualConns)}
							</Link>
						)}
					</Box>
				</Flex>
				<Flex>
					<Button onClick={ignoreHandler} rounded="full" mr={3}>
						Ignore
					</Button>
					<Button
						onClick={acceptHandler}
						rounded="full"
						bgColor={'primary.200'}
						color="white"
						_hover={{ bgColor: 'primary.300' }}
					>
						Accept
					</Button>
				</Flex>
			</Flex>
		</React.Fragment>
	);
};

const getMutualConnStr = (conns: IUser[]) => {
	if (conns.length === 1) return conns[0].fullName;

	if (conns.length === 2) return `${conns[0].fullName} and 1 other`;

	return `${conns[0].fullName} and ${conns.length - 1} others`;
};

const SkeletonComponent = () => {
	return (
		<Flex alignItems="center" justifyContent="space-between">
			<Flex alignItems="center">
				<Skeleton rounded={'full'} height="80px" width="80px" mr={4} />
				<Box width={200}>
					<Skeleton height={4} mb={2} />
					<Skeleton height={3} width="50%" mb={2} />
					<Skeleton height={3} width="70%" />
				</Box>
			</Flex>
			<Flex width={200}>
				<Skeleton rounded="full" height={10} width="70%" mr={3} />
				<Skeleton rounded="full" height={10} width="70%" />
			</Flex>
		</Flex>
	);
};

export default InvitationListItem;
