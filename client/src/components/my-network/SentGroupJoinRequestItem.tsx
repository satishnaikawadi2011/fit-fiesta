import { Avatar, Box, Button, Flex, Heading, Link, Skeleton, Text, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import groupApi from '../../api/group';
import { updateUser } from '../../app/features/auth';
import { withdrawSentGroupRequest } from '../../app/features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IGroup } from '../../types/Group';
import { addEllipsis } from '../../utils/addEllipsis';
import { userLog } from '../../utils/swal/userLog';

interface Props {
	group: IGroup;
}

const SentGroupJoinRequestItem: React.FC<Props> = ({ group }) => {
	const { name, _id, profileImg, description } = group;
	const { data, error, loading, request: withdrawReq, errorMsg } = useApiUpdated<any>(
		groupApi.withdrawSentGroupRequest
	);
	const dispatch = useAppDispatch();
	const { user: authUser } = useAppSelector((state) => state.auth);
	const { colorMode } = useColorMode();

	useEffect(
		() => {
			if (data && !error) {
				userLog('success', 'Sent request to join group withdrawn successfully!', colorMode).then(() => {
					dispatch(withdrawSentGroupRequest(_id));
					const updatedSentGrpReqs = authUser!.sentGroupJoinRequests!.filter((r) => r !== _id);
					dispatch(updateUser({ sentGroupJoinRequests: updatedSentGrpReqs }));
				});
			}
		},
		[
			data,
			error
		]
	);

	useEffect(
		() => {
			if (errorMsg) {
				userLog('error', errorMsg);
			}
		},
		[
			errorMsg
		]
	);

	const withdrawHandler = async () => {
		await withdrawReq(_id);
	};

	return (
		<React.Fragment>
			<Flex alignItems={'center'} justifyContent="space-between">
				<Flex alignItems={'center'}>
					<Avatar src={profileImg} height={'80px'} width={'80px'} size="xl" mr={4} />
					<Box>
						<Heading fontSize={'lg'}>{name}</Heading>
						<Text fontSize={'md'} fontWeight={'medium'} color="gray.400">
							{addEllipsis(description, 50)}
						</Text>
					</Box>
				</Flex>
				<Flex>
					<Button onClick={withdrawHandler} isLoading={loading} rounded="full" mr={3}>
						Withdraw
					</Button>
				</Flex>
			</Flex>
		</React.Fragment>
	);
};

const SkeletonComponent = () => {
	return (
		<Flex alignItems="center" justifyContent="space-between">
			<Flex alignItems="center">
				<Skeleton rounded={'full'} height="80px" width="80px" mr={4} />
				<Box width={200}>
					<Skeleton height={4} mb={2} />
					<Skeleton height={3} width="50%" mb={2} />
				</Box>
			</Flex>
			<Flex width={200}>
				<Skeleton rounded="full" height={10} width="70%" mr={3} />
			</Flex>
		</Flex>
	);
};

export default SentGroupJoinRequestItem;
