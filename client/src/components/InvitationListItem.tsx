import { Avatar, Box, Button, Flex, Heading, Link, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import userApi from '../api/user';
import useApi from '../hooks/useApi';
import { IUser } from '../types/User';
import MutualConnsModel from './MutualConnsModel';

interface Props {
	_id: string;
	name: string;
	username: string;
	profileImg: string;
}

const InvitationListItem: React.FC<Props> = ({ _id, name, profileImg, username }) => {
	const { data: mutualConnsData, error, errorMsg, loading, request: getMutualConnsReq } = useApi(
		userApi.getMutualConnections
    );
    
    const mutualConns: IUser[] = (mutualConnsData as any)?.data.mutualConnections
    
    const [showConnsModal, setShowConnsModal] = useState(false)

	useEffect(() => {
		getMutualConnsReq(_id);
    }, []);
    
    if (loading) return <SkeletonComponent/>

	return (
        <React.Fragment>
            <MutualConnsModel isOpen={showConnsModal} onClose={() => setShowConnsModal(false)} name={name} mutualConns={mutualConns} />
			<Flex alignItems={'center'} justifyContent="space-between">
				<Flex alignItems={'center'}>
					<Avatar src={profileImg} height={'80px'} width={'80px'} size="xl" mr={4} />
					<Box>
						<Heading fontSize={'lg'}>{name}</Heading>
						<Text fontSize={'md'} fontWeight={'medium'} color="gray.400">
							{username}
						</Text>
						{mutualConns.length !== 0 && <Link onClick={() => setShowConnsModal(true)} fontSize={'sm'} fontWeight={'light'}>
							{getMutualConnStr(mutualConns)}
						</Link>}
					</Box>
				</Flex>
				<Flex>
					<Button rounded="full" mr={3}>
						Ignore
					</Button>
					<Button rounded="full" bgColor={'primary.200'} color="white" _hover={{ bgColor: 'primary.300' }}>
						Accept
					</Button>
				</Flex>
			</Flex>
		</React.Fragment>
	);
};


const getMutualConnStr = (conns: IUser[]) => {
    if (conns.length === 1) return conns[0].fullName;

    if (conns.length === 2) return `${conns[0].fullName} and 1 other`
    
    return `${conns[0].fullName} and ${conns.length - 1} others`
}

const SkeletonComponent = () => {
	return <Flex alignItems="center" justifyContent="space-between">
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
	</Flex>;
};

export default InvitationListItem;
