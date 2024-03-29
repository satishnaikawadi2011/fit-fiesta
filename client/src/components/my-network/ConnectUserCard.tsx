import {
	Flex,
	Avatar,
	Heading,
	Box,
	Image,
	Text,
	Link,
	Center,
	Button,
	Skeleton,
	SkeletonCircle
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import userApi from '../../api/user';
import { IUser } from '../../types/User';
import MutualConnsModel from './MutualConnsModel';
import useApiUpdated from '../../hooks/useApiUpdated';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveMyNetworkOption } from '../../app/features/common';
import { updateUser } from '../../app/features/auth';
import useBlockBgColor from '../../hooks/useBlockBgColor';

interface Props {
	user: IUser;
}

const ConnectUserCard: React.FC<Props> = ({ user }) => {
	const { _id, fullName, username, profileImg, coverImg } = user;
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const blockBg = useBlockBgColor();
	const { user: authUser } = useAppSelector((state) => state.auth);
    
    const { data: mutualConnsData, error, errorMsg, loading, request: getMutualConnsReq } = useApi(
		userApi.getMutualConnections
	);
	
	const { loading: connectLoad, request: connectReq } = useApiUpdated(userApi.connect);
    
    const mutualConns: IUser[] = (mutualConnsData as any)?.mutualConnections || []
    
	const [showConnsModal, setShowConnsModal] = useState(false)
	
	const isConnection = authUser!.connections!.includes(user._id)
	const isPendingConn = authUser!.pendingConnections!.includes(user._id)
	const isSentReqConn = authUser!.sentConnections!.includes(user._id)

	useEffect(() => {
		getMutualConnsReq(_id);
	}, []);
	
	const connectHandler = async() => {
		await connectReq(_id)
		const updatedSentReqs = [_id,...authUser!.sentConnections!]
		dispatch(updateUser({ sentConnections: updatedSentReqs }));
		dispatch(setActiveMyNetworkOption('sent requests'))
		navigate('/my-network/sent requests')
	}

    
    if (loading) return <SkeletonComponent/>

	return (
		<React.Fragment>
			<MutualConnsModel isOpen={showConnsModal} onClose={() => setShowConnsModal(false)} name={fullName} mutualConns={mutualConns} />
			<Box height={'full'}   w={'full'} bg={blockBg} boxShadow={'lg'} rounded={'md'} overflow={'hidden'}>
				<Image h={'100px'} w={'full'} src={coverImg} objectFit={'cover'} />
				<Flex justify={'center'} mt={-12}>
					<Avatar
						size={'xl'}
						src={profileImg}
						name={fullName}
						css={{
							border: '2px solid white'
						}}
					/>
				</Flex>

				<Box>
					<Center flexDirection={'column'}>
						<Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
							{fullName}
						</Heading>
						<Link color={'gray.500'} onClick={() => navigate(`/profile/${username}`)}>@{username}</Link>
						{mutualConns.length !== 0 && <Link onClick={() => setShowConnsModal(true)} my={2} color={'gray.400'} fontWeight={'light'} fontSize={'sm'}>
							{getMutualConnStr(mutualConns)}
						</Link>}
						{!isConnection && !isPendingConn && !isSentReqConn && <Button onClick={connectHandler} isLoading={connectLoad} my={4} variant={'outline'} colorScheme="primary">
							Connect
						</Button>}
						
						{isSentReqConn && <Button  isDisabled my={4} variant={'outline'} colorScheme="primary">
							Pending
						</Button>}
					</Center>
				</Box>
			</Box>
		</React.Fragment>
	);
};

const getMutualConnStr = (conns: IUser[]) => {
    if (conns.length === 1) return `1 mutual connection`;
    
    return `${conns.length} mutual connections`
}

const SkeletonComponent = () => {
	const blockBg = useBlockBgColor()
	return (
		<React.Fragment>
			<Box maxW={'230px'} w={'full'} bg={blockBg} boxShadow={'lg'} rounded={'md'} overflow={'hidden'}>
				<Skeleton h={'100px'} w={'full'} />
				<Flex justify={'center'} mt={-12}>
					<SkeletonCircle width={90} height={90} />
				</Flex>

				<Box>
					<Center width={'100%'} flexDirection={'column'}>
						<Skeleton height={4} my={2} width="60%" />
						<Skeleton height={3} width="50%" mb={2} />
						<Skeleton height={2} width="70%" />
						<Skeleton my={5} rounded="full" height={8} width="50%" mr={3} />
					</Center>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default ConnectUserCard;
