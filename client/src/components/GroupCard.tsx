import { Avatar, Box, Button, Grid, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { IGroup } from '../types/Group';
import { numberToString } from '../utils/numberToString';

interface Props {
	group: IGroup;
}

const GroupCard: React.FC<Props> = ({ group }) => {
	const { profileImg, description, name, members } = group;
	const { user: authUser } = useAppSelector((state) => state.auth);
	const isMember = authUser!.groups!.includes(group._id);
	const isPending = authUser!.groupPendingRequests!.includes(group._id);
	const isSentReq = authUser!.groupSentRequests!.includes(group._id);
	return (
		<Grid templateColumns="100px 1fr 100px">
			<Avatar src={profileImg} name={name} />
			<Box>
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
						// onClick={connectHandler} isLoading={connectLoad}
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
