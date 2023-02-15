import { Avatar, Box, Button, Grid, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { IGroup } from '../types/Group';
import { numberToString } from '../utils/numberToString';

interface Props {
	group: IGroup;
}

const GroupCard: React.FC<Props> = ({ group }) => {
	const { _id, profileImg, description, name, members } = group;
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
				<Button my={4} rounded="full" variant={'outline'} colorScheme="primary">
					Join
				</Button>
			</Box>
		</Grid>
	);
};

export default GroupCard;
