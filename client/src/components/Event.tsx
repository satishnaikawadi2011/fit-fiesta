import { CalendarIcon } from '@chakra-ui/icons';
import { Heading, Flex, Icon, Divider, Text, Box, Image } from '@chakra-ui/react';
import React from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { ImLocation2 } from 'react-icons/im';
import dayjs from 'dayjs';

interface Props {
	name: string;
	description: string;
	date: string;
	image?: string;
	username: string;
	group?: string;
	location?: string;
}

const Event: React.FC<Props> = ({ date, description, name, username, group, image, location }) => {
	return (
		<Box boxShadow="md" bg={'gray.100'} width={'100%'} roundedTop="2xl" overflow={'clip'}>
			{image && <Image src={image} />}
			<Box p={5}>
				<Heading mb={3} fontSize={'2xl'} fontWeight="medium">
					{name}
				</Heading>
				{location && <Item Icon={<Icon as={ImLocation2} mr={3} />} desc={location} />}
				<Item Icon={<CalendarIcon mr={3} />} desc={dayjs(date).format('ddd, MMM D, YYYY, h:mm A')} />
				<Item Icon={<Icon as={GrAddCircle} mr={3} />} desc={`added by @${username}`} />
			</Box>
			<Divider />
			<Box p={3}>
				<Heading mb={3} fontSize={'lg'} fontWeight="normal">
					Description
				</Heading>
				<Text fontWeight={'light'}>{description}</Text>
			</Box>
		</Box>
	);
};

interface ItemProps {
	Icon: any;
	desc: string;
}

const Item: React.FC<ItemProps> = ({ Icon, desc }) => {
	return (
		<Flex alignItems={'center'} mb={2}>
			{Icon}
			<Text>{desc}</Text>
		</Flex>
	);
};

export default Event;
